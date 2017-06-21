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

//Bath area
router.post('/mails',function(req,res){
  console.log("here");
    const {name,mail,date,dogname,note} = req.body;
    mailModel.mail(name,mail,date,dogname,note);
});

//Event area
router.post('/texts',function(req,res){
    const {name,mail,date,location,dogname,process_in,check_event} = req.body;
    //console.log(req.body);
    mailModel.tell(name,mail,date,location,dogname,process_in,check_event);
});

//Adopt area
router.post('/adopt',function(req,res){
    const {name, phone, email, address, exp, id} = req.body;
    //console.log(req.body);
    mailModel.adoptMail(name, phone, email, address, exp, id);
});
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
