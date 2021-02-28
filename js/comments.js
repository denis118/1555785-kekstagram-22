import {
  MAX_COMMENT_LENGTH,
  markField
} from './utility.js';

const commentField = document.querySelector('textarea[name="description"]');
const changeOutlineStyle = markField(commentField);

/*
У меня на компьютере (Ubuntu) этот код не срабатывает пока у textarea указан атрибут maxlength.
Ни Chrome, ни FireFox просто не дают ввести больше символов.
*/

const onCommentFieldInput = () => {
  const valueLength = commentField.value.length;

  if (valueLength > MAX_COMMENT_LENGTH) {
    commentField.setCustomValidity('Длина комментария не может составлять больше 140 символов.');
    commentField.reportValidity();
    changeOutlineStyle('1px solid red');
  } else {
    commentField.setCustomValidity('');
    changeOutlineStyle('');
  }
  return undefined;
};

export {
  commentField,
  onCommentFieldInput
};
