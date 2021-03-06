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

const cloneErrorNode = () => {
  const errorBlock = document.querySelector('#error')
    .content
    .querySelector('.error');
  const newError = errorBlock.cloneNode(true);
  const errorTitle = newError.querySelector('.error__title');
  const errorButton = newError.querySelector('.error__button');
  return [newError, errorTitle, errorButton];
};

const cloneSuccessNode = () => {
  const successBlock = document.querySelector('#success')
    .content
    .querySelector('.success');
  const newSuccess = successBlock.cloneNode(true);
  const successTitle = newSuccess.querySelector('.success__title');
  const successButton = newSuccess.querySelector('.success__button');
  return [newSuccess, successTitle, successButton];
};

const showMessage = () => (error, params = {}) => {
  const main = document.querySelector('main');
  const fragment = document.createDocumentFragment();
  let newNode = null;
  let newNodeButton = null;

  if (error) {
    const [newError, errorTitle, errorButton] = cloneErrorNode();
    if (params.title) {
      errorTitle.innerText = params.title;
    }
    if (params.button) {
      errorButton.innerText = params.button;
    }
    newNode = newError;
    newNodeButton = errorButton;
  } else {
    const [newSuccess, successTitle, successButton] = cloneSuccessNode();
    if (params.title) {
      successTitle.innerText = params.title;
    }
    if (params.button) {
      successButton.innerText = params.button;
    }
    newNode = newSuccess;
    newNodeButton = successButton;
  }

  fragment.appendChild(newNode);
  main.appendChild(fragment);

  const onMessageButtonClick = () => {
    main.removeChild(newNode);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentEscKeydown);
    return undefined;
  };
  const onDocumentClick = (evt) => {
    if (evt.target.className.match(/^error$/) || evt.target.className.match(/^success$/)) {
      onMessageButtonClick();
    }
    return undefined;
  };
  const onDocumentEscKeydown = (evt) => {
    if (isEscEvent(evt)) {onMessageButtonClick()}
    return undefined;
  };

  newNodeButton.addEventListener('click', onMessageButtonClick, {once: true});
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  return undefined;
};

const throttle = (func, ms) => {
  let isThrottled = false;
  let args = null;
  let self = null;
  return function () {
    if (isThrottled) {
      args = arguments;
      self = this;
      return undefined;
    }
    func.apply(this, arguments);
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
      func.apply(self, args);
    }, ms);
    return undefined;
  };
}

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
  onTextFieldKeydown,
  showMessage,
  throttle
};
