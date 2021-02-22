import {
  openedPicture
} from './scale.js';

import {
  slider,
  switchSlider
} from './slider.js';

const effectsList = document.querySelector('.effects__list');
const noneEffectRadio = document.querySelector('input[id="effect-none"]');
const chromeEffectRadio = document.querySelector('input[id="effect-chrome"]');
const sepiaEffectRadio = document.querySelector('input[id="effect-sepia"]');
const marvinEffectRadio = document.querySelector('input[id="effect-marvin"]');
const phobosEffectRadio = document.querySelector('input[id="effect-phobos"]');
const heatEffectRadio = document.querySelector('input[id="effect-heat"]');

const applyUserEffect = (evtClassName, element, ...rest) => {
  if (element.className.includes('effects__preview')) {
    const subStrStartIndex = element.className.indexOf('effects__preview');
    const newClassName = element.className.slice(0, subStrStartIndex).trim();
    element.className = newClassName;
  }
  if (evtClassName.match(/.+none$/)) {
    rest[0].checked = true;
  }
  if (evtClassName.match(/.+chrome$/)) {
    element.className += ' ' + 'effects__preview--chrome';
    rest[1].checked = true;
  }
  if (evtClassName.match(/.+sepia$/)) {
    element.className += ' ' + 'effects__preview--sepia';
    rest[2].checked = true;
  }
  if (evtClassName.match(/.+marvin$/)) {
    element.className += ' ' + 'effects__preview--marvin';
    rest[3].checked = true;
  }
  if (evtClassName.match(/.+phobos$/)) {
    element.className += ' ' + 'effects__preview--phobos';
    rest[4].checked = true;
  }
  if (evtClassName.match(/.+heat$/)) {
    element.className += ' ' + 'effects__preview--heat';
    rest[5].checked = true;
  }
  return undefined;
};

const onEffectsListClick = (evt) => {
  evt.preventDefault();
  applyUserEffect(
    evt.target.className,
    openedPicture,
    noneEffectRadio,
    chromeEffectRadio,
    sepiaEffectRadio,
    marvinEffectRadio,
    phobosEffectRadio,
    heatEffectRadio,
  );
  switchSlider(
    evt.target.className,
    slider,
  );
};

export {
  effectsList,
  onEffectsListClick
};
