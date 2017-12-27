const router = require('express').Router();
const endpoints = require('./controllers/endpoints.js');

router.get('/polls', endpoints.polls.get);
router.post('/polls', endpoints.polls.post);

router.get('/results/*', endpoints.results.get);

router.post('/castVote', endpoints.castVote.post);

module.exports = router;