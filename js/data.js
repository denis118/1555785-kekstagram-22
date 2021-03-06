import {
  showMessage
} from './utility.js';

import {
  renderPictures
} from './thumbnails.js';

import {
  viewImage
} from './image-viewer.js';

const onLoadingError = showMessage();

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
      viewImage.photoDescriptions = json;
      return undefined;
    })
    .catch((error) => onLoadingError(error, {
      title: `${error.name}: ${error.message}`,
      button: 'Ok',
    }));
  return undefined;
};

export {
  getData
};
