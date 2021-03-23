'use strict';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

class ImageReader {
  constructor (imageEditor) {
    this.uploadFile = imageEditor.uploadFile;
    this.imgUploadPreview = imageEditor.imgUploadPreview
      .querySelector('img[alt="Предварительный просмотр фотографии"]');
    this.reader = new FileReader();
    this.matchFileTypes = this.matchFileTypes.bind(this);
    this.readData = this.readData.bind(this);
    this.onReaderLoad = this.onReaderLoad.bind(this);
    this.exect = this.exect.bind(this);
    this.eraseEventListeners = this.eraseEventListeners.bind(this);
  }

  matchFileTypes () {
    this.file = this.uploadFile.files[0];
    const fileName = this.file.name.toLowerCase();
    this.matches = FILE_TYPES.some((item) => {
      return fileName.endsWith(item);
    });
    return this;
  }

  readData () {
    this.reader.readAsDataURL(this.file);
    return undefined;
  }

  onReaderLoad () {
    this.imgUploadPreview.src = this.reader.result;
    return undefined;
  }

  exect () {
    this.matchFileTypes();
    if (this.matches) {
      this.reader.addEventListener('load', this.onReaderLoad);
      this.readData();
    }
    return undefined;
  }

  eraseEventListeners () {
    this.reader.removeEventListener('load', this.onReaderLoad);
    return undefined;
  }
}

export {
  ImageReader
};
