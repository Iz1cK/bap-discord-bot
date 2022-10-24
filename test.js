const test = [
  ["Coffee", "Electric", "Coaster", "Roundabout", "True_", "Erupt"],
  ["Territory", "Year", "Ramanujan", "Narco", "Operator", "Rope"],
  [
    "Eradicate",
    "Eat",
    "Trash",
    "Holocaust",
    "Temporomandibular",
    "Retardation",
  ],
  ["Nori", "iPhone", "Emanuel", "Lactating", "Geyser", "Romeo"],
  ["Oreo", "Oral", "Lament", "Test", "Tent", "Terracotta"],
  ["Apple", "Ear", "Rapper", "Rapist", "Trap", "Pillow"],
  ["Wombat", "Trait", "Tusk", "Kunai", "Ivy", "Yeast"],
  ["Thyme", "Easter", "Report", "Repercussion", "Nationalism", "Menstruating"],
  ["Grape", "Europe", "Engagement", "Tectonic", "Collapse", "Emancipation"],
  ["Narcolepsy", "Yodle", "Emerge", "Elaborate", "Etoile", "Electrifying"],
  ["Gallant", "Tree", "Elasticity", "Yearly", "Yummy", "Yellow"],
  ["Worcestershire", "Early", "Yell", "Louder", "Rounder", "Remorse"],
  ["Effable", "Enter", "Reflexive", "Evaporate", "Estate", "Estimation"],
  ["Nation", "Narcos", "Semantics ", "Sniper", "Racist", "Tyrant"],
  ["Throwback ", "Kill", "Larva", "Appetizer", "Reality", "Jailed"],
  ["Loom", "Mool", "Love", "Endlessly", "Yandere", "Erotic"],
  ["Chaperone", "Ebola", "Aborting", "Giraffe", "Euphoria", "Aromatic"],
  ["Chiropractor", "Router", "Reverser", "Rockster", "Railed", "Derailed"],
  ["Deuteronomy", "Yahweh", "Huawei", "Hideous", "Sour", "Revolutionary"],
  ["Yearns", "Sorry", "Yeehaw", "Jailed", "Titan", "Nagger"],
  ["Rat", "Tar", "Revive", "Electricity", "Yacht", "Jailed"],
  ["Tart", "Target", "Turf", "Fruity", "", ""],
];
let newData = [];
test.forEach((sub) => {
  newData.push(...sub);
});
let namesArr = ["nur", "mario", "george", "julio", "juan", "mori"];
let defaultData = namesArr.reduce((acc, name) => {
  acc[name] = [];
  return acc;
}, {});
let newData2 = test.reduce((acc, arr) => {
  namesArr.forEach((name, index) => {
    acc[name].push(arr[index]);
  });
  return acc;
}, defaultData);

// test.forEach((arr) => {
//   arr.forEach((el, ind) => {
//     newData2[
//       ind == 0
//         ? "nur"
//         : ind == 1
//         ? "mario"
//         : ind == 2
//         ? "george"
//         : ind == 3
//         ? "julio"
//         : ind == 4
//         ? "juan"
//         : ind == 5
//         ? "moris"
//         : ""
//     ].push(el);
//   });
// });

console.log(newData2);
