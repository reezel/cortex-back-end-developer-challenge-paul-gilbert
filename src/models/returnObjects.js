class currentHp{
    maxHp = 0;
    hp = 0;
    tempHp = 0;
    
    constructor(characterId){
        this.characterId = characterId;
    }
}

class currentHpChange extends currentHp{
    previousHp = 0;
    previousTempHp = 0;
    
}

class damageDealt extends currentHpChange{
    damage = 0;
    damageTaken = 0;
    damageType = '';
    resistance = '';
    immunity = '';
}

class characterReturn extends currentHp{
    character = "";
}

module.exports = {
    currentHP: currentHp, 
    currentHpChange: currentHpChange,
    damageDealt: damageDealt,
    characterReturn: characterReturn
}