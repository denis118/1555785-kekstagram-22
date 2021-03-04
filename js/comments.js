import {
  MAX_COMMENT_LENGTH,
  markField,
  onTextFieldKeydown
} from './utility.js';

const commentsField = document.querySelector('textarea[name="description"]');
const changeOutlineStyle = markField(commentsField);

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
  commentsField.addEventListener('keydown', onTextFieldKeydown);
  return undefined;
};

const onCommentsBlur = (evt) => {
  evt.preventDefault();
  commentsField.removeEventListener('keydown', onTextFieldKeydown);
  return undefined;
};

export {
  commentsField,
  onCommentsFieldInput,
  onCommentsFocus,
  onCommentsBlur
};
