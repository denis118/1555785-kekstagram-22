/* global noUiSlider:readonly */
'use strict';

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

class Slider {
  constructor (openedPicture) {
    this.openedPicture = openedPicture;
    this.sliderElement = document.querySelector('.effect-level__slider');
    this.effectLevelElement = document.querySelector('.effect-level__value');
    this.setEffectsSettings = this.setEffectsSettings.bind(this);
    this.buildEffectsOptions = this.buildEffectsOptions.bind(this);
    this.startChromeCase = this.startChromeCase.bind(this);
    this.startSepiaCase = this.startSepiaCase.bind(this);
    this.startMarvinCase = this.startMarvinCase.bind(this);
    this.startPhobosCase = this.startPhobosCase.bind(this);
    this.startHeatCase = this.startHeatCase.bind(this);
    this.processNoneCase = this.processNoneCase.bind(this);
    this.processStandartCase = this.processStandartCase.bind(this);
    this.runEffectChangingCase = this.runEffectChangingCase.bind(this);
    this.switch = this.switch.bind(this);
  }

  setEffectsSettings () {
    this.chromeSet = {range: {min: CHROME_MIN, max: CHROME_MAX}, start: CHROME_MAX, step: CHROME_STEP};
    this.sepiaSet = {range: {min: SEPIA_MIN, max: SEPIA_MAX}, start: SEPIA_MAX, step: SEPIA_STEP};
    this.marvinSet = {range: {min: MARVIN_MIN, max: MARVIN_MAX}, start: MARVIN_MAX, step: MARVIN_STEP};
    this.phobosSet = {range: {min: PHOBOS_MIN, max: PHOBOS_MAX}, start: PHOBOS_MAX, step: PHOBOS_STEP};
    this.heatSet = {range: {min: HEAT_MIN, max: HEAT_MAX}, start: HEAT_MAX, step: HEAT_STEP};
    this.adds = {
      connect: 'lower',
      format: {
        to: value => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
        from: value => parseFloat(value),
      },
    };
    return this;
  }

  buildEffectsOptions () {
    this.setEffectsSettings();
    this.chromeBuild = Object.assign({}, this.chromeSet, this.adds);
    this.sepiaBuild = Object.assign({}, this.sepiaSet, this.adds);
    this.marvinBuild = Object.assign({}, this.marvinSet, this.adds);
    this.phobosBuild = Object.assign({}, this.phobosSet, this.adds);
    this.heatBuild = Object.assign({}, this.heatSet, this.adds);
    return this;
  }

  startChromeCase () {
    noUiSlider.create(this.sliderElement, this.chromeBuild);
    this.effectLevelElement.value = CHROME_MAX;
    this.effectLevelElement.setAttribute('step', CHROME_STEP);
    return this;
  }

  startSepiaCase () {
    noUiSlider.create(this.sliderElement, this.sepiaBuild);
    this.effectLevelElement.value = SEPIA_MAX;
    this.effectLevelElement.setAttribute('step', SEPIA_STEP);
    return this;
  }

  startMarvinCase () {
    noUiSlider.create(this.sliderElement, this.marvinBuild);
    this.effectLevelElement.value = MARVIN_MAX;
    this.effectLevelElement.setAttribute('step', MARVIN_STEP);
    return this;
  }

  startPhobosCase () {
    noUiSlider.create(this.sliderElement, this.phobosBuild);
    this.effectLevelElement.value = PHOBOS_MAX;
    this.effectLevelElement.setAttribute('step', PHOBOS_STEP);
    return this;
  }

  startHeatCase () {
    noUiSlider.create(this.sliderElement, this.heatBuild);
    this.effectLevelElement.value = HEAT_MAX;
    this.effectLevelElement.setAttribute('step', HEAT_STEP);
    return this;
  }

  processNoneCase () {
    if (!this.sliderElement.noUiSlider) {
      return this;
    } else {
      if (this.openedPicture.style.filter) {
        this.openedPicture.style.filter = '';
      }
      if (this.openedPicture.getAttribute('class')) {
        this.openedPicture.removeAttribute('class');
      }
      this.sliderElement.noUiSlider.off('update');
      this.sliderElement.noUiSlider.destroy();
      this.effectLevelElement.value = '';
    }
    if (this.effectLevelElement.getAttribute('step')) {
      this.effectLevelElement.removeAttribute('step');
    }
    return this;
  }

  processStandartCase () {
    this.sliderElement.noUiSlider.destroy();
    return this;
  }

  runEffectChangingCase (evt, value) {
    const filterValue = evt.target.className.match(/.+chrome$/) ? `grayscale(${value})` :
      evt.target.className.match(/.+sepia$/) ? `sepia(${value})` :
        evt.target.className.match(/.+marvin$/) ? `invert(${value}%)` :
          evt.target.className.match(/.+phobos$/) ? `blur(${value}px)` :
            evt.target.className.match(/.+heat$/) ? `brightness(${value})` :
              null;
    if (filterValue === null) {
      throw new Error('filter value is null');
    }
    this.openedPicture.style.filter = filterValue;
    this.effectLevelElement.value = value;
    return this;
  }

  static emulateClassName (evt) {
    return evt.target.getAttribute('for').match(/.+none$/) ? '--none' :
      evt.target.getAttribute('for').match(/.+chrome$/) ? '--chrome' :
        evt.target.getAttribute('for').match(/.+sepia$/) ? '--sepia' :
          evt.target.getAttribute('for').match(/.+marvin$/) ? '--marvin' :
            evt.target.getAttribute('for').match(/.+phobos$/) ? '--phobos' :
              evt.target.getAttribute('for').match(/.+heat$/) ? '--heat' :
                null;
  }

  switch (evt) {
    let evtClassName = evt.target.className;
    if (evtClassName.includes('effects__list') || evtClassName.includes('effects__item')) {return this}
    if (evtClassName.includes('effects__label')) {evtClassName = Slider.emulateClassName(evt)}
    if (evtClassName === null) {throw new Error('Error in Slider.emulateClassName method')}
    if (evtClassName.match(/.+none$/)) {this.processNoneCase(); return this}
    if (this.sliderElement.noUiSlider !== undefined) {this.processStandartCase()}
    if (evtClassName.match(/.+chrome$/)) {this.startChromeCase()}
    if (evtClassName.match(/.+sepia$/)) {this.startSepiaCase()}
    if (evtClassName.match(/.+marvin$/)) {this.startMarvinCase()}
    if (evtClassName.match(/.+phobos$/)) {this.startPhobosCase()}
    if (evtClassName.match(/.+heat$/)) {this.startHeatCase()}
    this.sliderElement.noUiSlider.on('update', (values, handle) => {
      this.runEffectChangingCase(evt, values[handle]);
    });
    return this;
  }
}

export {
  Slider
};
