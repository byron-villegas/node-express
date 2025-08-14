const axios = require('axios');
const MonsterDto = require('./dto/monster.dto');

const BASE_URL = 'https://mhw-db.com';

const getAllMonsters = async() => {
    const response = await axios.get(`${BASE_URL}/monsters`);
    // Mapeo de cada elemento al DTO
    return response
        .data
        .map(monster => new MonsterDto(monster));
  }

const monsterHunterApiClient = {
    getAllMonsters
};

  
module.exports = monsterHunterApiClient;