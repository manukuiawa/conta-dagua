const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  saveQuestionnaire,
} = require('../controllers/questionnaireController');

const router = express.Router();

router.post('/', authMiddleware, saveQuestionnaire);

module.exports = router;
