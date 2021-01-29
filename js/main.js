'use strict'

const getNumber = function (lowerLimit, upperLimit) {
  if (lowerLimit < 0 || upperLimit < 0) {
    return new Error('Аргумент может быть только положительным числом, включая ноль');
  }

  if (upperLimit <= lowerLimit) {
    return new Error('Значение второго аргумента должно быть больше значения первого аргумента');
  }

  lowerLimit = Math.ceil(lowerLimit);
  upperLimit = Math.floor(upperLimit);
  return Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;

  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
}

getNumber();

const COMMENT_MAX_LENGTH = 140;
const validateStringLength = function (stringToCheck, maxLength = COMMENT_MAX_LENGTH) {
  if (typeof stringToCheck !== 'string') {
    return new Error('Первый аргумент функции должен иметь тип "string"');
  }

  return (stringToCheck.length <= maxLength) ? true : false;
}

validateStringLength();
