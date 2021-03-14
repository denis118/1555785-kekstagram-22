'use strict';

class Effects {
  constructor (openedPicture, switchSlider, emulateClassName) {
    this.openedPicture = openedPicture;
    this.switchSlider = switchSlider;
    this.emulateClassName = emulateClassName;
    this.effectsList = document.querySelector('.effects__list');
    this.radios = document.querySelectorAll('input[type="radio"][name="effect"]');
    this.radiosArray = Array.from(this.radios);
    this.applyUserEffect = this.applyUserEffect.bind(this);
    this.onEffectsListClick = this.onEffectsListClick.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.eraseEventListeners = this.eraseEventListeners.bind(this);
  }

  applyUserEffect (evt, element, radios) {
    if (element.className.includes('effects__preview')) {
      const subStrStartIndex = element.className.indexOf('effects__preview');
      const newClassName = element.className.slice(0, subStrStartIndex).trim();
      element.className = newClassName;
    }
    let evtClassName = evt.target.className;
    if (evtClassName.includes('effects__label')) {
      evtClassName = this.emulateClassName(evt);
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
  }

  onEffectsListClick (evt) {
    evt.preventDefault();
    this.applyUserEffect(evt, this.openedPicture, this.radiosArray);
    this.switchSlider(evt);
  }

  setEventListeners () {
    this.effectsList.addEventListener('click', this.onEffectsListClick);
    return undefined;
  }

  eraseEventListeners () {
    this.effectsList.removeEventListener('click', this.onEffectsListClick);
    return undefined;
  }
}

export {
  Effects
};
