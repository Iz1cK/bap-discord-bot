import { toNonFilteredWords } from "./utils/toNonFilteredWords.js";
import { toFilteredWords } from "./utils/toFilteredWords.js";
import { findWhosTurn } from "./utils/findWhosTurn.js";
import USERS_IDS from "./utils/usersDiscordIds.js";
import auth from "./utils/googleAuth.js";
// const test = [
//   ["Coffee", "Electric", "Coaster", "Roundabout", "True_", "Erupt"],
//   ["Territory", "Year", "Ramanujan", "Narco", "Operator", "Rope"],
//   [
//     "Eradicate",
//     "Eat",
//     "Trash",
//     "Holocaust",
//     "Temporomandibular",
//     "Retardation",
//   ],
//   ["Nori", "iPhone", "Emanuel", "Lactating", "Geyser", "Romeo"],
//   ["Oreo", "Oral", "Lament", "Test", "Tent", "Terracotta"],
//   ["Apple", "Ear", "Rapper", "Rapist", "Trap", "Pillow"],
//   ["Wombat", "Trait", "Tusk", "Kunai", "Ivy", "Yeast"],
//   ["Thyme", "Easter", "Report", "Repercussion", "Nationalism", "Menstruating"],
//   ["Grape", "Europe", "Engagement", "Tectonic", "Collapse", "Emancipation"],
//   ["Narcolepsy", "Yodle", "Emerge", "Elaborate", "Etoile", "Electrifying"],
//   ["Gallant", "Tree", "Elasticity", "Yearly", "Yummy", "Yellow"],
//   ["Worcestershire", "Early", "Yell", "Louder", "Rounder", "Remorse"],
//   ["Effable", "Enter", "Reflexive", "Evaporate", "Estate", "Estimation"],
//   ["Nation", "Narcos", "Semantics ", "Sniper", "Racist", "Tyrant"],
//   ["Throwback ", "Kill", "Larva", "Appetizer", "Reality", "Jailed"],
//   ["Loom", "Mool", "Love", "Endlessly", "Yandere", "Erotic"],
//   ["Chaperone", "Ebola", "Aborting", "Giraffe", "Euphoria", "Aromatic"],
//   ["Chiropractor", "Router", "Reverser", "Rockster", "Railed", "Derailed"],
//   ["Deuteronomy", "Yahweh", "Huawei", "Hideous", "Sour", "Revolutionary"],
//   ["Yearns", "Sorry", "Yeehaw", "Jailed", "Titan", "Nagger"],
//   ["Rat", "Tar", "Revive", "Electricity", "Yacht", "Jailed"],
//   ["Tart", "Target", "Turf", "Fruity", "", ""],
// ];
const test = await auth.getWords(auth.client);
let newData = toFilteredWords(test);
let dast = toNonFilteredWords(test);
console.log(dast[dast.length - 1]);
// let oldData = toNonFilteredWords(Object.values(newData));

let { player, cell } = findWhosTurn(newData);
// console.log(USERS_IDS);

// console.log(await auth.getWords(auth.client));
// console.log(newData);
console.log(player, cell);
// console.log(oldData);
