import db from "../database/connection.js";

export const getAllTimesTogether = () =>
  db.query(`SELECT * FROM timetogether`).then(({ rows }) => rows);
