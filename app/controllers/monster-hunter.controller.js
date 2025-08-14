const HttpStatus = require('../constants/http-status');
const monsterHunterService = require('../services/monster-hunter.service');

const findAllMonsters = async (req, res, next) => {
    try {
        const monsters = await monsterHunterService.findAllMonsters();
        res.status(HttpStatus.OK).send(monsters);
    } catch (error) {
        next(error);
    }
}

const monsterHunterController = {
    findAllMonsters
};

module.exports = monsterHunterController;