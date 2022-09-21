import db from "../database/connection.js";

export const getUserStatsById = (discordid) =>
  db
    .query(`SELECT * FROM stats WHERE discordid = $1`, [discordid])
    .then(({ rows }) => rows[0]);

export const getAllUsersStats = () =>
  db
    .query(
      `SELECT users.username,stats.offensecount 
      FROM stats INNER JOIN users ON users.discordid = stats.discordid
      ORDER BY stats.offensecount DESC, users.username ASC`
    )
    .then(({ rows }) => rows);

export const insertUserStats = ({ discordid, offensecount }) =>
  db
    .query(`INSERT INTO stats VALUES($1,$2) RETURNING discordid`, [
      discordid,
      offensecount,
    ])
    .then(({ rows }) => rows[0]);

export const updateOffenseCount = (discordid) =>
  db
    .query(
      `UPDATE stats SET offensecount = offensecount + 1 WHERE discordid=$1 RETURNING offensecount`,
      [discordid]
    )
    .then(({ rows }) => rows[0]);
