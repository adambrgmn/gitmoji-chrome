export const copy = str => {
  const textarea = document.createElement('textarea');
  textarea.value = str;
  document.body.append(textarea);
  textarea.select();

  const success = document.execCommand('Copy');
  document.body.removeChild(textarea);

  return success;
};