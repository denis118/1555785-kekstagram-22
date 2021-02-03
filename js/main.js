'use strict';

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

getNumber();

const COMMENT_MAX_LENGTH = 140;
const validateStringLength = function (stringToCheck, maxLength = COMMENT_MAX_LENGTH) {
  if (typeof stringToCheck !== 'string') {
    return new Error('Первый аргумент функции должен иметь тип "string"');
  }

  if (maxLength < 0) {
    return new Error('Значение длины комментария должно быть положительным числом, включая ноль');
  }

  return (stringToCheck.length <= maxLength) ? true : false;
};

validateStringLength('', 0);

const PHOTO_DESCRIPTION_QUANTITY = 25;
const descriptionStorage = [];

let currentPhotoId = 0;
const setPhotoId = function () {
  if (localStorage.getItem('currentPhotoId')) {
    currentPhotoId = Number(localStorage.getItem('currentPhotoId'));
    currentPhotoId += 1;
    localStorage.setItem('currentPhotoId', currentPhotoId);
    return currentPhotoId;
  }

  currentPhotoId += 1;
  localStorage.setItem('currentPhotoId', currentPhotoId);
  return currentPhotoId;
};

const explanatoryText = [
  'Отличное лето',
  'Хорошая зима',
  'Плохая погода',
  'Успешная рыбалка',
  'Неудачный сёрфинг',
  'Урожайный год',
  'Новый член семьи',
  'Встреча одноклассников',
  'Осень пришла',
  'Поход за грибами',
  'Поломались на трассе',
  'Отдых нужен всем',
  'Марафон',
  'Повесили кормушку для птиц',
  'В гостях у родителей',
  'Семь раз отмерь, один раз отрежь',
  'Байкал',
  'Заброшенная деревня',
  'Наша степь',
  'Экспериментальный пирог',
  'Первые подстнежники',
  'Отмечаем Хэллоуин',
  'Последствия Хэллоуина',
  'Исследуем окрестности',
  'Дача',
];

const describePhoto = function () {
  for (let i = 0; i < PHOTO_DESCRIPTION_QUANTITY; i++) {
    let descriptionObject = {};
    descriptionObject.id = setPhotoId();
    descriptionObject.url = 'photos/' + descriptionObject.id + '.jpg';
    descriptionObject.description = explanatoryText[i];
    descriptionObject.likes = getNumber(15, 200);
    descriptionStorage.push(descriptionObject);
  }
};

describePhoto();

localStorage.removeItem('currentPhotoId');
