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

const ADJECTIVES = [
  'Красивый',
  'Хороший',
  'Добрый',
  'Умный',
  'Большой',
  'Знатный',
  'Смутный',
  'Всеобщий',
  'Грандиозный',
  'Ударный',
  'Локальный',
  'Крохотный',
  'Повседневный',
  'Многолетний',
  'Дорогой',
  'Новый',
  'Чёткий',
  'Звёздный',
  'Подозрительный',
  'Коренной',
  'Потенциальный',
  'Значительный',
  'Прогрессивный',
  'Крупный',
  'Могучий',
];

const NOUNS = [
  'объект',
  'посёлок',
  'дом',
  'дуб',
  'тир',
  'склон',
  'пруд',
  'столб',
  'луч',
  'мяч',
  'овраг',
  'путь',
  'луг',
  'смог',
  'склон',
  'сруб',
  'огород',
  'народ',
  'набор',
  'прибор',
  'забор',
  'ангар',
  'товар',
  'ручей',
  'ключ',
];

const NAMES = [
  'Аарон',
  'Азиз',
  'Блез',
  'Гамлет',
  'Гордей',
  'Давлат',
  'Евсей',
  'Жерар',
  'Заур',
  'Илья',
  'Карл',
  'Клим',
  'Лукьян',
  'Макар',
  'Никита',
  'Олег',
  'Педро',
  'Ратибор',
  'Савелий',
  'Тимур',
  'Устин',
  'Хаким',
  'Эльдар',
  'Юрий',
  'Ян',
];

const SURNAMES = [
  'Смирнов',
  'Иванов',
  'Кузнецов',
  'Соколов',
  'Попов',
  'Лебедев',
  'Козлов',
  'Новиков',
  'Морозов',
  'Петров',
  'Волков',
  'Соловьёв',
  'Васильев',
  'Зайцев',
  'Павлов',
  'Семёнов',
  'Голубев',
  'Виноградов',
  'Богданов',
  'Воробьёв',
  'Фёдоров',
  'Михайлов',
  'Беляев',
  'Тарасов',
  'Белов',
];

const MESSAGE_ROW_MATERIALS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

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
  return firstMember[getNumber(0, 24)] + ' ' + secondMember[getNumber(0, 24)];
};

const generateComment = function () {
  return {
    id: setId('comment'),
    avatar: `img/avatar-${getNumber(1, 6)}.svg`,
    message: MESSAGE_ROW_MATERIALS[getNumber(0, 5)],
    name: mixWords(NAMES, SURNAMES),
  };
};

const describePhoto = function () {
  return {
    id: setId('description'),
    url: `photos/${localStorage.getItem('description')}.jpg`,
    description: mixWords(ADJECTIVES, NOUNS),
    likes: getNumber(15, 200),
    comment: generateComment(),
  };
};

// не присваивал массив переменной из-за ESLint
new Array(PHOTO_DESCRIPTION_QUANTITY)
  .fill(null)
  .map(() => describePhoto());

// добавил эти строки временно, чтобы при обновлении страницы id начиналось с 1
localStorage.removeItem('description');
localStorage.removeItem('comment');
