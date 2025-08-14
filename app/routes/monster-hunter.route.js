const express = require('express');
const router = express.Router();
const monsterHunterController = require('../controllers/monster-hunter.controller');

router.get('/monsters', monsterHunterController.findAllMonsters);

module.exports = router;