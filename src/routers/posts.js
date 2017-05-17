const express = require('express');
const bodyParser = require('body-parser');

const postModel = require('../model/posts.js');
const voteModel = require('../model/votes.js');
const todoModel = require('../model/todos.js')

const router = express.Router();

router.use(bodyParser.json());

// List
router.get('/posts', function(req, res) {
    postModel.list(req.query.searchText).then(posts => {
        res.json(posts);
    });
});

// Create
router.post('/posts', function(req, res) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    postModel.create(mood, text).then(post => {
        res.json(post);
    });
});

// Vote
router.post('/posts/:id/:mood(clear|clouds|drizzle|rain|thunder|snow|windy)Votes', function(req, res) {
    const {id, mood} = req.params;
    if (!id || !mood) {
        const err = new Error('Post ID and mood are required');
        err.status = 400;
        throw err;
    }
    voteModel.create(id, mood).then(post => {
        res.json(post);
    });
});

// Todo

//list
router.get('/todos', function(req, res) {
    todoModel.list(req.query.unaccomplishedOnly, req.query.searchText).then(todos => {
        res.json(todos);
    });

});

//create
router.post('/todos', function(req, res) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }

    todoModel.create(mood, text).then(post => {
        res.json(post);
    });
});

//accomplish
router.put('/todos/:id', function(req, res) {
    const id = req.params;

    if(!id) {
        const err = new Error('Todo ID is required');
        err.status = 400;
        throw err;
    }

    todoModel.accomplish(id.id).then(todo => {
        res.json(todo);
    });
})

module.exports = router;
