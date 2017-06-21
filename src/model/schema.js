require('../../config.js');
const pgp = require('pg-promise')();
db = pgp(process.env.DB_URL);

const schemaSql = `
    --Drop
    DROP INDEX IF EXISTS posts_idx_ts;
    DROP INDEX IF EXISTS responses_idx_ts;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS posts;
    DROP TABLE IF EXISTS responses;
    --Create Table
    CREATE TABLE posts (
        id             serial PRIMARY KEY NOT NULL,
        ts             bigint NOT NULL DEFAULT (extract(epoch from now())),
        "forumID"      integer NOT NULL,
        title          text NOT NULL,
        content        text NOT NULL,
        "numResponses" integer NOT NULL DEFAULT 0
    );
    CREATE TABLE responses (
        id             serial PRIMARY KEY NOT NULL,
        ts             bigint NOT NULL DEFAULT (extract(epoch from now())),
        "postID"       bigint NOT NULL,
        content        text NOT NULL
    );
    --Create Index
    CREATE INDEX posts_idx_ts ON posts USING btree(ts);
    CREATE INDEX responses_idx_ts ON responses USING btree(ts);
`;

const dataSql = `
        --Populate dummy data
        INSERT INTO posts ("forumID", title, content, ts)
        SELECT
            (i%9)+1,
            'Testing Title Testing Title Testing Title Testing Title Testing Title Testing Title ' || i,
            'Testing Content Testing Content Testing Content Testing Content Testing Content ' || i,
            round(extract(epoch from now()) + (i - 1000) * 3600.0)
        FROM generate_series(1, 1000) AS s(i);
`;

db.none(schemaSql).then(() => {
    console.log('Schema created');
    db.none(dataSql).then(() => {
        console.log('Data populated');
        pgp.end();
    });
}).catch(err => {
    console.log('Error creating schema', err);
});
// INSERT INTO responses ("postID", content, ts)
// SELECT
//     951 + (i%50),
//     'Testing Responses Testing Responses Testing Responses Testing Responses Testing Responses' || i || round(random())+9,
//     round(extract(epoch from now()) + (i - 10000) * 3600.0)
// FROM generate_series(1, 10000) AS s(i);

// const schemaSql = `
//     -- Extensions
//     CREATE EXTENSION IF NOT EXISTS pg_trgm;
//
//     -- Drop (droppable only when no dependency)
//     DROP INDEX IF EXISTS posts_idx_text;
//     DROP INDEX IF EXISTS posts_idx_ts;
//     DROP INDEX IF EXISTS todos_idx_text;
//     DROP INDEX IF EXISTS todos_idx_ts;
//     DROP TABLE IF EXISTS posts;
//     DROP TABLE IF EXISTS todos;
//     DROP TYPE IF EXISTS mood;
//
//     -- Create
//     CREATE TYPE mood AS ENUM (
//         'Clear',
//         'Clouds',
//         'Drizzle',
//         'Rain',
//         'Thunder',
//         'Snow',
//         'Windy'
//     );
//     CREATE TABLE posts (
//         id              serial PRIMARY KEY NOT NULL,
//         mood            mood NOT NULL,
//         text            text NOT NULL,
//         ts              bigint NOT NULL DEFAULT (extract(epoch from now())),
//         "clearVotes"    integer NOT NULL DEFAULT 0,
//         "cloudsVotes"   integer NOT NULL DEFAULT 0,
//         "drizzleVotes"  integer NOT NULL DEFAULT 0,
//         "rainVotes"     integer NOT NULL DEFAULT 0,
//         "thunderVotes"  integer NOT NULL DEFAULT 0,
//         "snowVotes"     integer NOT NULL DEFAULT 0,
//         "windyVotes"    integer NOT NULL DEFAULT 0
//     );
//     CREATE TABLE todos (
//         id         serial PRIMARY KEY NOT NULL,
//         mood       mood NOT NULL,
//         text       text NOT NULL,
//         ts         bigint NOT NULL DEFAULT (extract(epoch from now())),
//         "doneTs"     bigint DEFAULT NULL
//     );
//     CREATE INDEX posts_idx_ts ON posts USING btree(ts);
//     CREATE INDEX posts_idx_text ON posts USING gin(text gin_trgm_ops);
//     CREATE INDEX todos_idx_ts ON todos USING btree(ts);
//     CREATE INDEX tods_idx_text ON todos USING gin(text gin_trgm_ops);
// `;

// const dataSql = `
//     -- Populate dummy posts
//     INSERT INTO posts (mood, text, ts)
//     SELECT
//         'Clear',
//         'word' || i || ' word' || (i+1) || ' word' || (i+2),
//         round(extract(epoch from now()) + (i - 1000) * 3600.0)
//     FROM generate_series(1, 1000) AS s(i);
//     INSERT INTO todos (mood, text, ts)
//     SELECT
//         'Clear',
//         'to' || i-1 || ' do' || (i) || ' list' || (i+1),
//         round(extract(epoch from now()) + (i - 200) * 3600.0)
//     FROM generate_series(1, 200) AS s(i);
// `;
