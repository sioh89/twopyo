const path = require('path');
const cors = require('cors');
const router = require('express').Router();
const endpoints = require('./controllers/endpoints.js');
const userController = require('./controllers/userController.js');
const authenticate = require('./middleware/authentication.js').authenticate;

// CORS configuration
const acceptableHeaders = ['Authorization'];
const corsOptions = {
  allowedHeaders: acceptableHeaders,
};

router.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// Public endpoints
router.post('/results', endpoints.results.post);
router.post('/castVote', endpoints.castVote.post);
router.post('/pollById', endpoints.pollById.post);
router.post('/authUser', userController.authUser.post);
router.post('/createUser', userController.createUser.post);

// Private endpoints
router.get('/polls', authenticate, endpoints.polls.get);
router.post('/polls', authenticate, endpoints.polls.post);

// Catch all
router.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/', 'index.html')));

module.exports = router;