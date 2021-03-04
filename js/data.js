import {
  renderPictures
} from './thumbnails.js';

import {
  viewImage
} from './image-viewer.js';

const onLoadingError = (error) => {
  const errorBlock = document.querySelector('#error')
    .content
    .querySelector('.error');
  const newError = errorBlock.cloneNode(true);
  const errorTitle = newError.querySelector('.error__title');
  const errorButton = newError.querySelector('.error__button');

  errorTitle.innerText = error.name + ': ' + error.message;
  errorButton.innerText = 'Ok';

  const onErrorButtonClick = () => {
    document.body.removeChild(newError);
    return undefined;
  };
  errorButton.addEventListener('click', onErrorButtonClick, {once: true})

  const errorFragment = document.createDocumentFragment();
  errorFragment.appendChild(newError);
  document.body.appendChild(errorFragment);
  return undefined;
};

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
    .catch((error) => onLoadingError(error));
  return undefined;
};

export {
  getData
};
