import fs from "fs";
import db from "./connection.js";

// get the contents of our init.sql file
const initSQL = fs.readFileSync("./database/init.sql", "utf-8");

// run the init.sql file on our database
db.query(initSQL)
  .then(() => {
    console.log("Database built");
    db.end(); // close the connection as we're finished
  })
  .catch(console.log);
