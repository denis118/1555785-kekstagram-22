import {
  photoDescription
} from './photo-description.js';

import {
  pictureOpenHandler,
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

picturesBlock.addEventListener('click', pictureOpenHandler);
picturesBlock.addEventListener('keydown', onPictureEnterKeydown);
