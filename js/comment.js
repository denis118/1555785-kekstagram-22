import {
  util
} from './utility.js';

const MAX_COMMENT_LENGTH = 140;

class Comment {
  constructor () {
    this.commentField = document.querySelector('textarea[name="description"]');
    this.changeOutlineStyle = util.markField(this.commentField).bind(this);
    this.onCommentFieldInput = this.onCommentFieldInput.bind(this);
    this.onCommentFieldFocus = this.onCommentFieldFocus.bind(this);
    this.onCommentFieldBlur = this.onCommentFieldBlur.bind(this);
    this.clean = this.clean.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.eraseEventListeners = this.eraseEventListeners.bind(this);
  }

  onCommentFieldInput () {
    const valueLength = this.commentField.value.length;
    if (valueLength > MAX_COMMENT_LENGTH) {
      this.commentField.setCustomValidity('Длина комментария не может превышать 140 символов.');
      this.commentField.reportValidity();
      this.changeOutlineStyle('1px solid red');
    } else {
      this.commentField.setCustomValidity('');
      this.changeOutlineStyle('');
    }
    return undefined;
  }

  onCommentFieldFocus (evt) {
    evt.preventDefault();
    this.commentField.addEventListener('keydown', util.onTextFieldKeydown);
    return undefined;
  }

  onCommentFieldBlur (evt) {
    evt.preventDefault();
    this.commentField.removeEventListener('keydown', util.onTextFieldKeydown);
    return undefined;
  }

  clean () {
    this.commentField.value = '';
    return undefined;
  }

  setEventListeners () {
    this.commentField.addEventListener('input', this.onCommentFieldInput);
    this.commentField.addEventListener('focus', this.onCommentFieldFocus);
    this.commentField.addEventListener('blur', this.onCommentFieldBlur);
  }

  eraseEventListeners () {
    this.commentField.removeEventListener('input', this.onCommentFieldInput);
    this.commentField.removeEventListener('focus', this.onCommentFieldFocus);
    this.commentField.removeEventListener('blur', this.onCommentFieldBlur);
  }
}

const comment = new Comment();

export {
  comment
};
