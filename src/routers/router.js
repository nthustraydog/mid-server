const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('./middleware/access-controller.js');

const forumModel = require('./model/forum.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// getForum
router.get('/forum/posts', function(req, res, next) {
    const {forumID, start} = req.query;
    forumModel.getForum(forumID, start).then(forum => {
        res.json(forum);
    }).catch(next);
});

// getResponse
router.get('/forum/responses', function(req, res, next) {
    const {postID, start} = req.query;
    forumModel.getResponses(postID, start).then(responses => {
        res.json(responses);
    }).catch(next);
});

// createPost
router.post('/forum/post', function(req, res, next) {
    const {forumID, title, content} = req.body;
    if (!forumID || !title || !content) {
        const err = new Error('forumID, title and content are required');
        err.status = 400;
        throw err;
    }
    forumModel.createPost(forumID, title, content).then(post => {
        res.json(post);
    }).catch(next);
});

// createResponse
router.post('/forum/response', function(req, res, next) {
    const {postID, content} = req.body;
    if (!postID || !content) {
        const err = new Error('postID and content are required');
        err.status = 400;
        throw err;
    }
    forumModel.createResponse(postID, content).then(response => {
        res.json(response);
    }).catch(next);
});

module.exports = router;

// // List
// router.get('/posts', function(req, res, next) {
//     const {searchText, start} = req.query;
//     postModel.list(searchText, start).then(posts => {
//         res.json(posts);
//     }).catch(next);
// });
//
// // Create
// router.post('/posts', function(req, res, next) {
//     const {mood, text} = req.body;
//     if (!mood || !text) {
//         const err = new Error('Mood and text are required');
//         err.status = 400;
//         throw err;
//     }
//     postModel.create(mood, text).then(post => {
//         res.json(post);
//     }).catch(next);
// });
//
// // Vote
// router.post('/posts/:id/:mood(clear|clouds|drizzle|rain|thunder|snow|windy)Votes', function(req, res, next) {
//     const {id, mood} = req.params;
//     if (!id || !mood) {
//         const err = new Error('Post ID and mood are required');
//         err.status = 400;
//         throw err;
//     }
//     voteModel.create(id, mood).then(post => {
//         res.json(post);
//     }).catch(next);
// });
//
// // List
// router.get('/todos', function(req, res, next) {
//     const {unaccomplishedOnly, searchText, start} = req.query;
//     todoModel.listTodos(unaccomplishedOnly, searchText, start).then(todos => {
//         res.json(todos);
//     }).catch(next);
// });
//
// // Create
// router.post('/todos', function(req, res, next) {
//     const {mood, text} = req.body;
//     if (!mood || !text) {
//         const err = new Error('Mood and text are required');
//         err.status = 400;
//         throw err;
//     }
//     todoModel.createTodo(mood, text).then(todo => {
//         res.json(todo);
//     }).catch(next);
// });
//
// //accomplish
// router.put('/todos/:id', (req, res, next) => {
//     const {id} = req.params;
//     if(!id) {
//         const err = new Error('Todo ID is required');
//         err.status = 400;
//         throw err;
//     }
//     todoModel.accomplish(id).then(todo => {
//         res.json(todo);
//     }).catch(next);
// })
