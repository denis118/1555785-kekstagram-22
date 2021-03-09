/* global noUiSlider:readonly */

import {
  openedPicture
} from './image-editor.js';

const CHROME_MIN = 0;
const CHROME_MAX = 1;
const CHROME_STEP = 0.1;

const SEPIA_MIN = 0;
const SEPIA_MAX = 1;
const SEPIA_STEP = 0.1;

const MARVIN_MIN = 0;
const MARVIN_MAX = 100;
const MARVIN_STEP = 1;

const PHOBOS_MIN = 0;
const PHOBOS_MAX = 3;
const PHOBOS_STEP = 0.1;

const HEAT_MIN = 1;
const HEAT_MAX = 3;
const HEAT_STEP = 0.1;

const getSliderElement = () => document.querySelector('.effect-level__slider');
const getEffectLevelElement = () => document.querySelector('.effect-level__value');

const getChromeSet = () => ({range: {min: CHROME_MIN, max: CHROME_MAX}, start: CHROME_MAX, step: CHROME_STEP});
const getSepiaSet = () => ({range: {min: SEPIA_MIN, max: SEPIA_MAX}, start: SEPIA_MAX, step: SEPIA_STEP});
const getMarvinSet = () => ({range: {min: MARVIN_MIN, max: MARVIN_MAX}, start: MARVIN_MAX, step: MARVIN_STEP});
const getPhobosSet = () => ({range: {min: PHOBOS_MIN, max: PHOBOS_MAX}, start: PHOBOS_MAX, step: PHOBOS_STEP});
const getHeatSet = () => ({range: {min: HEAT_MIN, max: HEAT_MAX}, start: HEAT_MAX, step: HEAT_STEP});
const getAdds = () => ({
  connect: 'lower',
  format: {
    to: value => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: value => parseFloat(value),
  },
});

const buildChromeOptions = () => Object.assign({}, getChromeSet(), getAdds());
const buildSepiaOptions = () => Object.assign({}, getSepiaSet(), getAdds());
const buildMarvinOptions = () => Object.assign({}, getMarvinSet(), getAdds());
const buildPhobosOptions = () => Object.assign({}, getPhobosSet(), getAdds());
const buildHeatOptions = () => Object.assign({}, getHeatSet(), getAdds());

const setChromeStartValue = () => getEffectLevelElement().value = CHROME_MAX;
const setSepiaStartValue = () => getEffectLevelElement().value = SEPIA_MAX;
const setMarvinStartValue = () => getEffectLevelElement().value = MARVIN_MAX;
const setPhobosStartValue = () => getEffectLevelElement().value = PHOBOS_MAX;
const setHeatStartValue = () => getEffectLevelElement().value = HEAT_MAX;

const setChromeFilterValue = value => openedPicture.style.filter = `grayscale(${value})`;
const setSepiaFilterValue = value => openedPicture.style.filter = `sepia(${value})`;
const setMarvinFilterValue = value => openedPicture.style.filter = `invert(${value}%)`;
const setPhobosFilterValue = value => openedPicture.style.filter = `blur(${value}px)`;
const setHeatFilterValue = value => openedPicture.style.filter = `brightness(${value})`;

const setEffectCurrentValue = value => getEffectLevelElement().value = value;

const setChromeStep = (step = CHROME_STEP) => getEffectLevelElement().setAttribute('step', step);
const setSepiaStep = (step = SEPIA_STEP) => getEffectLevelElement().setAttribute('step', step);
const setMarvinStep = (step = MARVIN_STEP) => getEffectLevelElement().setAttribute('step', step);
const setPhobosStep = (step = PHOBOS_STEP) => getEffectLevelElement().setAttribute('step', step);
const setHeatStep = (step = HEAT_STEP) => getEffectLevelElement().setAttribute('step', step);

const emulateClassName = (evt) =>
  evt.target.getAttribute('for').match(/.+none$/) ? '--none' :
    evt.target.getAttribute('for').match(/.+chrome$/) ? '--chrome' :
      evt.target.getAttribute('for').match(/.+sepia$/) ? '--sepia' :
        evt.target.getAttribute('for').match(/.+marvin$/) ? '--marvin' :
          evt.target.getAttribute('for').match(/.+phobos$/) ? '--phobos' :
            evt.target.getAttribute('for').match(/.+heat$/) ? '--heat' :
              null;

const processNoneCase = () => {
  const sliderElement = getSliderElement();
  const effectLevelElement = getEffectLevelElement();
  if (!sliderElement.noUiSlider) {
    return undefined;
  } else {
    if (openedPicture.getAttribute('style')) {
      openedPicture.removeAttribute('style');
    }
    if (openedPicture.getAttribute('class')) {
      openedPicture.removeAttribute('class');
    }
    sliderElement.noUiSlider.off('update');
    sliderElement.noUiSlider.destroy();
    getEffectLevelElement().value = '';
  }
  if (effectLevelElement.getAttribute('step')) {
    effectLevelElement.removeAttribute('step');
  }
  return undefined;
};

const processStandartCase = () => getSliderElement().noUiSlider.destroy();

const createChromeSlider = () => noUiSlider.create(getSliderElement(), buildChromeOptions());
const createSepiaSlider = () => noUiSlider.create(getSliderElement(), buildSepiaOptions());
const creatMarvinSlider = () => noUiSlider.create(getSliderElement(), buildMarvinOptions());
const createPhobosSlider = () => noUiSlider.create(getSliderElement(), buildPhobosOptions());
const createHeatSlider = () => noUiSlider.create(getSliderElement(), buildHeatOptions());

const startChromeCase = () => [createChromeSlider, setChromeStartValue, setChromeStep].forEach(item => item());
const startSepiaCase = () => [createSepiaSlider, setSepiaStartValue, setSepiaStep].forEach(item => item());
const startMarvinCase = () => [creatMarvinSlider, setMarvinStartValue, setMarvinStep].forEach(item => item());
const startPhobosCase = () => [createPhobosSlider, setPhobosStartValue, setPhobosStep].forEach(item => item());
const startHeatCase = () => [createHeatSlider, setHeatStartValue, setHeatStep].forEach(item => item());

const runChromeChangingCase = value => [setChromeFilterValue, setEffectCurrentValue].forEach(item => item(value));
const runSepiaChangingCase = value => [setSepiaFilterValue, setEffectCurrentValue].forEach(item => item(value));
const runMarvinChangingCase = value => [setMarvinFilterValue, setEffectCurrentValue].forEach(item => item(value));
const runPhobosChangingCase = value => [setPhobosFilterValue, setEffectCurrentValue].forEach(item => item(value));
const runHeatChangingCase = value => [setHeatFilterValue, setEffectCurrentValue].forEach(item => item(value));

const switchSlider = (evt) => {
  let evtClassName = evt.target.className;
  if (evtClassName.includes('effects__list') || evtClassName.includes('effects__item')) {return undefined}
  if (evtClassName.includes('effects__label')) {evtClassName = emulateClassName(evt)}
  if (evtClassName === null) {throw new Error('Error in emulateClassName function')}
  if (evtClassName.match(/.+none$/)) {processNoneCase(); return undefined}
  if (getSliderElement().noUiSlider !== undefined) {processStandartCase()}
  if (evtClassName.match(/.+chrome$/)) {startChromeCase()}
  if (evtClassName.match(/.+sepia$/)) {startSepiaCase()}
  if (evtClassName.match(/.+marvin$/)) {startMarvinCase()}
  if (evtClassName.match(/.+phobos$/)) {startPhobosCase()}
  if (evtClassName.match(/.+heat$/)) {startHeatCase()}
  getSliderElement().noUiSlider.on('update', (values, handle) => {
    if (evtClassName.match(/.+chrome$/)) {runChromeChangingCase(values[handle])}
    if (evtClassName.match(/.+sepia$/)) {runSepiaChangingCase(values[handle])}
    if (evtClassName.match(/.+marvin$/)) {runMarvinChangingCase(values[handle])}
    if (evtClassName.match(/.+phobos$/)) {runPhobosChangingCase(values[handle])}
    if (evtClassName.match(/.+heat$/)) {runHeatChangingCase(values[handle])}
  });
  return undefined;
};

export {
  switchSlider,
  emulateClassName,
  processNoneCase
};
