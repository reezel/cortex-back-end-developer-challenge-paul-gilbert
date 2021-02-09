import Character from '../models/character';
const returnObjects = require('../models/returnObjects');
const returnValues = returnObjects;
const constitution = 'constitution';
const immunity = 'immunity';
const resistance = 'resistance';

module.exports.assignDamage = async (characterId, damageType, damage) => {
    let character = await Character.findById(characterId).exec(); 
    damageType = damageType.toLowerCase();   
    if(character){
        let returnValue = new returnValues.damageDealt(characterId)
        returnValue.previousHp = character.hp;
        returnValue.maxHp = character.maxHp;
        returnValue.previousTempHp = character.tempHp;
        returnValue.damage = damage;
        returnValue.damageType = damageType;
        if (character.immunities.includes(damageType)) {
            damage = 0;
            returnValue.immunity = damageType;
        }
        else if(character.resistances.includes(damageType)) {
           damage = Math.floor(damage / 2);
           returnValue.resistance = damageType;
        }
        returnValue.damageTaken = damage;
        if (damage > returnValue.previousHp + returnValue.previousTempHp) {
            damage = returnValue.previousHp + returnValue.previousTempHp;
        }
        if (returnValue.previousTempHp <= damage) {
            let storedDamage = returnValue.previousTempHp;
            returnValue.tempHp = 0;
            damage -= storedDamage;
        }
        else{
            returnValue.tempHp = returnValue.previousTempHp - damage;
        }
        returnValue.hp = returnValue.previousHp - damage;
        character.hp = returnValue.hp;
        character.tempHp = returnValue.tempHp;
        character.save(function (err) {
            if (err) return console.error(err);
        });  
        return returnValue;
    }    
}

module.exports.assignTempHp = async (characterId, tempHp) => {
    let character = await Character.findById(characterId).exec();    
    if(character){
        let returnValue = new returnValues.currentHpChange(characterId);
        returnValue.maxHp = character.maxHp;
        returnValue.tempHp = character.tempHp;
        returnValue.previousTempHp = character.tempHp;
        returnValue.previousHp = character.hp;
        returnValue.hp = character.hp;
        if (character.tempHp > tempHp) {
            tempHp = character.tempHp;
        }
        returnValue.tempHp = tempHp;
        character.tempHp = tempHp;
        character.save(function (err) {
            if (err) return console.error(err);
        });  

        return returnValue;
    }
}

module.exports.createCharater = data => {
    
    let characterJSON = JSON.stringify(data);
    let characterConverted = getCharacterConverted(characterJSON);
    let maxHp = getMaxHp(characterConverted);
    let characterDb = createCharacterDb(characterJSON, characterConverted, maxHp);
    characterDb.save(function (err) {
        if (err) return console.error(err);
    });       
    let returnValue = getCurrentHpReturnObject(characterDb);  
    return returnValue;
} 

module.exports.getCharacter = async (characterId) => {
    let character = await Character.findById(characterId).exec();    
    if(character){
        return getCharacterReturn(character);
    }
}

module.exports.getCharacterCurrentHp = async (characterId) => {    
    let character = await Character.findById(characterId).exec();    
    if(character){
        return getCurrentHpReturnObject(character);
    }
}

module.exports.getCharacters = async  () => {
    let characters = await Character.find({}).exec();
    let returnValue = [];

    if(characters){
        characters.forEach(character => {
            returnValue.push(getCharacterReturn(character));
        });    
    }
    
    return returnValue;
}

module.exports.healCharacter = async (characterId, hp) => {
    let character = await Character.findById(characterId).exec();    
    if(character){
        let returnValue = new returnValues.currentHpChange(characterId);
        returnValue.maxHp = character.maxHp;
        returnValue.tempHp = character.tempHp;
        returnValue.previousTempHp = character.tempHp;
        returnValue.previousHp = character.hp;
        if ((character.hp + hp) <= character.maxHp) {
            returnValue.hp = character.hp + hp;
        }
        else {
            returnValue.hp = character.maxHp
        }

        character.hp = returnValue.hp;
        character.save(function (err) {
            if (err) return console.error(err);
        });  

        return returnValue;
    }
}

const createCharacterDb = (characterJSON, characterConverted, maxHp) => {
    let defenses = getDefenses(characterConverted);
    let character = new Character({
        data: characterJSON, 
        hp: maxHp, 
        maxHp: maxHp, 
        tempHp: 0,
        resistances: getDefense(defenses, resistance),
        immunities: getDefense(defenses, immunity)
        });
    return character;
}

const getCharacterConverted = characterJSON => {
   return JSON.parse(characterJSON, (_, val) => {
        if (Array.isArray(val) || typeof val !== 'object') {
          return val;
        }
        return Object.entries(val).reduce((a, [key, val]) => {
          a[key.toLowerCase()] = val;
          return a;
        }, {});
      });
}

const getCharacterReturn = (character) => {
    let returnValue = new returnValues.characterReturn(character._id);
    returnValue.character = character.data;
    returnValue.hp = character.hp;
    returnValue.maxHp = character.maxHp;
    returnValue.tempHp = character.tempHp;

    return returnValue;    
}

const getConModifier = character => {
    var con = character.stats.constitution;
    var items = character.items;
    
    if(items != null){
        items.forEach(item => {
            
            if(constitution === item.modifier.affectedvalue) {
                con += item.modifier.value;
            }
        });
    }

    let conMod = Math.floor((con - 10)/2);
    return conMod;
}

const getCurrentHpReturnObject = character => {
    let returnValue = new returnValues.currentHP(character._id);

    returnValue.hp = character.hp;
    returnValue.maxHp = character.maxHp;
    returnValue.tempHp = character.tempHp;

    return returnValue;
}

const getDefense = (defenses, defenseType) => {
    var returnValue = [];    

    defenses.forEach(defense => {
        if(defense.defense.toLowerCase() === defenseType.toLowerCase()){
            returnValue.push(defense.type.toLowerCase());
        }
    });

    return returnValue;
}

const getDefenses = character => {
    let defenses = character.defenses;
    if(!defenses){
        return [];    
    }
    else{
        return defenses;
    }
}

const getMaxHp = character => {
    let hp = 0;
    let totalLevels = 0;    
    var conMod = getConModifier(character);
    
    character.classes.forEach(currentClass => {
        let hitdie = currentClass.hitdicevalue;
        let classLevel = currentClass.classlevel;
        if(totalLevels == 0){
            hp = hitdie; // Max Hp for first level
            totalLevels +=1; //Adjust total levels for Con bonus later
            classLevel -=1; //Remove level that was added as max.
        }
        let classAdded = ((hitdie / 2) + 1) * classLevel;
        hp += classAdded ; //Works even if max 1st level left 0 levels.
        totalLevels += classLevel;
    })

    hp += (conMod * totalLevels);
    
    return hp;
}