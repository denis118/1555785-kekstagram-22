'use strict';

import {
  Utility
} from './utility.js';

import {
  data
} from './data.js';

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
  hashtags
} from './hashtags.js';

import {
  comment
} from './comment.js';

class ImageEditor {
  constructor () {
    this.body = document.body;
    this.uploadFile = document.querySelector('#upload-file');
    this.imgUploadOverlay = document.querySelector('.img-upload__overlay');
    this.imgUploadPreview = document.querySelector('.img-upload__preview');
    this.openedPicture = this.imgUploadPreview.querySelector('img[alt="Предварительный просмотр фотографии"]');
    this.uploadCancel = document.querySelector('#upload-cancel');
    this.uploadSubmit = document.querySelector('button[id="upload-submit"]');
    this.scale = new Scale(this.openedPicture);
    this.slider = new Slider(this.openedPicture).buildEffectsOptions();
    this.effects = new Effects(this.openedPicture, this.slider.switch, Slider.emulateClassName);
    this.resetFormData = this.resetFormData.bind(this);
    this.onUploadSubmitClick = this.onUploadSubmitClick.bind(this);
    this.onUploadFileChange = this.onUploadFileChange.bind(this);
    this.onUploadCancelClick = this.onUploadCancelClick.bind(this);
    this.onUploadFileEscKeydown = this.onUploadFileEscKeydown.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.close = this.close.bind(this);
  }

  resetFormData () {
    this.effects.radiosArray.find((item) => item.id.match(/.+none$/)).checked = true;
    [this.slider.processNoneCase, hashtags.clean, comment.clean].forEach(item => item());
    return undefined;
  }

  onUploadSubmitClick (evt) {
    if (hashtags.searchSingleHash() || hashtags.checkIncorrectHashTags()) {evt.preventDefault()}
    return undefined;
  }

  onUploadFileChange (evt) {
    evt.preventDefault();
    this.body.classList.add('modal-open');
    this.imgUploadOverlay.classList.remove('hidden');
    this.scale.setUserScale();
    this.scale.setEventListeners();
    this.effects.setEventListeners();
    data.setEventListeners();
    comment.setEventListeners();
    hashtags.setEventListeners();
    this.uploadCancel.addEventListener('click', this.onUploadCancelClick);
    this.uploadSubmit.addEventListener('click', this.onUploadSubmitClick);
    document.addEventListener('keydown', this.onUploadFileEscKeydown);
    return undefined;
  }

  onUploadCancelClick (evt) {
    evt.preventDefault();
    this.uploadFile.value = '';
    this.body.classList.remove('modal-open');
    this.imgUploadOverlay.classList.add('hidden');
    this.resetFormData();
    this.scale.eraseEventListeners();
    this.effects.eraseEventListeners();
    data.eraseEventListeners();
    comment.eraseEventListeners();
    hashtags.eraseEventListeners();
    this.uploadCancel.removeEventListener('click', this.onUploadCancelClick);
    this.uploadSubmit.removeEventListener('click', this.onUploadSubmitClick);
    document.removeEventListener('keydown', this.onUploadFileEscKeydown);
    return undefined;
  }

  onUploadFileEscKeydown (evt) {
    if (Utility.isEscEvent(evt)) {
      this.onUploadCancelClick(evt);
    }
    return undefined;
  }

  setEventListeners () {
    this.uploadFile.addEventListener('change', this.onUploadFileChange);
    return undefined;
  }

  close (evt) {
    this.onUploadCancelClick(evt)
  }
}

const imageEditor = new ImageEditor();
imageEditor.setEventListeners();


export {
  imageEditor
};
