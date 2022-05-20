// ------------------------------------------
// Config Index and Search Client
// ------------------------------------------

import { atom, selector } from 'recoil';
import algoliasearch from 'algoliasearch';
import aa from 'search-insights';


// This export represents the information needed for the Algolia API client
export const searchClientCreds = {
  APIKey: '3fc1b89a292d906f0d41b8da17d02d53',
  appID: 'A0RWV1VW1V',
};

// This export is a single instance Algolia API client
export const searchClient = algoliasearch(
  searchClientCreds.appID,
  searchClientCreds.APIKey
);

// Please ignore this atom - DO NOT TOUCH
export const mainIndex = atom({
  key: 'mainIndex', // unique ID (with respect to other atoms/selectors)
  default: 'product_catalog_v2', // default value (aka initial value)
});

// Initialise insights client
aa('init', {
  appId: searchClientCreds.appID,
  apiKey: searchClientCreds.APIKey,
});

// Export an active insights client
export const insightsClient = aa;



// DO NOT REMOVE ANYTHING, ONLY RENAME VALUES IF NEEDED
// IF YOU DON'T WANT IT USED, USE FEATURE CONFIG TO TURN OFF
// SEE config.js FOR GENERAL FEATURE CONFIGURATION
// You can change articlesIndex name or influencer index name
export const indexNames = selector({
  key: 'indexNames', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    return {
      suggestionsIndex: get(mainIndex) + '',
      articlesIndex: get(mainIndex) + '',
      injectedContentIndex: get(mainIndex) + '',
    };
  },
});
