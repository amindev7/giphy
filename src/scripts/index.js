'use strict'

import giphy from './giphy';

import '../styles/index.scss';

/**
 * Create a new gallery item.
 *
 * @param {object} data
 *
 * @return {HTMLElement}
 */
const createGalleryItem = (data) => {
  // Create a new anchor element to make the GIF clickable.
  const item = document.createElement('a');
  item.href = data.url;
  item.title = 'View on Giphy';
  item.classList.add('gallery__item');

  // Create a new image for the GIF.
  const image = document.createElement('img');
  image.src = data.images.original.url;
  image.toggleAttribute('lazyload');

  // Add the image to the anchor element.
  item.appendChild(image);

  // Return the newly created element.
  return item;
};

/**
 * When the user submit and searches.
 *
 * @return {void}
 */
const onSubmit = (event) => {
  event.preventDefault();

  // When the user searches again, we want to remove the old gifs...
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  // ...and we want to hide the not-found element.
  const notFound = document.querySelector('.not-found');
  notFound.classList.remove('not-found--active');

  // Fetch the query from the input field.
  const query = event.target.querySelector('input').value;

  giphy.search(query)
    .then(response => {
      // If we can't find any items based on the search query we need to tell
      // the user that.
      if (response.data.length === 0) {
        notFound.textContent = `We couldn't find any GIFs with the search query "${query}".`;
        notFound.classList.add('not-found--active');
      }

      // Create new gallery items for all GIFs.
      response.data.forEach(item => {
        // Add the anchor element to the gallery.
        const galleryItem = createGalleryItem(item);
        gallery.appendChild(galleryItem);
      });
    });
};

// Start the engine.
window.addEventListener('load', () => {
  const form = document.forms.search;
  form.addEventListener('submit', onSubmit);
});
