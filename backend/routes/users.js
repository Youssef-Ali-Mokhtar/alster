const express = require('express');
const requireAuth = require('../middleware/requireAuth')
const {signupUser, loginUser, getProfile} = require('../controllers/UserController');
const router = express.Router();

//login route
router.post('/login', loginUser);

//signup route
router.post('/signup', signupUser)

router.use('/', requireAuth)

//profile
router.get('/profile', getProfile)


module.exports = router;