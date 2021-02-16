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

const bigPicture = document.querySelector('.big-picture');
const bigPictureImgBox = bigPicture.querySelector('.big-picture__img');
const bigPictureImg = bigPictureImgBox.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  socialCommentsLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
};

const searchMetaData = (address) => {
  const imageSrc = extractPath(address).slice(1);
  const metaData = photoDescription.find((item) => item.url === imageSrc);
  return metaData;
};

const setPictureParams = (metaData) => {
  bigPictureImg.src = metaData.url;
  likesCount.textContent = metaData.likes;
  commentsCount.textContent = metaData.comments.length;
  socialCaption.textContent = metaData.description;
};

const createCommentsFragment = (metaData) => {
  const commentsFragment = document.createDocumentFragment();

  for (let i = 0; i < metaData.comments.length; i++) {
    const listItem = document.createElement('li');
    const image = document.createElement('img');
    const paragraph = document.createElement('p');

    image.classList.add('social__picture');
    image.src = metaData.comments[i].avatar;
    image.alt = metaData.comments[i].name;
    image.width = AVATAR_WIDTH;
    image.height = AVATAR_HEIGHT;

    paragraph.classList.add('social__text');
    paragraph.textContent = metaData.comments[i].message;

    listItem.classList.add('social__comment');
    listItem.appendChild(image);
    listItem.appendChild(paragraph);

    commentsFragment.appendChild(listItem);
  }

  return commentsFragment;
};

const renderComments = (commentsFragment) => {
  if (socialComments.children.length) {
    for (let i = socialComments.children.length - 1; i >= 0; i--) {
      socialComments.removeChild(socialComments.children[i]);
    }
  }

  socialComments.appendChild(commentsFragment);

  if (socialComments.children.length > DISPLAYED_COMMENTS_AMOUNT) {
    for (let i = socialComments.children.length - 1; i >= DISPLAYED_COMMENTS_AMOUNT; i--) {
      socialComments.children[i].classList.add('hidden');
    }
  }
};

const pictureCloseHandler = (evt) => {
  evt.preventDefault();
  closeBigPicture();

  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPictureCancel.removeEventListener('click', pictureCloseHandler);
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    pictureCloseHandler(evt);
  }
};

const pictureOpenHandler = (evt) => {
  evt.preventDefault();

  if (evt.target.matches('img[class="picture__img"]') || evt.target.matches('a[class="picture"]')) {
    openBigPicture();
    const metaData = searchMetaData(evt.target.src || evt.target.querySelector('.picture__img').src);
    setPictureParams(metaData);
    const commentsFragment = createCommentsFragment(metaData);
    renderComments(commentsFragment);

    document.addEventListener('keydown', onPopupEscKeydown);
    bigPictureCancel.addEventListener('click', pictureCloseHandler);
  }
};

const onPictureEnterKeydown = (evt) => {
  if (isEnterEvent(evt)) {
    evt.preventDefault();
    pictureOpenHandler(evt);
  }
};

export {
  pictureOpenHandler,
  onPictureEnterKeydown
};
