import {
  openedPicture
} from './scale.js';

import {
  switchSlider,
  emulateClassName
} from './slider.js';

const effectsList = document.querySelector('.effects__list');
const radios = document.querySelectorAll('input[type="radio"][name="effect"]');
const radiosArray = Array.from(radios);

const applyUserEffect = (evt, element, radios) => {
  if (element.className.includes('effects__preview')) {
    const subStrStartIndex = element.className.indexOf('effects__preview');
    const newClassName = element.className.slice(0, subStrStartIndex).trim();
    element.className = newClassName;
  }
  let evtClassName = evt.target.className;
  if (evtClassName.includes('effects__label')) {
    evtClassName = emulateClassName(evt);
  }
  if (evtClassName.match(/.+none$/)) {
    radios.find((item) => item.id.match(/.+none$/)).checked = true;
  }
  if (evtClassName.match(/.+chrome$/)) {
    element.className += ' ' + 'effects__preview--chrome';
    radios.find((item) => item.id.match(/.+chrome$/)).checked = true;
  }
  if (evtClassName.match(/.+sepia$/)) {
    element.className += ' ' + 'effects__preview--sepia';
    radios.find((item) => item.id.match(/.+sepia$/)).checked = true;
  }
  if (evtClassName.match(/.+marvin$/)) {
    element.className += ' ' + 'effects__preview--marvin';
    radios.find((item) => item.id.match(/.+marvin$/)).checked = true;
  }
  if (evtClassName.match(/.+phobos$/)) {
    element.className += ' ' + 'effects__preview--phobos';
    radios.find((item) => item.id.match(/.+phobos$/)).checked = true;
  }
  if (evtClassName.match(/.+heat$/)) {
    element.className += ' ' + 'effects__preview--heat';
    radios.find((item) => item.id.match(/.+heat$/)).checked = true;
  }
  return undefined;
};

const onEffectsListClick = (evt) => {
  evt.preventDefault();
  applyUserEffect(evt, openedPicture, radiosArray);
  switchSlider(evt);
};

export {
  effectsList,
  onEffectsListClick
};
