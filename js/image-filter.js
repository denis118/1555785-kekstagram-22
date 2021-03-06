import {
  getNumber,
  throttle
} from './utility.js';

import {
  renderPictures
} from './thumbnails.js';

import {
  viewImages
} from './image-viewer.js';

const RANDOM_IMG_AMOUNT = 10;
const RENDERING_DELAY = 500;

class FilterImages {
  constructor () {
    this.imgFiltersNode = document.querySelector('.img-filters');
    this.defaultFilter = this.imgFiltersNode.querySelector('#filter-default');
    this.randomFilter = this.imgFiltersNode.querySelector('#filter-random');
    this.discussedFilter = this.imgFiltersNode.querySelector('#filter-discussed');
    this.showFilters = this.showFilters.bind(this);
    this.getUniqueIndexes = this.getUniqueIndexes.bind(this);
    this.getRandomImages = this.getRandomImages.bind(this);
    this.renderImages = throttle(renderPictures, RENDERING_DELAY).bind(this);
  }

  showFilters () {
    this.imgFiltersNode.classList.remove('img-filters--inactive');
    return this;
  }

  getUniqueIndexes () {
    const iSet = new Set();
    while(iSet.size < RANDOM_IMG_AMOUNT) {
      const index = getNumber(0, this.stock.length - 1);
      iSet.add(index);
    }
    this.indexes = Array.from(iSet);
    return this;
  }

  getRandomImages () {
    this.randomImages = [];
    for (let i = 0; i < this.indexes.length; i++) {
      this.randomImages.push(
        Object.create(
          Object.getPrototypeOf(this.stock[this.indexes[i]]),
          Object.getOwnPropertyDescriptors(this.stock[this.indexes[i]]),
        ),
      );
    }
    return this;
  }

  sortByDiscussion () {
    this.sortingByDiscussed = [...this.stock]
      .sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);
    return this;
  }
}

const filterImages = new FilterImages();

export {
  filterImages
};
