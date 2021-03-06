import {
  validateStringLength,
  markField,
  onTextFieldKeydown
} from './utility.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_AMOUNT = 5;

const hashTagsField = document.querySelector('input[class="text__hashtags"]');
const changeOutlineStyle = markField(hashTagsField);

const getTagsArray = string => string.trim().split(' ').map(item => item.toLowerCase());
const searchFalse = (array, func) => array.map(item => func(item)).includes(false);
const checkSingleHash = string => string.match(/^#$/) ? false : true;
const checkAllowedChars = string => string.match(/^#[\p{Nd}\p{Alpha}]+$/u) ? true : false;
const checkNonUniqueness = arr => [...new Set(arr)].length !== arr.length ? true : false;
const checkTagLength = (string, length = MAX_HASHTAG_LENGTH) => validateStringLength(string, length);
const checkTagsCountExceeding = (array, maxLength = MAX_HASHTAGS_AMOUNT) => array.length > maxLength ? true : false;

const checkInvalidHashTags = () => {
  const tagsArray = getTagsArray(hashTagsField.value);
  let stopSubmit = false;
  if (searchFalse(tagsArray, checkSingleHash) || !hashTagsField.value) {
    hashTagsField.setCustomValidity('');
    if (hashTagsField.style.outline.match(/^red solid 1px$/)) {
      changeOutlineStyle('');
    }
    return stopSubmit;
  }
  const invalidities = [];
  const hashTagPipes = [
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
    hashTagsField.setCustomValidity(invalidities.join('. \n'));
    hashTagsField.reportValidity();
    changeOutlineStyle('1px solid red');
    stopSubmit = true;
  } else {
    hashTagsField.setCustomValidity('');
    changeOutlineStyle('');
  }
  return stopSubmit;
};

const searchSingleHash = () => {
  let stopSubmit = true;
  if (searchFalse(getTagsArray(hashTagsField.value), checkSingleHash)) {
    hashTagsField.setCustomValidity('Хэш-тег не может состоять толко из #');
    hashTagsField.reportValidity();
    changeOutlineStyle('1px solid red');
    return stopSubmit;
  } else {
    hashTagsField.value = hashTagsField.value.trim();
    hashTagsField.setCustomValidity('');
    changeOutlineStyle('');
    stopSubmit = false;
    return stopSubmit;
  }
};

const onHashTagsInput = () => {
  checkInvalidHashTags();
  return undefined;
};

const onHashTagsFocus = (evt) => {
  evt.preventDefault();
  hashTagsField.addEventListener('keydown', onTextFieldKeydown);
  return undefined;
};

const onHashTagsBlur = (evt) => {
  evt.preventDefault();
  hashTagsField.removeEventListener('keydown', onTextFieldKeydown);
  return undefined;
};

const clearHashTagsField = () => hashTagsField.value = '';

export {
  hashTagsField,
  checkInvalidHashTags,
  onHashTagsInput,
  searchSingleHash,
  onHashTagsFocus,
  onHashTagsBlur,
  clearHashTagsField
};
