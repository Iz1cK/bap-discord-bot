DROP TABLE IF EXISTS users,stats,offenses CASCADE;

CREATE TABLE users (
    discordid varchar(20) PRIMARY KEY,
    username varchar(32) NOT NULL,
    discriminator varchar(4) NOT NULL
);

CREATE TABLE stats(
    discordid varchar(20) REFERENCES users(discordid) PRIMARY KEY,
    offensecount INTEGER CHECK(offensecount >= 0)
);

CREATE TABLE offenses(
    discordid varchar(20) REFERENCES users(discordid) PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content text
);