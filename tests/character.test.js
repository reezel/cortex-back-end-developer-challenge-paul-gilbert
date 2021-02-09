import server from '../src/index';
import request  from 'supertest';
import {expect} from 'chai';

const bodyParser = require('body-parser')

server.use(bodyParser.json);
const fs = require('fs');
let characterId = 0;
const CharacterTest = "Character API Tests"
const characterIdInvalid = '60200026d08d630c54358f43';

describe(CharacterTest,()=>{
    it('GET /api/v1/character/ (returns all characters)',async()=>{
        const response = await request(server).get('/api/v1/character/');
        expect(response.status).to.equal(200)
        expect(response.body).to.be.an.instanceof(Array);
    })
})

describe(CharacterTest,()=>{
    it('POST /api/v1/character/ (creates a character)',async()=>{      

        let rawdata = fs.readFileSync('.\\tests\\data\\briv.json');
        let parsedData = JSON.parse(rawdata);
        const response = await request(server).post('/api/v1/character/')
                                             .send(parsedData);       
        expect(response.status).to.equal(200)
        expect(response.body).to.not.equal(null);
        characterId = response.body.characterId;
    })
})

describe(CharacterTest,()=>{
    it('GET /api/v1/character/:characterId/hp (returns current hp of character: Status Code 204)',async()=>{
        const response = await request(server).get('/api/v1/character/' + characterIdInvalid);
        expect(response.status).to.equal(204)
    })
})

describe(CharacterTest,()=>{
    it('GET /api/v1/character/:characterId/hp (returns current hp of character)',async()=>{
        const response = await request(server).get('/api/v1/character/' + characterId);
        expect(response.status).to.equal(200);
        let data = getObject(response.body);
        expect(data.maxHp).to.equal(45);
    })
})

describe(CharacterTest,()=>{
    it('GET /api/v1/character/:characterId/hp (returns current hp of character: Status Code 204)',async()=>{
        const response = await request(server).get('/api/v1/character/' + characterIdInvalid +'/hp');
        expect(response.status).to.equal(204)
    })
})

describe(CharacterTest,()=>{
    it('GET /api/v1/character/:characterId/hp (returns current hp of character)',async()=>{
        const response = await request(server).get('/api/v1/character/' + characterId + '/hp');
        expect(response.status).to.equal(200);
        
        let data = getObject(response.body);
        expect(data.maxHp).to.equal(45);
    })
})

describe(CharacterTest,()=>{
    it('POST /api/v1/character/:characterId/damage/:damageType/:damage (assigns damage to the character: Status Code 204)',async()=>{
        const response = await request(server).post('/api/v1/character/' + characterIdInvalid + '/damage/fire/5');
        expect(response.status).to.equal(204)
    })
})

describe(CharacterTest,()=>{
    it('POST /api/v1/character/:characterId/damage/:damageType/:damage (assigns fire damage to the character)',async()=>{

        const response = await request(server).post('/api/v1/character/' + characterId + '/damage/fire/15');
        expect(response.status).to.equal(200);
        
        let data = getObject(response.body);
        expect(data.hp).to.equal(45);
    })
})

describe(CharacterTest,()=>{
    it('POST /api/v1/character/:characterId/damage/:damageType/:damage (assigns slashing damage to the character)',async()=>{

        const response = await request(server).post('/api/v1/character/' + characterId + '/damage/slashing/5');
        expect(response.status).to.equal(200);
        
        let data = getObject(response.body);
        expect(data.hp).to.equal(43);
    })
})

describe(CharacterTest,()=>{
    it('POST /api/v1/character/:characterId/damage/:damageType/:damage (assigns bashing damage to the character)',async()=>{

        const response = await request(server).post('/api/v1/character/' + characterId + '/damage/bashing/5');
        expect(response.status).to.equal(200);
        
        let data = getObject(response.body);
        expect(data.hp).to.equal(38);
    })
})

describe(CharacterTest,()=>{
    it('POST /api/v1/character/:characterId/heal/:hp (heals a character for 5 hp: Status Code 204)',async()=>{
        const response = await request(server).post('/api/v1/character/' + characterIdInvalid + '/heal/5');
        expect(response.status).to.equal(204)
    })
})

describe(CharacterTest,()=>{
    it('POST /api/v1/character/:characterId/heal/:hp (heals a character for 1 hp)',async()=>{

        const response = await request(server).post('/api/v1/character/' + characterId + '/heal/1');
        expect(response.status).to.equal(200);
        
        let data = getObject(response.body);
        expect(data.hp).to.equal(39);
    })
})

describe(CharacterTest,()=>{
    it('POST /api/v1/character/:characterId/heal/:hp (heals a character for 30 hp)',async()=>{

        const response = await request(server).post('/api/v1/character/' + characterId + '/heal/30');
        expect(response.status).to.equal(200);
        
        let data = getObject(response.body);
        expect(data.hp).to.equal(45);
    })
})
describe(CharacterTest,()=>{
    it('POST /api/v1/character/:characterId/heal/:hp (adds 5 temp hp for a character: Status Code 204)',async()=>{
        const response = await request(server).post('/api/v1/character/' + characterIdInvalid + '/tempHp/5');
        expect(response.status).to.equal(204)
    })
})

describe(CharacterTest,()=>{
    it('POST /api/v1/character/:characterId/heal/:hp (adds 5 temp hp for a character)',async()=>{

        const response = await request(server).post('/api/v1/character/' + characterId + '/tempHp/5');
        expect(response.status).to.equal(200);
        
        let data = getObject(response.body);
        expect(data.tempHp).to.equal(5);
    })
})

describe(CharacterTest,()=>{
    it('POST /api/v1/character/:characterId/heal/:hp (adds 2 temp hp for a character)',async()=>{

        const response = await request(server).post('/api/v1/character/' + characterId + '/tempHp/2');
        expect(response.status).to.equal(200);
        
        let data = getObject(response.body);
        expect(data.tempHp).to.equal(5);
    })
})


describe(CharacterTest,()=>{
    it('POST /api/v1/character/:characterId/heal/:hp (adds 10 temp hp for a character)',async()=>{

        const response = await request(server).post('/api/v1/character/' + characterId + '/tempHp/10');
        expect(response.status).to.equal(200);
        
        let data = getObject(response.body);
        expect(data.tempHp).to.equal(10);
    })
})


const getObject = data => {
    let stringyData = JSON.stringify(data);
    let returnValue = JSON.parse(stringyData);
    return returnValue;
}