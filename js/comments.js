import {
  // markField,
  // onTextFieldKeydown
  util
} from './utility.js';

const MAX_COMMENT_LENGTH = 140;

const commentsField = document.querySelector('textarea[name="description"]');
const changeOutlineStyle = util.markField(commentsField);

const onCommentsFieldInput = () => {
  const valueLength = commentsField.value.length;

  if (valueLength > MAX_COMMENT_LENGTH) {
    commentsField.setCustomValidity('Длина комментария не может составлять больше 140 символов.');
    commentsField.reportValidity();
    changeOutlineStyle('1px solid red');
  } else {
    commentsField.setCustomValidity('');
    changeOutlineStyle('');
  }
  return undefined;
};

const onCommentsFocus = (evt) => {
  evt.preventDefault();
  commentsField.addEventListener('keydown', util.onTextFieldKeydown);
  return undefined;
};

const onCommentsBlur = (evt) => {
  evt.preventDefault();
  commentsField.removeEventListener('keydown', util.onTextFieldKeydown);
  return undefined;
};

const clearCommentsField = () => commentsField.value = '';

export {
  commentsField,
  onCommentsFieldInput,
  onCommentsFocus,
  onCommentsBlur,
  clearCommentsField
};
