import {
  isEscEvent
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
  onEffectsListClick
} from './effects.js';

import {
  searchInvalidHashTags
} from './hashtags.js';

import {
  commentField,
  onCommentFieldInput
} from './comments.js';

const body = document.body;
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadSubmit = document.querySelector('button[id="upload-submit"]');

const onUploadSubmitClick = (evt) => {
  if (searchInvalidHashTags()) {evt.preventDefault()}
};

const onUploadFileChange = (evt) => {
  evt.preventDefault();
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  setUserScale();
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
  effectsList.addEventListener('click', onEffectsListClick);
  uploadCancel.addEventListener('click', onUploadCancelClick);
  uploadSubmit.addEventListener('click', onUploadSubmitClick);
  commentField.addEventListener('input', onCommentFieldInput);
  document.addEventListener('keydown', onUploadFileEscKeydown);
  return undefined;
};

const onUploadCancelClick = (evt) => {
  evt.preventDefault();
  uploadFile.value = '';
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
  effectsList.removeEventListener('click', onEffectsListClick);
  uploadCancel.removeEventListener('click', onUploadCancelClick);
  uploadSubmit.removeEventListener('click', onUploadSubmitClick);
  commentField.removeEventListener('input', onCommentFieldInput);
  document.removeEventListener('keydown', onUploadFileEscKeydown);
  return undefined;
};

const onUploadFileEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    onUploadCancelClick(evt);
  }
  return undefined;
};

uploadFile.addEventListener('change', onUploadFileChange);
