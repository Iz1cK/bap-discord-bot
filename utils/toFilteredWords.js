export const toFilteredWords = (wordsArr) => {
  let namesArr = ["nur", "mario", "george", "julio", "juan", "mori"];
  let defaultData = namesArr.reduce((acc, name) => {
    acc[name] = [];
    return acc;
  }, {});
  let newData2 = wordsArr.reduce((acc, arr) => {
    namesArr.forEach((name, index) => {
      acc[name].push(arr[index]);
    });
    return acc;
  }, defaultData);
  return newData2;
};
