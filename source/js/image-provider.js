'use strict';

import {
  Utility
} from './utility.js';

import {
  imageViewer
} from './image-viewer.js';

const RENDERING_DELAY = 500;

class ImageProvider {
  constructor () {
    this.picturesBlock = document.querySelector('.pictures');
    this.picture = document.querySelector('#picture').content.querySelector('.picture');
    this.collectPictures = this.collectPictures.bind(this);
    this.onPicturesBlockMouseOver = this.onPicturesBlockMouseOver.bind(this);
    this.onPicturesBlockMouseOut = this.onPicturesBlockMouseOut.bind(this);
    this.onPicturesBlockFocus = this.onPicturesBlockFocus.bind(this);
    this.onPicturesBlockBlur = this.onPicturesBlockBlur.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.render = Utility.debounce(this.render, RENDERING_DELAY);
    this.clean = this.clean.bind(this);
  }

  collectPictures (data) {
    this.fragment = document.createDocumentFragment();
    data.forEach((_, i) => {
      const newPicture = this.picture.cloneNode(true);
      const pictureImg = newPicture.querySelector('.picture__img');
      const pictureComments = newPicture.querySelector('.picture__comments');
      const pictureLikes = newPicture.querySelector('.picture__likes');
      pictureImg.src = data[i].url;
      pictureComments.textContent = data[i].comments.length;
      pictureLikes.textContent = data[i].likes;
      this.fragment.appendChild(newPicture);
    });
    return this;
  }

  clean () {
    const pictures = this.picturesBlock.querySelectorAll('.picture');
    if (pictures.length) {
      pictures.forEach(item => this.picturesBlock.removeChild(item));
    }
    return this;
  }

  render (data) {
    this.clean();
    this.collectPictures(data);
    this.picturesBlock.appendChild(this.fragment);
    return this;
  }

  onPicturesBlockMouseOver (evt) {
    if (Utility.matchElement(evt, 'img[class="picture__img"]')) {
      evt.target.addEventListener('click', imageViewer.onPictureClick);
    }
    return undefined;
  }

  onPicturesBlockMouseOut (evt) {
    if (Utility.matchElement(evt, 'img[class="picture__img"]')) {
      evt.target.removeEventListener('click', imageViewer.onPictureClick);
    }
    return undefined;
  }

  onPicturesBlockFocus (evt) {
    if (Utility.matchElement(evt, 'a[class="picture"]')) {
      evt.target.addEventListener('keydown', imageViewer.onPictureEnterKeydown);
    }
    return undefined;
  }

  onPicturesBlockBlur (evt) {
    if (Utility.matchElement(evt, 'a[class="picture"]')) {
      evt.target.removeEventListener('keydown', imageViewer.onPictureEnterKeydown);
    }
    return undefined;
  }

  setEventListeners () {
    this.picturesBlock.addEventListener('mouseover', this.onPicturesBlockMouseOver);
    this.picturesBlock.addEventListener('mouseout', this.onPicturesBlockMouseOut);
    this.picturesBlock.addEventListener('focus', this.onPicturesBlockFocus, true);
    this.picturesBlock.addEventListener('blur', this.onPicturesBlockBlur, true);
    return undefined;
  }
}

const imageProvider = new ImageProvider();

export {
  imageProvider
};
