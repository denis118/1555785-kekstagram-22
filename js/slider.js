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
const cssRules = document.styleSheets[document.styleSheets.length - 1].cssRules;

const createBuilder = () => {
  const buildSlider = (evtClassName) => {
    const sliderSet = {};
    if (evtClassName.match(/.+chrome$/)) {
      Object.assign(sliderSet, sliderTemplates.chrome);
    }
    if (evtClassName.match(/.+sepia$/)) {
      Object.assign(sliderSet, sliderTemplates.sepia);
    }
    if (evtClassName.match(/.+marvin$/)) {
      Object.assign(sliderSet, sliderTemplates.marvin);
    }
    if (evtClassName.match(/.+phobos$/)) {
      Object.assign(sliderSet, sliderTemplates.phobos);
    }
    if (evtClassName.match(/.+heat$/)) {
      Object.assign(sliderSet, sliderTemplates.heat);
    }
    console.log(Object.assign(sliderSet, extraOptions))
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

const switchSlider = (evtClassName, sliderElement) => {
  if (evtClassName.match(/.+none$/)) {
    if (!sliderElement.noUiSlider) {
      return undefined;
    } else {
      sliderElement.noUiSlider.destroy();
      return undefined;
    }
  }
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  noUiSlider.create(sliderElement, createBuilder()(evtClassName));
  return undefined;
};

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

export {
  slider,
  switchSlider
};




// document.styleSheets[document.styleSheets.length - 1].cssRules[65].style.filter = "grayscale(0)"
