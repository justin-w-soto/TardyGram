DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments;

CREATE TABLE users (
    github_username TEXT NOT NULL PRIMARY KEY,
    github_avatar_url TEXT NOT NULL
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    photo_url TEXT NOT NULL,
    caption TEXT NOT NULL,
    tags TEXT[],
    "user" TEXT NOT NULL, 
    FOREIGN KEY("user") REFERENCES users(github_username)
);

CREATE TABLE comments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    comment_by TEXT NOT NULL,
    FOREIGN KEY(comment_by) REFERENCES users(github_username),
    post BIGINT NOT NULL,
    FOREIGN KEY(post) REFERENCES posts(id),
    comment  TEXT NOT NULL
);


