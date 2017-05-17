const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

// function _createPost(barkerId, title, body) {
//     const newPost = {
//         id: uuid(),
//         ts: moment().unix(),
//         barkerId: barkerId,
//         title: title,
//         body: body,
//         responses: []
//     };
//
//     const newForum = [
//         newPost,
//         ..._getForum(0)
//     ];
//
//     localStorage.setItem(forumKey, JSON.stringify(newForum));
// }

function createPost(barkerId, title, body) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-forum.json')) {
            fs.writeFileSync('data-forum.json', '');
        }

        const newPost = {
            id: uuid(),
            ts: moment().unix(),
            barkerId: Number(barkerId),
            title: title,
            body: body,
            responses: []
        };

        getForum('0').then(forum => {
            forum = [
                newPost,
                ...forum
            ];
            fs.writeFile('data-forum.json', JSON.stringify(forum), err => {
                if (err) reject(err);

                resolve(newPost);
            });
        });
    });
}

// function _createResponse(barkerId, postId, text) {
//     let wooferId = barkerId;
//     while(wooferId === barkerId) {
//         wooferId = Math.floor(Math.random()*18) + 1;
//     };
//
//     const newResponse = {
//         id: uuid(),
//         ts: moment().unix(),
//         wooferId: wooferId,
//         text: text
//     };
//
//     const post = _getPost(postId);
//
//     const newResponses = [
//         newResponse,
//         ...post.responses
//     ];
//
//     const newPost = {
//         ...post,
//         responses: newResponses
//     };
//
//     const newForum = _getForum(0).map(p => {
//         if(p.id === postId)
//             return newPost;
//         return p;
//     });
//
//     localStorage.setItem(forumKey, JSON.stringify(newForum));
//
//     return newResponses;
// }

function createResponse(barkerId, postId, text) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-forum.json')) {
            fs.writeFileSync('data-forum.json', '');
        }

        let wooferId = Number(barkerId);
        while(wooferId === Number(barkerId)) {
            wooferId = Math.floor(Math.random()*18) + 1;
        };

        const newResponse = {
            id: uuid(),
            ts: moment().unix(),
            wooferId: wooferId,
            text: text
        };

        getPost(postId).then(post => {
            const newResponses = [
                newResponse,
                ...post.responses
            ];

            const newPost = {
                id: post.id,
                ts: post.ts,
                barkerId: post.barkerId,
                title: post.title,
                body: post.body,
                responses: newResponses
            };

            getForum('0').then(forum => {
                forum = forum.map(p => {
                    if(p.id === postId)
                        return newPost;
                    return p;
                });

                fs.writeFile('data-forum.json', JSON.stringify(forum), err => {
                    if (err) reject(err);

                });
            });

            resolve(newResponses);
        });
    });
}

// function _getForum(forumId) {
//     const forumString = localStorage.getItem(forumKey);
//     const forum = (forumString)? JSON.parse(forumString): [];
//
//     const newForum = (forumId === 0)? forum
//                                     : forum.filter(p => { return p.barkerId === forumId; });
//
//     return newForum;
// }

function getForum(forumId) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-forum.json')) {
            fs.writeFileSync('data-forum.json', '');
        }

        fs.readFile('data-forum.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let forum = (data) ? JSON.parse(data) : [];
            forum = (forumId === '0')? forum
                                     : forum.filter(p => { return p.barkerId === Number(forumId); } );

            resolve(forum);
        });
    });
}

// function getPost(postId) {
//     const forumString = localStorage.getItem(forumKey);
//     const forum = (forumString)? JSON.parse(forumString): [];
//
//     const post = forum.filter(p => {
//         return p.id === postId;
//     })
//
//     return post[0];
// }

function getPost(postId) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-forum.json')) {
            fs.writeFileSync('data-forum.json', '');
        }

        fs.readFile('data-forum.json', 'utf8', (err, data) => {
            if (err) reject(err);

            const forum = (data) ? JSON.parse(data) : [];
            const post = forum.filter(p => { return p.id === postId;});

            resolve(post[0]);
        });
    });
}


module.exports = {
    createPost,
    createResponse,
    getForum,
    getPost
};

// function list(searchText = '') {
//     return new Promise((resolve, reject) => {
//         if (!fs.existsSync('data-posts.json')) {
//             fs.writeFileSync('data-posts.json', '');
//         }
//
//         fs.readFile('data-posts.json', 'utf8', (err, data) => {
//             if (err) reject(err);
//
//             let posts = data ? JSON.parse(data) : [];
//             if (posts.length > 0 && searchText) {
//                 posts = posts.filter(p => {
//                     return p.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
//                 });
//             }
//             resolve(posts);
//         });
//     });
// }
//
// function create(mood, text) {
//     return new Promise((resolve, reject) => {
//         const newPost = {
//             id: uuid(),
//             mood: mood.charAt(0).toUpperCase() + mood.slice(1),
//             text: text,
//             ts: moment().unix(),
//             clearVotes: 0,
//             cloudsVotes: 0,
//             drizzleVotes: 0,
//             rainVotes: 0,
//             thunderVotes: 0,
//             snowVotes: 0,
//             windyVotes: 0
//         };
//
//         list().then(posts => {
//             posts = [
//                 newPost,
//                 ...posts
//             ];
//             fs.writeFile('data-posts.json', JSON.stringify(posts), err => {
//                 if (err) reject(err);
//
//                 resolve(newPost);
//             });
//         });
//     });
// }
//
// module.exports = {
//     list,
//     create
// };
