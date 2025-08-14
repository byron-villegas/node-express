class MonsterDto {
    constructor(monster) {
        this.id = monster.id;
        this.name = monster.name;
        this.type = monster.type;
        this.description = monster.description;
    }
}

module.exports = MonsterDto;