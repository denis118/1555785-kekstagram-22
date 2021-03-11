const STEP = 0.25;
const MIN_SCALE_COEFFICIENT = 0.25;
const MAX_SCALE_COEFFICIENT = 1;
const DEFAULT_SCALE_COEFFICIENT = 1;

class Scale {
  constructor (openedPicture) {
    this.openedPicture = openedPicture;
    this.scaleControlSmaller = document.querySelector('.scale__control--smaller');
    this.scaleControlBigger = document.querySelector('.scale__control--bigger');
    this.scaleControlValue = document.querySelector('.scale__control--value');
    this.userScale = document.querySelector('input[name="user-scale"]');
    this.getPercentages = this.getPercentages.bind(this);
    this.getCoefficient = this.getCoefficient.bind(this);
    this.insertScaleValue = this.insertScaleValue.bind(this);
    this.setUserScale = this.setUserScale.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.onScaleControlSmallerClick = this.onScaleControlSmallerClick.bind(this);
    this.onScaleControlBiggerClick = this.onScaleControlBiggerClick.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.eraseEventListeners = this.eraseEventListeners.bind(this);
  }

  getPercentages (coefficient = DEFAULT_SCALE_COEFFICIENT) {
    return coefficient * 100;
  }

  getCoefficient (percentages) {
    return percentages / 100;
  }

  insertScaleValue (elem = this.openedPicture, value = `scale(${DEFAULT_SCALE_COEFFICIENT})`) {
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
  }

  setUserScale (delta = DEFAULT_SCALE_COEFFICIENT) {
    this.scaleControlValue.value = this.getPercentages(delta) + '%';
    this.userScale.value = this.scaleControlValue.value;
    this.insertScaleValue(this.openedPicture, `scale(${delta})`)
    return undefined;
  }

  zoomOut () {
    let lowerScaleСoefficient = this.getCoefficient(Number(parseInt(this.scaleControlValue.value))) - STEP;
    if (lowerScaleСoefficient < MIN_SCALE_COEFFICIENT) {
      lowerScaleСoefficient = MIN_SCALE_COEFFICIENT;
    }
    this.setUserScale(lowerScaleСoefficient);
    return undefined;
  }

  zoomIn () {
    let biggerScaleСoefficient = this.getCoefficient(Number(parseInt(this.scaleControlValue.value))) + STEP;
    if (biggerScaleСoefficient > MAX_SCALE_COEFFICIENT) {
      biggerScaleСoefficient = MAX_SCALE_COEFFICIENT;
    }
    this.setUserScale(biggerScaleСoefficient);
    return undefined;
  }

  onScaleControlSmallerClick (evt) {
    evt.preventDefault();
    this.zoomOut();
    return undefined;
  }

  onScaleControlBiggerClick (evt) {
    evt.preventDefault();
    this.zoomIn();
    return undefined;
  }

  setEventListeners () {
    this.scaleControlSmaller.addEventListener('click', this.onScaleControlSmallerClick);
    this.scaleControlBigger.addEventListener('click', this.onScaleControlBiggerClick);
    return undefined;
  }

  eraseEventListeners () {
    this.scaleControlSmaller.removeEventListener('click', this.onScaleControlSmallerClick);
    this.scaleControlBigger.removeEventListener('click', this.onScaleControlBiggerClick);
    return undefined;
  }
}

export {
  Scale
};
