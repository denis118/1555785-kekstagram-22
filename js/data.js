'use strict';

import {
  Utility
} from './utility.js';

import {
  imageProvider
} from './image-provider.js';

import {
  imageViewer
} from './image-viewer.js';

import {
  imageEditor
} from './image-editor.js';

import {
  imageFilter
} from './image-filter.js';

const URL_FOR_RECEIVING = 'https://22.javascript.pages.academy/kekstagram/data';
const URL_FOR_SENDING = 'https://22.javascript.pages.academy/kekstagram';

class Data {
  constructor () {
    this.imgUploadForm = document.querySelector('#upload-select-image');
    this.onLoadingError = Utility.showMessage().bind(this);
    this.onSuccess = Utility.showMessage().bind(this);
    this.onError = Utility.showMessage().bind(this);
    this.receive = this.receive.bind(this);
    this.send = this.send.bind(this);
    this.onImgUploadFormSubmit = this.onImgUploadFormSubmit.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.eraseEventListeners = this.eraseEventListeners.bind(this);
  }

  receive () {
    fetch(URL_FOR_RECEIVING)
      .then(response => !response.ok ?
        new Error(`${response.status} ${response.statusText}`) :
        response.json())
      .then(json => {
        imageProvider.render(json);
        imageProvider.setEventListeners();
        imageViewer.photoDescriptions = json;
        imageFilter.showFilters().storeAllData(json).setEventListeners();
        return undefined;
      })
      .catch(error => this.onLoadingError(error, {
        title: `${error.name}: ${error.message}`,
        button: 'Ok',
      }));
    return undefined;
  }

  send (evt, form) {
    const formData = new FormData(evt.target) || new FormData(form);
    fetch(
      URL_FOR_SENDING,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then(response => {
        if (!response.ok) {throw new Error()}
        imageEditor.close(evt);
        this.onSuccess();
        return undefined;
      })
      .catch(error => {
        imageEditor.close(evt);
        this.onError(error);
      });
    return undefined;
  }

  onImgUploadFormSubmit (evt) {
    evt.preventDefault();
    this.send(evt);
  }

  setEventListeners () {
    this.imgUploadForm.addEventListener('submit', this.onImgUploadFormSubmit);
    return undefined;
  }

  eraseEventListeners () {
    this.imgUploadForm.removeEventListener('submit', this.onImgUploadFormSubmit);
    return undefined;
  }
}

const data = new Data();

export {
  data
};
