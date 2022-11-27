export const toNonFilteredWords = (array) => {
  array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
  return array.reduce((acc, arr) => {
    arr.forEach((el) => {
      acc.push(el);
    });
    return acc;
  }, []);
};
