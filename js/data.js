import {
  renderPictures
} from './thumbnails.js';

import {
  viewImage
} from './image-viewer.js';

const getData = () => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((json) => {
      renderPictures(json);
      return json;
    })
    .then((json) => {
      viewImage.photoDescriptions = json;
      return undefined;
    })
    .catch((error) => alert(error));
  return undefined;
};

export {
  getData
};
