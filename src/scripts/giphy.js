'use strict'

import queryString from 'query-string';

// Build the Giphy API endpoint URL.
const buildApiUrl = (query) => {
  // Build the search query string with the stringify method from the
  // query-string package.
  const search = queryString.stringify({
    q: query,
    api_key: process.env.GIPHY_API_KEY,
    rating: 'g'
  });

  return `https://api.giphy.com/v1/gifs/search?${search}`;
};

// Search for GIFs on Giphy.
const search = (query) => {
  const url = buildApiUrl(query);

  return window.fetch(url)
    .then(response => response.json())
    .catch(console.error);
};

export default { search };
