const removeAllSpecialCharacters = (text: string) => {
  return text.replace(/\W|_/g, '');
};

export default removeAllSpecialCharacters;
