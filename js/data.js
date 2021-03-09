import {
  util
} from './utility.js';

import {
  imageProvider
} from './image-provider.js';

import {
  imageViewer
} from './image-viewer.js';

import {
  imageFilter
} from './image-filter.js';

const URL_FOR_RECEIVING = 'https://22.javascript.pages.academy/kekstagram/data';
// const URL_FOR_SENDING = 'https://22.javascript.pages.academy/kekstagram';

class Data {
  constructor () {
    this.onLoadingError = util.showMessage().bind(this);
    this.receive = this.receive.bind(this);
    // this.send = this.send.bind(this);
  }

  receive () {
    fetch(URL_FOR_RECEIVING)
      .then(response => !response.ok ?
        new Error(`${response.status} ${response.statusText}`) :
        response.json())
      .then(json => {
        imageProvider.render(json);
        imageProvider.setEventListeners();
        imageViewer.photoDescriptions = json;
        imageFilter.showFilters().storeAllData(json).setEventListeners();
        return undefined;
      })
      .catch(error => this.onLoadingError(error, {
        title: `${error.name}: ${error.message}`,
        button: 'Ok',
      }));
    return undefined;
  }

  // send (evt, formData) {
  //   fetch(
  //     URL_FOR_SENDING,
  //     {
  //       method: 'POST',
  //       body: formData,
  //     },
  //   )
  //     .then(response => {
  //       if (!response.ok) {throw new Error()}
  //       closeImageEditor(evt);
  //       onSuccess();
  //       return undefined;
  //     })
  //     .catch(error => {
  //       closeImageEditor(evt);
  //       onError(error);
  //     });
  //   return undefined;
  // }
}

const data = new Data();

export {
  data
};
