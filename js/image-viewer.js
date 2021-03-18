'use strict';

import {
  Utility
} from './utility.js';

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;
const DISPLAYED_COMMENTS_AMOUNT = 5;

class ImageViewer {
  constructor () {
    this.body = document.body;
    this.bigPicture = document.querySelector('.big-picture');
    this.bigPictureImgBox = this.bigPicture.querySelector('.big-picture__img');
    this.bigPictureImg = this.bigPictureImgBox.querySelector('img');
    this.likesCount = this.bigPicture.querySelector('.likes-count');
    this.commentsCount = this.bigPicture.querySelector('.comments-count');
    this.socialComments = this.bigPicture.querySelector('.social__comments');
    this.socialCaption = this.bigPicture.querySelector('.social__caption');
    this.socialCommentCount = this.bigPicture.querySelector('.social__comment-count');
    this.socialCommentsLoader = this.bigPicture.querySelector('.social__comments-loader');
    this.bigPictureCancel = this.bigPicture.querySelector('.big-picture__cancel');
    this.openBigPicture = this.openBigPicture.bind(this);
    this.closeBigPicture = this.closeBigPicture.bind(this);
    this.searchMetaData = this.searchMetaData.bind(this);
    this.setPictureParams = this.setPictureParams.bind(this);
    this.createCommentsFragment = this.createCommentsFragment.bind(this);
    this.getCommentsArray = this.getCommentsArray.bind(this);
    this.clearSocialComments = this.clearSocialComments.bind(this);
    this.hideExtraComments = this.hideExtraComments.bind(this);
    this.seeMoreComments = this.seeMoreComments.bind(this);
    this.onPictureClose = this.onPictureClose.bind(this);
    this.onPopupEscKeydown = this.onPopupEscKeydown.bind(this);
    this.onPictureClick = this.onPictureClick.bind(this);
    this.onPictureEnterKeydown = this.onPictureEnterKeydown.bind(this);
    this.onSocialCommentsLoaderClick = this.onSocialCommentsLoaderClick.bind(this);
  }

  openBigPicture () {
    this.bigPicture.classList.remove('hidden');
    this.socialCommentsLoader.classList.add('hidden');
    this.socialCommentCount.classList.add('hidden');
    this.body.classList.add('modal-open');
    return this;
  }

  closeBigPicture () {
    this.bigPicture.classList.add('hidden');
    this.socialCommentCount.classList.remove('hidden');
    this.socialCommentsLoader.classList.remove('hidden');
    this.body.classList.remove('modal-open');
    return this;
  }

  searchMetaData (address) {
    const imageSrc = Utility.extractPath(address).slice(1);
    const usedData = this.photoDescriptions.find((item) => item.url === imageSrc);
    this.metaData = Object.create(
      Object.getPrototypeOf(usedData),
      Object.getOwnPropertyDescriptors(usedData),
    );
    return this;
  }

  setPictureParams () {
    this.bigPictureImg.src = this.metaData.url;
    this.likesCount.textContent = this.metaData.likes;
    this.commentsCount.textContent = this.metaData.comments.length;
    this.socialCaption.textContent = this.metaData.description;
    return this;
  }

  createCommentsFragment () {
    const commentsFragment = document.createDocumentFragment();
    this.metaData.comments.forEach(item => {
      const listItem = document.createElement('li');
      const image = document.createElement('img');
      const paragraph = document.createElement('p');

      image.classList.add('social__picture');
      image.src = item.avatar;
      image.alt = item.name;
      image.width = AVATAR_WIDTH;
      image.height = AVATAR_HEIGHT;

      paragraph.classList.add('social__text');
      paragraph.textContent = item.message;

      listItem.classList.add('social__comment');
      listItem.appendChild(image);
      listItem.appendChild(paragraph);

      commentsFragment.appendChild(listItem);
    });

    this.commentsFragment = commentsFragment;
    return this;
  }

  getCommentsArray () {
    return Array.from(this.socialComments.children);
  }

  clearSocialComments () {
    if (this.socialComments.children.length) {
      this.getCommentsArray().forEach(item => this.socialComments.removeChild(item));
    }
    return this;
  }

  hideExtraComments () {
    if (this.socialComments.children.length > DISPLAYED_COMMENTS_AMOUNT) {
      this.hiddenComments = this.getCommentsArray().slice(DISPLAYED_COMMENTS_AMOUNT);
      this.hiddenComments.forEach(item => item.classList.add('hidden'));
    }
    if (this.hiddenComments.length) {
      this.socialCommentsLoader.classList.remove('hidden');
    }
    return this;
  }

  seeMoreComments () {
    const startIndex = 0;
    let elementsToDisplay;
    if (!this.hiddenComments.length) {return undefined}
    if (this.hiddenComments.length < DISPLAYED_COMMENTS_AMOUNT) {
      elementsToDisplay = this.hiddenComments.splice(startIndex);
    } else {
      elementsToDisplay = this.hiddenComments
        .splice(startIndex, DISPLAYED_COMMENTS_AMOUNT);
    }
    elementsToDisplay.forEach(item => item.classList.remove('hidden'));
    if (!this.hiddenComments.length) {
      this.socialCommentsLoader.classList.add('hidden');
    }
    return this;
  }

  onPictureClose (evt) {
    evt.preventDefault();
    this.closeBigPicture();
    this.bigPictureCancel.removeEventListener('click', this.onPictureClose);
    this.socialCommentsLoader.removeEventListener('click', this.onSocialCommentsLoaderClick);
    document.removeEventListener('keydown', this.onPopupEscKeydown);
    return undefined;
  }

  onPopupEscKeydown (evt) {
    if (Utility.isEscEvent(evt)) {
      this.onPictureClose(evt);
    }
    return undefined;
  }

  onPictureClick (evt) {
    evt.preventDefault();
    if (Utility.matchElement(evt, 'img[class="picture__img"]') || Utility.matchElement(evt, 'a[class="picture"]')) {
      this.openBigPicture()
        .searchMetaData(evt.target.src || evt.target.querySelector('.picture__img').src)
        .setPictureParams()
        .createCommentsFragment()
        .clearSocialComments();
      this.socialComments.appendChild(this.commentsFragment);
      this.hideExtraComments()
      this.bigPictureCancel.addEventListener('click', this.onPictureClose);
      this.socialCommentsLoader.addEventListener('click', this.onSocialCommentsLoaderClick);
      document.addEventListener('keydown', this.onPopupEscKeydown);
    }
    return undefined;
  }

  onPictureEnterKeydown (evt) {
    if (Utility.isEnterEvent(evt)) {
      evt.preventDefault();
      this.onPictureClick(evt);
    }
    return undefined;
  }

  onSocialCommentsLoaderClick (evt) {
    evt.preventDefault();
    this.seeMoreComments();
  }
}

const imageViewer = new ImageViewer();

export {
  imageViewer
};
