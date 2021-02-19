import {
  isEscEvent
} from './utility.js';

const body = document.body;
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');

const onUploadFileChange = (evt) => {
  evt.preventDefault();
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');

  uploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onUploadFileEscKeydown);
};

const onUploadCancelClick = (evt) => {
  evt.preventDefault();
  uploadFile.value = '';
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');

  uploadCancel.removeEventListener('click', onUploadCancelClick);
  document.removeEventListener('keydown', onUploadFileEscKeydown);
};

const onUploadFileEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    onUploadCancelClick(evt);
  }
};

uploadFile.addEventListener('change', onUploadFileChange);
