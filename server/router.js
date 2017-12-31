const path = require('path');
const router = require('express').Router();
const endpoints = require('./controllers/endpoints.js');
const userController = require('./controllers/userController.js');

router.get('/polls', endpoints.polls.get);
router.post('/polls', endpoints.polls.post);

router.post('/results', endpoints.results.post);

router.post('/castVote', endpoints.castVote.post);

router.post('/pollById', endpoints.pollById.post);

router.post('/authUser', userController.authUser.post);

router.post('/createUser', userController.createUser.post);

router.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/', 'index.html')));

module.exports = router;