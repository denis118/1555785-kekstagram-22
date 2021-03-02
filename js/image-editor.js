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
  hashTagsField,
  checkInvalidHashTags,
  onHashTagsInput,
  searchSingleHash,
  onHashTagsFocus,
  onHashTagsBlur
} from './hashtags.js';

import {
  commentsField,
  onCommentsFieldInput,
  onCommentsFocus,
  onCommentsBlur
} from './comments.js';

const body = document.body;
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadSubmit = document.querySelector('button[id="upload-submit"]');

const onUploadSubmitClick = (evt) => {
  if (searchSingleHash() || checkInvalidHashTags()) {evt.preventDefault()}
  return undefined;
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
  hashTagsField.addEventListener('input', onHashTagsInput);
  hashTagsField.addEventListener('focus', onHashTagsFocus);
  hashTagsField.addEventListener('blur', onHashTagsBlur);
  commentsField.addEventListener('input', onCommentsFieldInput);
  commentsField.addEventListener('focus', onCommentsFocus);
  commentsField.addEventListener('blur', onCommentsBlur);
  uploadSubmit.addEventListener('click', onUploadSubmitClick);
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
  hashTagsField.removeEventListener('click', onHashTagsInput);
  hashTagsField.removeEventListener('focus', onHashTagsFocus);
  hashTagsField.removeEventListener('blur', onHashTagsBlur);
  commentsField.removeEventListener('input', onCommentsFieldInput);
  commentsField.removeEventListener('focus', onCommentsFocus);
  commentsField.removeEventListener('blur', onCommentsBlur);
  uploadSubmit.removeEventListener('click', onUploadSubmitClick);
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
