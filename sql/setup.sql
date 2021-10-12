DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;

CREATE TABLE users (
    github_username TEXT NOT NULL PRIMARY KEY,
    github_avatar_url TEXT NOT NULL
);


