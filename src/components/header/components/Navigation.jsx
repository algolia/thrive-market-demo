// Render the navigation menu in the header

// React Router
import { useNavigate } from 'react-router-dom';
// Recoil Header State
import { useRecoilState, useRecoilValue } from 'recoil';

// Import Config for the header
import { categoryPageFilterAttribute } from '@/config/categoryConfig';
import { linksHeader } from '@/config/headerConfig';
import SelectPersona from '../personnaSelect/SelectPersona';

//import language selector component
import LanguageSelect from '../languageSelect/LanguageSelect';

// Import Recoil config
import { shouldHavePersona } from '@/config/featuresConfig';

import { shouldShowLanguageSelectedAtom } from '@/config/languagesConfig';

const Navigation = ({ isMenuOpen, setIsMenuOpen, mobile, tablet }) => {
  // navigate is used by React Router
  const navigate = useNavigate();

  // Const Recoil State
  const shouldShowPersonasAtom = useRecoilValue(shouldHavePersona);

  // Import the navigation links, as defined in the config
  const [links] = useRecoilState(linksHeader);
  return (
    <ul
      className={`${
        isMenuOpen
          ? 'container-mobile__navList-items'
          : 'container__header-bottom__links'
      } `}
    >
      {links.map((link) => (
        <li
          key={link.url}
          onClick={() => {
            // Open the sub-menu if the link is hierarchical, otherwise run a search
            if (link.name !== 'All') {
              navigate(`/search`, {
                state: `${categoryPageFilterAttribute}:'${link.filter}'`,
              });
            } else {
              navigate('/search');
            }
            // Only used for Mobile view
            if (tablet || mobile) {
              setIsMenuOpen(false);
            }
          }}
        >
          <p>{link.name}</p>
        </li>
      ))}
      {/* Display the persona selection component */}
      {shouldShowPersonasAtom && (
        <li>
          <SelectPersona />
        </li>
      )}
      {/* Display the language select component */}
      {shouldShowLanguageSelectedAtom && (
        <li>
          <LanguageSelect />
        </li>
      )}
    </ul>
  );
};

export default Navigation;
