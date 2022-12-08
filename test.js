// import { toNonFilteredWords } from "./utils/toNonFilteredWords.js";
// import { toFilteredWords } from "./utils/toFilteredWords.js";
// import { findWhosTurn } from "./utils/findWhosTurn.js";
// import { discordids, lettersObj } from "./utils/usersDiscordIds.js";
// import auth from "./utils/googleAuth.js";
// // const test = [
// //   ["Coffee", "Electric", "Coaster", "Roundabout", "True_", "Erupt"],
// //   ["Territory", "Year", "Ramanujan", "Narco", "Operator", "Rope"],
// //   [
// //     "Eradicate",
// //     "Eat",
// //     "Trash",
// //     "Holocaust",
// //     "Temporomandibular",
// //     "Retardation",
// //   ],
// //   ["Nori", "iPhone", "Emanuel", "Lactating", "Geyser", "Romeo"],
// //   ["Oreo", "Oral", "Lament", "Test", "Tent", "Terracotta"],
// //   ["Apple", "Ear", "Rapper", "Rapist", "Trap", "Pillow"],
// //   ["Wombat", "Trait", "Tusk", "Kunai", "Ivy", "Yeast"],
// //   ["Thyme", "Easter", "Report", "Repercussion", "Nationalism", "Menstruating"],
// //   ["Grape", "Europe", "Engagement", "Tectonic", "Collapse", "Emancipation"],
// //   ["Narcolepsy", "Yodle", "Emerge", "Elaborate", "Etoile", "Electrifying"],
// //   ["Gallant", "Tree", "Elasticity", "Yearly", "Yummy", "Yellow"],
// //   ["Worcestershire", "Early", "Yell", "Louder", "Rounder", "Remorse"],
// //   ["Effable", "Enter", "Reflexive", "Evaporate", "Estate", "Estimation"],
// //   ["Nation", "Narcos", "Semantics ", "Sniper", "Racist", "Tyrant"],
// //   ["Throwback ", "Kill", "Larva", "Appetizer", "Reality", "Jailed"],
// //   ["Loom", "Mool", "Love", "Endlessly", "Yandere", "Erotic"],
// //   ["Chaperone", "Ebola", "Aborting", "Giraffe", "Euphoria", "Aromatic"],
// //   ["Chiropractor", "Router", "Reverser", "Rockster", "Railed", "Derailed"],
// //   ["Deuteronomy", "Yahweh", "Huawei", "Hideous", "Sour", "Revolutionary"],
// //   ["Yearns", "Sorry", "Yeehaw", "Jailed", "Titan", "Nagger"],
// //   ["Rat", "Tar", "Revive", "Electricity", "Yacht", "Jailed"],
// //   ["Tart", "Target", "Turf", "Fruity", "", ""],
// // ];
// const test = await auth.getWords(auth.client);
// let newData = toFilteredWords(test);
// let dast = toNonFilteredWords(test);
// console.log(dast[dast.length - 1]);
// // let oldData = toNonFilteredWords(Object.values(newData));

// let { player, cell, cellIndeces } = findWhosTurn(newData);
// console.log(discordids);
// console.log(lettersObj);
// auth.jail(auth.client, cellIndeces);

// // console.log(await auth.getWords(auth.client));
// // console.log(newData);
// console.log(player, cell, cellIndeces);
// // console.log(oldData);

import axios from "axios";

axios
  .post(
    `https://graph.facebook.com/v15.0/112639601682834/messages`,
    {
      messaging_product: "whatsapp",
      to: "972507277165",
      type: "template",
      template: {
        name: "name_game",
        language: {
          code: "en_US",
        },
      },
    },
    {
      headers: {
        Authorization:
          "Bearer EABHzVGYzE3YBACsUzqXZAKduLO1xtCYzNYL7wn3oZBuwcsVUUeCihZAe3QGTzgMgG0gjkVARBhXxq2QOcLGbJZBwc4I9gXNupd4gy174lFEZCo1MLZAA7MCepVoQ7iFqa8Lsd12ok0kYZBgqCVITFmbtSob8GfqzkWBch2g9a9fzclny4IXm5YOCwTIm0YWYimVl9XGEY5xHgZDZD",
        "Content-Type": "application/json",
      },
    }
  )
  .then(console.log);
