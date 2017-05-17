const express = require('express');
const bodyParser = require('body-parser');

const dogModel = require('../model/dog.js');
const mailModel = require('../model/mail.js');

const forumModel = require('../model/forum.js');

const router = express.Router();

router.use(bodyParser.json());

// List
router.get('/dogs', function(req, res) {
    dogModel.list(req.query.dogID).then(dogs => {
        res.json(dogs);
    });
});

router.post('/mails',function(req,res){
    const {name,mail,date,time,dogname,comment} = req.body;
    mailModel.mail(name,mail,date,time,dogname,comment);
});

router.post('/texts',function(req,res){
    const {name,mail,text} = req.body;
    //console.log(req.body);
    mailModel.tell(name,mail,text);
});
// Create Post
router.post('/forum/post', function(req, res) {
    const {barkerId, title, body} = req.body;
    if (!barkerId || !title || !body) {
        const err = new Error('barkerId, title and body are required');
        err.status = 400;
        throw err;
    }

    forumModel.createPost(barkerId, title, body).then(post => {
        res.json(post);
    });
});

// Create Response
router.post('/forum/response', function(req, res) {
    const {barkerId, postId, text} = req.body;
    if (!barkerId || !postId || !text) {
        const err = new Error('barkerId, postId and text are required');
        err.status = 400;
        throw err;
    }

    forumModel.createResponse(barkerId, postId, text).then(responses => {
        console.log('responses');
        console.log(responses);
        res.json(responses);
    });
});

// getForum
router.get('/forum', function(req, res) {
    forumModel.getForum(req.query.forumId).then(forum => {
        console.log('forum');
        console.log(forum);
        res.json(forum);
    });
});

// getPost
router.get('/forum/post', function(req, res) {
    forumModel.getPost(req.query.postId).then(post => {
        console.log('post');
        console.log(post);
        res.json(post);
    });
});

module.exports = router;
