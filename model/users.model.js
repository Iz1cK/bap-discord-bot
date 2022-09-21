import db from "../database/connection.js";

export const getUserById = (discordid) =>
  db
    .query(`SELECT * FROM users WHERE discordid = $1`, [discordid])
    .then(({ rows }) => rows[0]);

export const insertUser = ({ discordid, username, discriminator }) =>
  db
    .query(`INSERT INTO users VALUES($1,$2,$3) RETURNING discordid`, [
      discordid,
      username,
      discriminator,
    ])
    .then(({ rows }) => rows[0]);
