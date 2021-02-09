import {
  getNumber,
  setId,
  mixWords,
  chooseSentence
} from './utility.js';

const PHOTO_DESCRIPTION_QUANTITY = 25;
const AVATAR_START_NUMBER = 1;
const AVATAR_END_NUMBER = 6;
const MIN_LIKES_QUANTITY = 15;
const MAX_LIKES_QUANTITY = 200;
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

const generateComment = function () {
  return {
    id: setId('comment'),
    avatar: `img/avatar-${getNumber(AVATAR_START_NUMBER, AVATAR_END_NUMBER)}.svg`,
    message: chooseSentence(MESSAGE_ROW_MATERIALS),
    name: mixWords(NAMES, SURNAMES),
  };
};

const describePhoto = function () {
  return {
    id: setId('description'),
    url: `photos/${localStorage.getItem('description')}.jpg`,
    description: mixWords(ADJECTIVES, NOUNS),
    likes: getNumber(MIN_LIKES_QUANTITY, MAX_LIKES_QUANTITY),
    comment: generateComment(),
  };
};

const photoDescription = new Array(PHOTO_DESCRIPTION_QUANTITY)
  .fill(null)
  .map(() => describePhoto());

export {
  photoDescription
};
