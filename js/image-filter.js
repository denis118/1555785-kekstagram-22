'use strict';

import {
  Utility
} from './utility.js';

import {
  imageProvider
} from './image-provider.js';

const RANDOM_IMG_AMOUNT = 10;

const RegEx = {
  DEFAULT: /^filter-default$/,
  RANDOM: /^filter-random$/,
  DISCUSSED: /^filter-discussed$/,
};

class ImageFilter {
  constructor () {
    this.imgFiltersNode = document.querySelector('.img-filters');
    this.imgFiltersForm = this.imgFiltersNode.querySelector('.img-filters__form');
    this.showFilters = this.showFilters.bind(this);
    this.storeAllFilters = this.storeAllFilters.bind(this);
    this.storeEachFilter = this.storeEachFilter.bind(this);
    this.storeActiveFilter = this.storeActiveFilter.bind(this);
    this.storeActivatingClass = this.storeActivatingClass.bind(this);
    this.getUniqueIndexes = this.getUniqueIndexes.bind(this);
    this.sortByRandom = this.sortByRandom.bind(this);
    this.sortByDiscussion = this.sortByDiscussion.bind(this);
    this.storeAllData = this.storeAllData.bind(this);
    this.onImgFiltersFormClick = this.onImgFiltersFormClick.bind(this);
  }

  showFilters () {
    this.imgFiltersNode.classList.remove('img-filters--inactive');
    return this;
  }

  storeAllFilters () {
    this.filters = Array.from(
      this.imgFiltersNode.querySelectorAll('button[id^="filter"]'),
    );
    return this;
  }

  storeEachFilter () {
    if (Object.keys(RegEx).length !== this.filters.length) {
      Utility.showMessage()(new Error('Inspect "RegEx" object and ImageFilter.filters'));
    }
    const regEntries = Object.entries(RegEx);
    regEntries.forEach((_, i) => {
      const key = regEntries[i][0].toLowerCase() + 'Filter';
      this[key] = this.filters.find(item => item.id.match(regEntries[i][1]));
    });
    return this;
  }

  storeActiveFilter () {
    this.activeFilter = this.filters.find(item => item.className.includes('active'));
    return this;
  }

  storeActivatingClass () {
    this.activatingClass = this.activeFilter.className
      .split(' ')
      .find(item => item.includes('active'));
    return this;
  }

  getUniqueIndexes () {
    const iSet = new Set();
    while (iSet.size < RANDOM_IMG_AMOUNT) {
      const index = Utility.getNumber(0, this.stock.length - 1);
      iSet.add(index);
    }
    this.indexes = Array.from(iSet);
    return this;
  }

  sortByRandom () {
    this.getUniqueIndexes();
    this.randomImages = [];
    this.indexes.forEach((_, i) => {
      this.randomImages.push(
        Object.create(
          Object.getPrototypeOf(this.stock[this.indexes[i]]),
          Object.getOwnPropertyDescriptors(this.stock[this.indexes[i]]),
        ),
      );
    });
    return this;
  }

  sortByDiscussion () {
    this.discussedImages = [...this.stock]
      .sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);
    return this;
  }

  storeAllData (data) {
    this.stock = data;
    this.storeAllFilters()
      .storeEachFilter()
      .storeActiveFilter()
      .storeActivatingClass()
      .sortByRandom()
      .sortByDiscussion()
    return this;
  }

  onImgFiltersFormClick (evt) {
    evt.preventDefault();
    if (evt.target.className.includes('img-filters__button')) {
      this.activeFilter.classList.remove(this.activatingClass);
      evt.target.classList.add(this.activatingClass);
      this.activeFilter = evt.target;
      if (evt.target.id.match(RegEx.DEFAULT)) {
        imageProvider.render(this.stock);
      } else if (evt.target.id.match(RegEx.RANDOM)) {
        this.sortByRandom();
        imageProvider.render(this.randomImages);
      } else if (evt.target.id.match(RegEx.DISCUSSED)) {
        imageProvider.render(this.discussedImages);
      } else {
        throw new Error('evt.target.id mismatch');
      }
    }
    return undefined;
  }

  setEventListeners () {
    this.imgFiltersForm.addEventListener('click', this.onImgFiltersFormClick);
    return undefined;
  }
}

const imageFilter = new ImageFilter();

export {
  imageFilter
};
