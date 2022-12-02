export const findWhosTurn = (obj) => {
  let lettersObj = {
    nur: "A",
    mario: "B",
    george: "C",
    julio: "D",
    juan: "E",
    mori: "F",
    rooj: "G",
  };
  for (let player in obj) {
    let line = obj[player];
    if (line[line.length - 1] == undefined || line[line.length - 1] == "") {
      return {
        player,
        cell: lettersObj[player] + (line.length + 7),
        cellIndeces: {
          row: line.length + 6,
          column: lettersObj[player].charCodeAt() - 65,
        },
      };
    }
  }
  return {
    player: Object.keys(obj)[0],
    cell: lettersObj[Object.keys(obj)[0]] + (Object.values(obj)[0].length + 7),
    cellIndeces: {
      row: Object.values(obj)[0].length + 7,
      column: 0,
    },
  };
};
