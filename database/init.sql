DROP TABLE IF EXISTS users,stats,offenses CASCADE;

CREATE TABLE users (
    discordid varchar(20) PRIMARY KEY,
    username varchar(32) NOT NULL,
    discriminator varchar(4) NOT NULL
);

CREATE TABLE stats(
    discordid varchar(20) REFERENCES users(discordid) PRIMARY KEY,
    offensecount INTEGER CHECK(offensecount >= 0),
    timespent INTEGER CHECK(timespent >= 0),
    timemuted INTEGER CHECK(timemuted >= 0),
    timedeafend INTEGER CHECK(timedeafend >= 0),
    timesharescreen INTEGER CHECK(timesharescreen >= 0)
);

CREATE TABLE offenses(
    discordid varchar(20) REFERENCES users(discordid) PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content text
);

CREATE TABLE timetogether (
    discordid1 varchar(20) REFERENCES users(discordid),
    discordid2 varchar(20) REFERENCES users(discordid),
    time INTEGER CHECK(time >= 0),
    PRIMARY KEY(discordid1,discordid2)
)