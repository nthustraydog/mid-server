require('../../config.js');
if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function getForum(forumID = '0', start) {
    const where = [];
    if(forumID !== '0')
        where.push(`"forumID" = $1`);
    if (start)
        where.push('id < $2');
    const sql = `
        SELECT *
        FROM posts
        ${(where.length) ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY id DESC
        LIMIT 10
    `;
    return db.any(sql, [forumID, start]);
}

function getResponses(postID, start) {
    const where = [];
    where.push(`"postID" = $1`);
    if (start)
        where.push('id < $2');
    const sql = `
        SELECT *
        FROM responses
        ${(where.length) ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY id DESC
        LIMIT 10
    `;
    return db.any(sql, [postID, start]);
}

function createPost(forumID, title, content) {
    const sql = `
        INSERT INTO posts ($<this:name>)
        VALUES ($<forumID>, $<title>, $<content>)
        RETURNING *
    `;
    return db.one(sql, {forumID, title, content});
}

function createResponse(postID, content) {
    const sql = `
        UPDATE posts
        SET "numResponses" = "numResponses" + 1
        WHERE id = $<postID>;
        INSERT INTO responses ($<this:name>)
        VALUES ($<postID>, $<content>)
        RETURNING *
    `;

    return db.one(sql, {postID, content});
}

module.exports = {
    getForum,
    getResponses,
    createPost,
    createResponse
};

// function list(searchText = '', start) {
//     const where = [];
//     if (searchText)
//         where.push(`text ILIKE '%$1:value%'`);
//     if (start)
//         where.push('id < $2');
//     const sql = `
//         SELECT *
//         FROM posts
//         ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
//         ORDER BY id DESC
//         LIMIT 10
//     `;
//     return db.any(sql, [searchText, start]);
// }
//
// function create(mood, text) {
//     const sql = `
//         INSERT INTO posts ($<this:name>)
//         VALUES ($<mood>, $<text>)
//         RETURNING *
//     `;
//     return db.one(sql, {mood, text});
// }
//
// function create(postId, mood) {
//     const sql = `
//         UPDATE posts
//         SET $2:name = $2:name + 1
//         WHERE id = $1
//         RETURNING *
//     `;
//     return db.one(sql, [postId, mood.toLowerCase() + 'Votes']);
// }
