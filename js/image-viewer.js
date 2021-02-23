import {
  isEscEvent,
  isEnterEvent,
  extractPath
} from './utility.js';

import {
  photoDescription
} from './photo-description.js';

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;
const DISPLAYED_COMMENTS_AMOUNT = 5;

const Elements = new function () {
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
};

const viewImage = function () {};
Object.assign(viewImage, Elements);

viewImage.openBigPicture = function () {
  this.bigPicture.classList.remove('hidden');
  this.socialCommentsLoader.classList.add('hidden');
  this.socialCommentCount.classList.add('hidden');
  this.body.classList.add('modal-open');
  return this;
};

viewImage.closeBigPicture = function () {
  this.bigPicture.classList.add('hidden');
  this.socialCommentCount.classList.remove('hidden');
  this.socialCommentsLoader.classList.remove('hidden');
  this.body.classList.remove('modal-open');
  return this;
};

viewImage.searchMetaData = function (address) {
  const imageSrc = extractPath(address).slice(1);
  const usedData = photoDescription.find((item) => item.url === imageSrc);
  this.metaData = Object.create(Object.getPrototypeOf(usedData), Object.getOwnPropertyDescriptors(usedData));
  return this;
};

viewImage.setPictureParams = function () {
  this.bigPictureImg.src = this.metaData.url;
  this.likesCount.textContent = this.metaData.likes;
  this.commentsCount.textContent = this.metaData.comments.length;
  this.socialCaption.textContent = this.metaData.description;
  return this;
};

viewImage.createCommentsFragment = function () {
  const commentsFragment = document.createDocumentFragment();

  for (let i = 0; i < this.metaData.comments.length; i++) {
    const listItem = document.createElement('li');
    const image = document.createElement('img');
    const paragraph = document.createElement('p');

    image.classList.add('social__picture');
    image.src = this.metaData.comments[i].avatar;
    image.alt = this.metaData.comments[i].name;
    image.width = AVATAR_WIDTH;
    image.height = AVATAR_HEIGHT;

    paragraph.classList.add('social__text');
    paragraph.textContent = this.metaData.comments[i].message;

    listItem.classList.add('social__comment');
    listItem.appendChild(image);
    listItem.appendChild(paragraph);

    commentsFragment.appendChild(listItem);
  }

  this.commentsFragment = commentsFragment;
  return this;
};

viewImage.clearSocialComments = function () {
  if (this.socialComments.children.length) {
    for (let i = this.socialComments.children.length - 1; i >= 0; i--) {
      this.socialComments.removeChild(this.socialComments.children[i]);
    }
  }
  return this;
};

viewImage.hideExtraComments = function () {
  if (this.socialComments.children.length > DISPLAYED_COMMENTS_AMOUNT) {
    for (let i = this.socialComments.children.length - 1; i >= DISPLAYED_COMMENTS_AMOUNT; i--) {
      this.socialComments.children[i].classList.add('hidden');
    }
  }
  return this;
};

const onPictureClose = (evt) => {
  evt.preventDefault();
  viewImage.closeBigPicture();
  viewImage.bigPictureCancel.removeEventListener('click', onPictureClose);
  document.removeEventListener('keydown', onPopupEscKeydown);
  return undefined;
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    onPictureClose(evt);
  }
  return undefined;
};

const onPictureClick = (evt) => {
  evt.preventDefault();

  if (evt.target.matches('img[class="picture__img"]') || evt.target.matches('a[class="picture"]')) {
    viewImage.openBigPicture()
      .searchMetaData(evt.target.src || evt.target.querySelector('.picture__img').src)
      .setPictureParams()
      .createCommentsFragment()
      .clearSocialComments();

    viewImage.socialComments.appendChild(viewImage.commentsFragment);
    viewImage.hideExtraComments()

    viewImage.bigPictureCancel.addEventListener('click', onPictureClose);
    document.addEventListener('keydown', onPopupEscKeydown);
  }
  return undefined;
};

const onPictureEnterKeydown = (evt) => {
  if (isEnterEvent(evt)) {
    evt.preventDefault();
    onPictureClick(evt);
  }
  return undefined;
};

export {
  onPictureClick,
  onPictureEnterKeydown
};
