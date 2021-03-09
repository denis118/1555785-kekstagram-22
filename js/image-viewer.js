import {
  isEscEvent,
  isEnterEvent,
  extractPath
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
    this.clearSocialComments = this.clearSocialComments.bind(this);
    this.hideExtraComments = this.hideExtraComments.bind(this);
    this.onPictureClose = this.onPictureClose.bind(this);
    this.onPopupEscKeydown = this.onPopupEscKeydown.bind(this);
    this.onPictureClick = this.onPictureClick.bind(this);
    this.onPictureEnterKeydown = this.onPictureEnterKeydown.bind(this);
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
    const imageSrc = extractPath(address).slice(1);
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
  }

  clearSocialComments () {
    if (this.socialComments.children.length) {
      for (let i = this.socialComments.children.length - 1; i >= 0; i--) {
        this.socialComments.removeChild(this.socialComments.children[i]);
      }
    }
    return this;
  }

  hideExtraComments () {
    if (this.socialComments.children.length > DISPLAYED_COMMENTS_AMOUNT) {
      for (let i = this.socialComments.children.length - 1; i >= DISPLAYED_COMMENTS_AMOUNT; i--) {
        this.socialComments.children[i].classList.add('hidden');
      }
    }
    return this;
  }

  onPictureClose (evt) {
    evt.preventDefault();
    this.closeBigPicture();
    this.bigPictureCancel.removeEventListener('click', this.onPictureClose);
    document.removeEventListener('keydown', this.onPopupEscKeydown);
    return undefined;
  }

  onPopupEscKeydown (evt) {
    if (isEscEvent(evt)) {
      this.onPictureClose(evt);
    }
    return undefined;
  }

  onPictureClick (evt) {
    evt.preventDefault();
    if (evt.target.matches('img[class="picture__img"]') || evt.target.matches('a[class="picture"]')) {
      this.openBigPicture()
        .searchMetaData(evt.target.src || evt.target.querySelector('.picture__img').src)
        .setPictureParams()
        .createCommentsFragment()
        .clearSocialComments();
      this.socialComments.appendChild(this.commentsFragment);
      this.hideExtraComments()
      this.bigPictureCancel.addEventListener('click', this.onPictureClose);
      document.addEventListener('keydown', this.onPopupEscKeydown);
    }
    return undefined;
  }

  onPictureEnterKeydown (evt) {
    if (isEnterEvent(evt)) {
      evt.preventDefault();
      this.onPictureClick(evt);
    }
    return undefined;
  }
}

const imageViewer = new ImageViewer();

export {
  imageViewer
};
