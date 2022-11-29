export const toFilteredWords = (wordsArr) => {
  let namesArr = ["nur", "mario", "george", "julio", "juan", "mori", "rooj"];
  let defaultData = namesArr.reduce((acc, name) => {
    acc[name] = [];
    return acc;
  }, {});
  let newData2 = wordsArr.reduce((acc, arr) => {
    namesArr.forEach((name, index) => {
      let word = arr[index];
      if (arr[index]) word = arr[index].toLowerCase();
      acc[name].push(word);
    });
    return acc;
  }, defaultData);
  return newData2;
};
