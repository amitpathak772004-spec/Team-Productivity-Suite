const express = require('express');
const commentController = require('../controllers/commentController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router({ mergeParams: true });

router.post('/', authMiddleware, commentController.addComment);
router.get('/', authMiddleware, commentController.getComments);

module.exports = router;
