const MAX_COMMENT_LENGTH = 140;

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
};

const validateStringLength = function (stringToCheck, maxLength) {
  if (typeof stringToCheck !== 'string') {
    return new Error('Первый аргумент функции должен иметь тип "string"');
  }
  if (maxLength < 0) {
    return new Error('Значение длины строки должно быть положительным числом, включая ноль');
  }
  return (stringToCheck.length <= maxLength) ? true : false;
};

const setId = function (key) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, 0);
  }
  let id = Number(localStorage.getItem(key));
  id += 1;
  localStorage.setItem(key, id);
  return id;
};

const mixWords = function (firstMember, secondMember) {
  return firstMember[getNumber(0, firstMember.length - 1)] + ' ' + secondMember[getNumber(0, secondMember.length - 1)];
};

const chooseSentence = function (array) {
  const validSentences = [];
  for (let i = 0; i < array.length; i++) {
    if (validateStringLength(array[i], MAX_COMMENT_LENGTH)) {
      validSentences.push((array.slice(i, i + 1))[0]);
    }
  }
  return validSentences[getNumber(0, validSentences.length - 1)];
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

const extractPath = (string) => {
  return new URL(string).pathname;
};

const markField = (element) => {
  const currentOutlineStyle = element.style.outline;
  const changeOutlineStyle = (outlineStyle) => {
    if (outlineStyle) {
      element.style.outline = outlineStyle;
      return undefined;
    } else {
      element.style.outline = currentOutlineStyle;
    }
    return undefined;
  };
  return changeOutlineStyle;
};

const onTextFieldKeydown = (evt) => {
  if (isEscEvent) {evt.stopPropagation()}
};

export {
  MAX_COMMENT_LENGTH,
  getNumber,
  validateStringLength,
  setId,
  mixWords,
  chooseSentence,
  isEscEvent,
  isEnterEvent,
  extractPath,
  markField,
  onTextFieldKeydown
};
