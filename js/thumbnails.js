import {
  photoDescription
} from './photo-description.js';

import {
  onPictureClick,
  onPictureEnterKeydown
} from './image-viewer.js';

const picturesBlock = document.querySelector('.pictures');
const picture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const collectPictures = () => {
  const picturesFragment = document.createDocumentFragment();

  for (let i = 0; i < photoDescription.length; i++) {
    const newPicture = picture.cloneNode(true);
    const pictureImg = newPicture.querySelector('.picture__img');
    const pictureComments = newPicture.querySelector('.picture__comments');
    const pictureLikes = newPicture.querySelector('.picture__likes');

    pictureImg.src = photoDescription[i].url;
    pictureComments.textContent = photoDescription[i].comments.length;
    pictureLikes.textContent = photoDescription[i].likes;

    picturesFragment.appendChild(newPicture);
  }

  return picturesFragment;
};

const renderPictures = () => {
  picturesBlock.appendChild(collectPictures());
};

renderPictures();

const onPicturesBlockMouseOver = (evt) => {
  if (evt.target.matches('img[class="picture__img"]')) {
    evt.target.addEventListener('click', onPictureClick);
  }
};

const onPicturesBlockMouseOut = (evt) => {
  if (evt.target.matches('img[class="picture__img"]')) {
    evt.target.removeEventListener('click', onPictureClick);
  }
};

const onPicturesBlockFocus = (evt) => {
  if (evt.target.matches('a[class="picture"]')) {
    evt.target.addEventListener('keydown', onPictureEnterKeydown);
  }
};

const onPicturesBlockBlur = (evt) => {
  if (evt.target.matches('a[class="picture"]')) {
    evt.target.removeEventListener('keydown', onPictureEnterKeydown);
  }
};

picturesBlock.addEventListener('mouseover', onPicturesBlockMouseOver);
picturesBlock.addEventListener('mouseout', onPicturesBlockMouseOut);
picturesBlock.addEventListener('focus', onPicturesBlockFocus, true);
picturesBlock.addEventListener('blur', onPicturesBlockBlur, true);
