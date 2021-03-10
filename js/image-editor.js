import {
  Utility
} from './utility.js';

import {
  Scale
} from './scale.js';

import {
  Effects
} from './effects.js';

import {
  Slider
} from './slider.js';

import {
  // hashTagsField,
  // checkInvalidHashTags,
  // onHashTagsInput,
  // searchSingleHash,
  // onHashTagsFocus,
  // onHashTagsBlur,
  // clearHashTagsField
  hashtags
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
const imgUploadPreview = document.querySelector('.img-upload__preview');
const openedPicture = imgUploadPreview.querySelector('img[alt="Предварительный просмотр фотографии"]');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadSubmit = document.querySelector('button[id="upload-submit"]');

const scale = new Scale(openedPicture);
const slider = new Slider(openedPicture).buildEffectsOptions();
const effects = new Effects(openedPicture, slider.switch, Slider.emulateClassName);

const resetFormData = () => {
  effects.radiosArray.find((item) => item.id.match(/.+none$/)).checked = true;
  [slider.processNoneCase, hashtags.clean, comment.clean].forEach(item => item());
  return undefined;
};

const onUploadSubmitClick = (evt) => {
  if (hashtags.searchSingleHash() || hashtags.checkInvalidHashTags()) {evt.preventDefault()}
  return undefined;
};

const onUploadFileChange = (evt) => {
  evt.preventDefault();
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  scale.setUserScale();
  comment.setEventListeners();
  scale.setEventListeners();
  effects.setEventListeners();
  hashtags.setEventListeners();
  uploadCancel.addEventListener('click', onUploadCancelClick);
  imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);
  // hashTagsField.addEventListener('input', onHashTagsInput);
  // hashTagsField.addEventListener('focus', onHashTagsFocus);
  // hashTagsField.addEventListener('blur', onHashTagsBlur);
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
  scale.eraseEventListeners();
  effects.eraseEventListeners();
  hashtags.eraseEventListeners();
  uploadCancel.removeEventListener('click', onUploadCancelClick);
  imgUploadForm.removeEventListener('submit', onImgUploadFormSubmit);
  // hashTagsField.removeEventListener('click', onHashTagsInput);
  // hashTagsField.removeEventListener('focus', onHashTagsFocus);
  // hashTagsField.removeEventListener('blur', onHashTagsBlur);
  uploadSubmit.removeEventListener('click', onUploadSubmitClick);
  document.removeEventListener('keydown', onUploadFileEscKeydown);
  return undefined;
};

const onUploadFileEscKeydown = (evt) => {
  if (Utility.isEscEvent(evt)) {
    onUploadCancelClick(evt);
  }
  return undefined;
};

uploadFile.addEventListener('change', onUploadFileChange);

export {
  onUploadCancelClick,
  openedPicture
};
