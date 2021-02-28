import {
  validateStringLength,
  markField
} from './utility.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_AMOUNT = 5;

const hashTagsElement = document.querySelector('input[class="text__hashtags"]');
const changeOutlineStyle = markField(hashTagsElement);

const getTagsArray = string => string.trim().split(' ').map(item => item.toLowerCase());
const searchFalse = (array, func) => array.map(item => func(item)).includes(false);
const checkSingleHash = string => string.match(/^#$/) ? false : true;
const checkAllowedChars = string => string.match(/^#[\p{Nd}\p{Alpha}]+$/u) ? true : false;
const checkNonUniqueness = arr => [...new Set(arr)].length !== arr.length ? true : false;
const checkTagLength = (string, length = MAX_HASHTAG_LENGTH) => validateStringLength(string, length);
const checkTagsCountExceeding = (array, maxLength = MAX_HASHTAGS_AMOUNT) => array.length > maxLength ? true : false;

const searchInvalidHashTags = () => {
  let stopSubmit = false;
  if (!hashTagsElement.value) {return stopSubmit}
  const tagsArray = getTagsArray(hashTagsElement.value);
  const invalidities = [];
  const hashTagPipes = [
    {
      method: searchFalse(tagsArray, checkSingleHash),
      message: 'Хэш-тег не может состоять толко из #',
    },
    {
      method: searchFalse(tagsArray, checkAllowedChars),
      message: 'Хэштег начинается с #, а строка после # должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д',
    },
    {
      method: checkNonUniqueness(tagsArray),
      message: 'Хэш-теги должны быть уникальны при условии нечувствительности к регистру',
    },
    {
      method: searchFalse(tagsArray, checkTagLength),
      message: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
    },
    {
      method: checkTagsCountExceeding(tagsArray),
      message: 'Нельзя указать больше пяти хэш-тегов',
    },
  ];
  for (let i = 0; i < hashTagPipes.length; i++) {
    if (hashTagPipes[i].method) {
      invalidities.push(hashTagPipes[i].message);
    }
  }
  if (invalidities.length) {
    hashTagsElement.setCustomValidity(invalidities.join('. \n'));
    hashTagsElement.reportValidity();
    changeOutlineStyle('1px solid red');
    stopSubmit = true;
  } else {
    hashTagsElement.setCustomValidity('');
    changeOutlineStyle('');
  }
  return stopSubmit;
};

export {
  searchInvalidHashTags
};
