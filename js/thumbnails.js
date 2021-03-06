import {
  onPictureClick,
  onPictureEnterKeydown
} from './image-viewer.js';

const picturesBlock = document.querySelector('.pictures');
const picture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const collectPictures = (photoDescriptions) => {
  const picturesFragment = document.createDocumentFragment();
  for (let i = 0; i < photoDescriptions.length; i++) {
    const newPicture = picture.cloneNode(true);
    const pictureImg = newPicture.querySelector('.picture__img');
    const pictureComments = newPicture.querySelector('.picture__comments');
    const pictureLikes = newPicture.querySelector('.picture__likes');

    pictureImg.src = photoDescriptions[i].url;
    pictureComments.textContent = photoDescriptions[i].comments.length;
    pictureLikes.textContent = photoDescriptions[i].likes;

    picturesFragment.appendChild(newPicture);
  }
  return picturesFragment;
};

const renderPictures = (data) => {
  picturesBlock.appendChild(collectPictures(data));
  return undefined;
};

const onPicturesBlockMouseOver = (evt) => {
  if (evt.target.matches('img[class="picture__img"]')) {
    evt.target.addEventListener('click', onPictureClick);
  }
  return undefined;
};

const onPicturesBlockMouseOut = (evt) => {
  if (evt.target.matches('img[class="picture__img"]')) {
    evt.target.removeEventListener('click', onPictureClick);
  }
  return undefined;
};

const onPicturesBlockFocus = (evt) => {
  if (evt.target.matches('a[class="picture"]')) {
    evt.target.addEventListener('keydown', onPictureEnterKeydown);
  }
  return undefined;
};

const onPicturesBlockBlur = (evt) => {
  if (evt.target.matches('a[class="picture"]')) {
    evt.target.removeEventListener('keydown', onPictureEnterKeydown);
  }
  return undefined;
};

picturesBlock.addEventListener('mouseover', onPicturesBlockMouseOver);
picturesBlock.addEventListener('mouseout', onPicturesBlockMouseOut);
picturesBlock.addEventListener('focus', onPicturesBlockFocus, true);
picturesBlock.addEventListener('blur', onPicturesBlockBlur, true);

export {
  renderPictures
};
