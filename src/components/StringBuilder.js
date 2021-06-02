const StringBuilder = str => {
  var newStr = str.trim().replace(/(\r\n|\n|\r)/gm, "");
  return newStr;
};

export default StringBuilder;
