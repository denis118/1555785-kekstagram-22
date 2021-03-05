import {
  showMessage
} from './utility.js';

const imgUploadForm = document.querySelector('#upload-select-image');
const onSuccess = showMessage();
const onError = showMessage();

const onImgUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      onSuccess();
      return undefined;
    })
    .catch((error) => onError(error));
  return undefined;
};

export {
  imgUploadForm,
  onImgUploadFormSubmit
};
