import { useEffect } from 'react';

// Framer-Motion
import { AnimatePresence } from 'framer-motion';

// React router
import { Routes, Route, useLocation } from 'react-router-dom';

//Recoil states & values
import { useRecoilValue, useRecoilState } from 'recoil';

//Import help navigation state & config
import {
  isDemoGuideOpen,
  shouldShowDemoGuide,
  shouldShowAlert,
} from '@/config/demoGuideConfig';

// Import Pages and static components
import Header from '@/components/header/Header';
import DemoGuide from '@/components/demoGuide/DemoGuide';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import AlertNavigation from '@/components/demoGuide/AlertNavigation';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/footer/Footer';

import { LanguageSelectedAtom } from './config/languagesConfig';

// Custom hook to prevent body from scrolling
import usePreventScrolling from './hooks/usePreventScrolling';

export const Main = ({ isLoaded, setLanguage }) => {
  const location = useLocation();

  // Should the alert badges for the demo guide be shown
  const shouldShowAlertAtom = useRecoilValue(shouldShowAlert);

  // Should the feature of guided panel for SE should be in this app
  const shouldShowNavigation = useRecoilValue(shouldShowDemoGuide);
  // State that show/hide the panel if click on the guide btn
  const [showDemoGuide, setshowDemoGuide] = useRecoilState(isDemoGuideOpen);
  // Prevent body from scrolling when panel is open
  usePreventScrolling(showDemoGuide);

  const LanguageValue = useRecoilValue(LanguageSelectedAtom);

  useEffect(() => {
    setLanguage(LanguageValue);
  }, [setLanguage]);

  return (
    <div className={`${isLoaded ? 'visible' : 'hidden'}`}>
      <Header />
      <AnimatePresence>
        {showDemoGuide && shouldShowNavigation && (
          <DemoGuide setshowDemoGuide={setshowDemoGuide} />
        )}
      </AnimatePresence>
      <AnimatePresence initial={true} exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          {/* objectID is the unique identifier for an algolia record */}
          <Route path="/search/:objectID" element={<ProductDetails />} />
        </Routes>
      </AnimatePresence>
      {shouldShowAlertAtom && <AlertNavigation />}
      <Footer />
    </div>
  );
};
