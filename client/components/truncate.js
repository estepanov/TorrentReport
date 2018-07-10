const truncate = (input, n, useWordBoundary) => {
  if (input.length <= n) {
    return input;
  }
  const subString = input.substr(0, n - 1);
  return `${useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString} ...`;
};

export default truncate;
