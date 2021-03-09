import {
  showMessage
} from './utility.js';

import {
  imageProvider
} from './image-provider.js';

import {
  imageViewer
} from './image-viewer.js';

import {
  imageFilter
} from './image-filter.js';

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
      imageProvider.render(json);
      imageProvider.setEventListeners();
      imageViewer.photoDescriptions = json;
      imageFilter.showFilters().storeAllData(json).setEventListeners();
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
