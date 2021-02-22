/* global noUiSlider:readonly */

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

const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const cssRules = document.styleSheets[document.styleSheets.length - 1].cssRules;

const getEffectsRules = (rules) => {
  const effectsRules = [];
  for (let i in rules) {
    let selector = rules[i].selectorText;
    if (selector !== undefined) {
      if (selector.match(/\.effects__preview--\S+/)) {
        effectsRules.push(rules[i]);
      }
    }
  }
  return effectsRules;
};

const createBuilder = () => {
  const buildSlider = (evtClassName) => {
    const sliderSet = {};
    if (evtClassName.match(/.+chrome$/)) {
      Object.assign(sliderSet, sliderTemplates.chrome);
      effectLevelValue.value = CHROME_MAX;
    }
    if (evtClassName.match(/.+sepia$/)) {
      Object.assign(sliderSet, sliderTemplates.sepia);
      effectLevelValue.value = SEPIA_MAX;
    }
    if (evtClassName.match(/.+marvin$/)) {
      Object.assign(sliderSet, sliderTemplates.marvin);
      effectLevelValue.value = MARVIN_MAX + '%';
    }
    if (evtClassName.match(/.+phobos$/)) {
      Object.assign(sliderSet, sliderTemplates.phobos);
      effectLevelValue.value = PHOBOS_MAX + 'px';
    }
    if (evtClassName.match(/.+heat$/)) {
      Object.assign(sliderSet, sliderTemplates.heat);
      effectLevelValue.value = HEAT_MAX;
    }
    return Object.assign(sliderSet, extraOptions);
  };
  const sliderTemplates = {
    chrome: {
      range: {
        min: CHROME_MIN,
        max: CHROME_MAX,
      },
      start: CHROME_MAX,
      step: CHROME_STEP,
    },
    sepia: {
      range: {
        min: SEPIA_MIN,
        max: SEPIA_MAX,
      },
      start: SEPIA_MAX,
      step: SEPIA_STEP,
    },
    marvin: {
      range: {
        min: MARVIN_MIN,
        max: MARVIN_MAX,
      },
      start: MARVIN_MAX,
      step: MARVIN_STEP,
    },
    phobos: {
      range: {
        min: PHOBOS_MIN,
        max: PHOBOS_MAX,
      },
      start: PHOBOS_MAX,
      step: PHOBOS_STEP,
    },
    heat: {
      range: {
        min: HEAT_MIN,
        max: HEAT_MAX,
      },
      start: HEAT_MAX,
      step: HEAT_STEP,
    },
  };
  const extraOptions = {
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  };
  return buildSlider;
};

const checkLabel = (evt) => {
  let evtClassName = evt.target.className;
  if (evtClassName.includes('effects__label')) {
    const labelFor = evt.target.getAttribute('for');
    if (labelFor.match(/.+none$/)) {
      evtClassName = '--none';
    }
    if (labelFor.match(/.+chrome$/)) {
      evtClassName = '--chrome';
    }
    if (labelFor.match(/.+sepia$/)) {
      evtClassName = '--sepia';
    }
    if (labelFor.match(/.+marvin$/)) {
      evtClassName = '--marvin';
    }
    if (labelFor.match(/.+phobos$/)) {
      evtClassName = '--phobos';
    }
    if (labelFor.match(/.+heat$/)) {
      evtClassName = '--heat';
    }
  }
  return evtClassName;
};

const switchSlider = (evt, sliderElement) => {
  let evtClassName = evt.target.className;
  if (evtClassName.includes('effects__list') || evtClassName.includes('effects__item')) {
    return undefined;
  }
  if (evtClassName.includes('effects__label')) {
    evtClassName = checkLabel(evt);
  }
  if (evtClassName.match(/.+none$/)) {
    if (!sliderElement.noUiSlider) {
      return undefined;
    } else {
      sliderElement.noUiSlider.off('update');
      sliderElement.noUiSlider.destroy();
      effectLevelValue.value = '';
      return undefined;
    }
  }
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  noUiSlider.create(sliderElement, createBuilder()(evtClassName));
  sliderElement.noUiSlider.on('update', (values, handle) => {
    if (evtClassName.match(/.+chrome$/)) {
      const chromeCssRule = getEffectsRules(cssRules).filter((item) => item.selectorText.match(/.+chrome$/))[0];
      chromeCssRule.style.filter = `grayscale(${values[handle]})`;
      effectLevelValue.value = values[handle];
    }
    if (evtClassName.match(/.+sepia$/)) {
      const sepiaCssRule = getEffectsRules(cssRules).filter((item) => item.selectorText.match(/.+sepia$/))[0];
      sepiaCssRule.style.filter = `sepia(${values[handle]})`;
      effectLevelValue.value = values[handle];
    }
    if (evtClassName.match(/.+marvin$/)) {
      const marvinCssRule = getEffectsRules(cssRules).filter((item) => item.selectorText.match(/.+marvin$/))[0];
      marvinCssRule.style.filter = `invert(${values[handle]}%)`;
      effectLevelValue.value = values[handle];
    }
    if (evtClassName.match(/.+phobos$/)) {
      const phobosCssRule = getEffectsRules(cssRules).filter((item) => item.selectorText.match(/.+phobos$/))[0];
      phobosCssRule.style.filter = `blur(${values[handle]}px)`;
      effectLevelValue.value = values[handle];
    }
    if (evtClassName.match(/.+heat$/)) {
      const heatCssRule = getEffectsRules(cssRules).filter((item) => item.selectorText.match(/.+heat$/))[0];
      heatCssRule.style.filter = `brightness(${values[handle]})`;
      effectLevelValue.value = values[handle];
    }
  });
  return undefined;
};

export {
  slider,
  switchSlider,
  checkLabel
};
