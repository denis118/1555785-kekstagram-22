'use strict';

import {
  Utility
} from './utility.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_AMOUNT = 5;

class Hashtags {
  constructor () {
    this.hashTagsField = document.querySelector('input[class="text__hashtags"]');
    this.changeOutlineStyle = Utility.markField(this.hashTagsField).bind(this);
    this.checkInvalidHashTags = this.checkInvalidHashTags.bind(this);
    this.searchSingleHash = this.searchSingleHash.bind(this);
    this.onHashTagsInput = this.onHashTagsInput.bind(this);
    this.onHashTagsFocus = this.onHashTagsFocus.bind(this);
    this.onHashTagsBlur = this.onHashTagsBlur.bind(this);
    this.clean = this.clean.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.eraseEventListeners = this.eraseEventListeners.bind(this);
  }

  static getTagsArray (string) {
    return string.trim().split(' ').map(item => item.toLowerCase());
  }

  static searchFalse (array, func) {
    return array.map(item => func(item)).includes(false);
  }

  static checkSingleHash (string) {
    return string.match(/^#$/) ? false : true;
  }

  static checkAllowedChars (string) {
    return string.match(/^#[\p{Nd}\p{Alpha}]+$/u) ? true : false;
  }

  static checkNonUniqueness (arr) {
    return [...new Set(arr)].length !== arr.length;
  }

  static checkTagLength (string, length = MAX_HASHTAG_LENGTH) {
    return Utility.validateStringLength(string, length);
  }

  static checkTagsCountExceeding (array, maxLength = MAX_HASHTAGS_AMOUNT) {
    return array.length > maxLength;
  }

  checkInvalidHashTags () {
    let stopSubmit = false;
    const tagsArray = Hashtags.getTagsArray(this.hashTagsField.value);
    if (Hashtags.searchFalse(tagsArray, Hashtags.checkSingleHash) || !this.hashTagsField.value) {
      this.hashTagsField.setCustomValidity('');
      if (this.hashTagsField.style.outline.match(/^red solid 1px$/)) {
        this.changeOutlineStyle('');
      }
      return stopSubmit;
    }
    const invalidities = [];
    const hashTagPipes = [
      {
        method: Hashtags.searchFalse(tagsArray, Hashtags.checkAllowedChars),
        message: 'Хэштег начинается с #, а строка после # должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д',
      },
      {
        method: Hashtags.checkNonUniqueness(tagsArray),
        message: 'Хэш-теги должны быть уникальны при условии нечувствительности к регистру',
      },
      {
        method: Hashtags.searchFalse(tagsArray, Hashtags.checkTagLength),
        message: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
      },
      {
        method: Hashtags.checkTagsCountExceeding(tagsArray),
        message: 'Нельзя указать больше пяти хэш-тегов',
      },
    ];
    hashTagPipes.forEach((_, i) => {
      if (hashTagPipes[i].method) {
        invalidities.push(hashTagPipes[i].message);
      }
    });
    if (invalidities.length) {
      this.hashTagsField.setCustomValidity(invalidities.join('. \n'));
      this.hashTagsField.reportValidity();
      this.changeOutlineStyle('1px solid red');
      stopSubmit = true;
    } else {
      this.hashTagsField.setCustomValidity('');
      this.changeOutlineStyle('');
    }
    return stopSubmit;
  }

  searchSingleHash () {
    let stopSubmit = true;
    const tagsArray = Hashtags.getTagsArray(this.hashTagsField.value);
    if (Hashtags.searchFalse(tagsArray, Hashtags.checkSingleHash)) {
      this.hashTagsField.setCustomValidity('Хэш-тег не может состоять толко из #');
      this.hashTagsField.reportValidity();
      this.changeOutlineStyle('1px solid red');
      return stopSubmit;
    } else {
      this.hashTagsField.value = this.hashTagsField.value.trim();
      this.hashTagsField.setCustomValidity('');
      this.changeOutlineStyle('');
      stopSubmit = false;
      return stopSubmit;
    }
  }

  onHashTagsInput () {
    this.checkInvalidHashTags();
    return undefined;
  }

  onHashTagsFocus (evt) {
    evt.preventDefault();
    this.hashTagsField.addEventListener('keydown', Utility.onTextFieldKeydown);
    return undefined;
  }

  onHashTagsBlur (evt) {
    evt.preventDefault();
    this.hashTagsField.removeEventListener('keydown', Utility.onTextFieldKeydown);
    return undefined;
  }

  clean () {
    this.hashTagsField.value = '';
    return undefined;
  }

  setEventListeners () {
    this.hashTagsField.addEventListener('input', this.onHashTagsInput);
    this.hashTagsField.addEventListener('focus', this.onHashTagsFocus);
    this.hashTagsField.addEventListener('blur', this.onHashTagsBlur);
    return undefined;
  }

  eraseEventListeners () {
    this.hashTagsField.removeEventListener('input', this.onHashTagsInput);
    this.hashTagsField.removeEventListener('focus', this.onHashTagsFocus);
    this.hashTagsField.removeEventListener('blur', this.onHashTagsBlur);
    return undefined;
  }
}

const hashtags = new Hashtags();

export {
  hashtags
};
