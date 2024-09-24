const express = require('express');
const { registerUser, loginUser, logoutUser, profileUser } = require('../controllers/authController');
const { protect } = require('../middlewares/protect')

const router = express.Router();
router.get('/', function (req, res) {
    res.send("Auth API");
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/profile', protect, profileUser);

module.exports = router;