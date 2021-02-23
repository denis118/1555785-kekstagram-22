const STEP = 0.25;
const MIN_SCALE_COEFFICIENT = 0.25;
const MAX_SCALE_COEFFICIENT = 1;
const DEFAULT_SCALE_COEFFICIENT = 1;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const userScale = document.querySelector('input[name="user-scale"]');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const openedPicture = imgUploadPreview.querySelector('img[alt="Предварительный просмотр фотографии"]');

const getPercentages = (coefficient = DEFAULT_SCALE_COEFFICIENT) => {
  return coefficient * 100;
};

const getCoefficient = (percentages) => {
  return percentages / 100;
};

const insertScaleValue = (elem = openedPicture, value = `scale(${DEFAULT_SCALE_COEFFICIENT})`) => {
  if (!elem.style.transform) {
    elem.style.transform = value;
  } else {
    if (!elem.style.transform.includes('scale')) {
      elem.style.transform += value;
    } else {
      const transformFunctions = elem.style.transform.split(/\s*scale\(\S*\)\s*/);
      const newTransformValue = transformFunctions[0] + value + transformFunctions[transformFunctions.length - 1];
      elem.style.transform = newTransformValue;
    }
  }
  return undefined;
};

const setUserScale = (delta = DEFAULT_SCALE_COEFFICIENT) => {
  scaleControlValue.value = getPercentages(delta) + '%';
  userScale.value = scaleControlValue.value;
  insertScaleValue(openedPicture, `scale(${delta})`)
  return undefined;
};

const zoomOut = () => {
  let lowerScaleСoefficient = getCoefficient(Number(parseInt(scaleControlValue.value))) - STEP;
  if (lowerScaleСoefficient < MIN_SCALE_COEFFICIENT) {
    lowerScaleСoefficient = MIN_SCALE_COEFFICIENT;
  }
  setUserScale(lowerScaleСoefficient);
  return undefined;
};

const onScaleControlSmallerClick = (evt) => {
  evt.preventDefault();
  zoomOut();
  return undefined;
};

const zoomIn = () => {
  let biggerScaleСoefficient = getCoefficient(Number(parseInt(scaleControlValue.value))) + STEP;
  if (biggerScaleСoefficient > MAX_SCALE_COEFFICIENT) {
    biggerScaleСoefficient = MAX_SCALE_COEFFICIENT;
  }
  setUserScale(biggerScaleСoefficient);
  return undefined;
};

const onScaleControlBiggerClick = (evt) => {
  evt.preventDefault();
  zoomIn();
  return undefined;
};

export {
  openedPicture,
  scaleControlSmaller,
  scaleControlBigger,
  setUserScale,
  onScaleControlSmallerClick,
  onScaleControlBiggerClick
};
