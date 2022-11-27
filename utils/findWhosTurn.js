export const findWhosTurn = (obj) => {
  let lettersObj = {
    nur: "A",
    mario: "B",
    george: "C",
    julio: "D",
    juan: "E",
    mori: "F",
  };
  for (let player in obj) {
    let line = obj[player];
    if (line[line.length - 1] == undefined) {
      return { player, cell: lettersObj[player] + (line.length + 7) };
    }
  }
  return {
    player: Object.keys(obj)[0],
    cell: lettersObj[Object.keys(obj)[0]] + (Object.values(obj)[0].length + 8),
  };
};
