const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const {
  saveQuestionnaire,
  getQuestionnaire,
} = require('../controllers/questionnaireController');

const router = express.Router();

router.post('/', authMiddleware, saveQuestionnaire);
router.get('/', authMiddleware, getQuestionnaire);

module.exports = router;
