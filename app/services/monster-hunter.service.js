const monsterHunterApiClient = require('../clients/monster-hunter-api/monster-hunter-api.client');

const findAllMonsters = async () => {
    try {
        const monsters = await monsterHunterApiClient.getAllMonsters();
        return monsters;
    } catch (error) {
        console.error('Error fetching monsters:', error);
        throw error;
    }
}

const monsterHunterService = {
    findAllMonsters
};

module.exports = monsterHunterService;