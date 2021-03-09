import {
  util
} from './utility.js';

import {
  scaleControlSmaller,
  scaleControlBigger,
  setUserScale,
  onScaleControlSmallerClick,
  onScaleControlBiggerClick
} from './scale.js';

import {
  effectsList,
  onEffectsListClick,
  radiosArray
} from './effects.js';

import {
  processNoneCase as resetEffects
} from './slider.js';

import {
  hashTagsField,
  checkInvalidHashTags,
  onHashTagsInput,
  searchSingleHash,
  onHashTagsFocus,
  onHashTagsBlur,
  clearHashTagsField
} from './hashtags.js';

import {
  comment
} from './comment.js';

import {
  imgUploadForm,
  onImgUploadFormSubmit
} from './form-submission.js';

const body = document.body;
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadSubmit = document.querySelector('button[id="upload-submit"]');

const resetFormData = () => {
  radiosArray.find((item) => item.id.match(/.+none$/)).checked = true;
  [resetEffects, clearHashTagsField, comment.clean].forEach(item => item());
  return undefined;
};

const onUploadSubmitClick = (evt) => {
  if (searchSingleHash() || checkInvalidHashTags()) {evt.preventDefault()}
  return undefined;
};

const onUploadFileChange = (evt) => {
  evt.preventDefault();
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  setUserScale();
  comment.setEventListeners();
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
  effectsList.addEventListener('click', onEffectsListClick);
  uploadCancel.addEventListener('click', onUploadCancelClick);
  imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);
  hashTagsField.addEventListener('input', onHashTagsInput);
  hashTagsField.addEventListener('focus', onHashTagsFocus);
  hashTagsField.addEventListener('blur', onHashTagsBlur);
  uploadSubmit.addEventListener('click', onUploadSubmitClick);
  document.addEventListener('keydown', onUploadFileEscKeydown);
  return undefined;
};

const onUploadCancelClick = (evt) => {
  evt.preventDefault();
  uploadFile.value = '';
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  resetFormData();
  comment.eraseEventListeners();
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
  effectsList.removeEventListener('click', onEffectsListClick);
  uploadCancel.removeEventListener('click', onUploadCancelClick);
  imgUploadForm.removeEventListener('submit', onImgUploadFormSubmit);
  hashTagsField.removeEventListener('click', onHashTagsInput);
  hashTagsField.removeEventListener('focus', onHashTagsFocus);
  hashTagsField.removeEventListener('blur', onHashTagsBlur);
  uploadSubmit.removeEventListener('click', onUploadSubmitClick);
  document.removeEventListener('keydown', onUploadFileEscKeydown);
  return undefined;
};

const onUploadFileEscKeydown = (evt) => {
  if (util.isEscEvent(evt)) {
    onUploadCancelClick(evt);
  }
  return undefined;
};

uploadFile.addEventListener('change', onUploadFileChange);

export {
  onUploadCancelClick
};
