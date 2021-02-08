import express from 'express';
import characterCreation from "../logic/characterCreation"


const router = express.Router();

router.use(express.json());

router.get('/character',async(req,res)=>{
    try {        
        let characters = await characterCreation.getCharacters();       
        res.status(200).send(characters);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Interval server error'})
    }
})

router.get('/character/:characterId',async(req,res)=>{
    try {
        let character = await characterCreation.getCharacter(req.params.characterId);
        
        if(!character){
            res.status(204).send({message:'No Content'});
        }

        res.status(200).send(character);
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Interval server error'})
    }
})

router.post('/character/:characterId/heal/:hp',async(req,res)=>{
    try {
        let param = req.params;        
        let returnValue = await characterCreation.healCharacter(param.characterId, parseInt(param.hp));
        
        if(!returnValue){
            res.status(204).send({message:'No Content'});
        }

        res.status(200).send(returnValue);
    } catch (error) {
        console.log(error)
        res.status(500).send({message:'Interval server error'})
    }
})

router.post('/character/:characterId/tempHp/:tempHp',async(req,res)=>{
    try {
        let param = req.params;        
        let returnValue = await characterCreation.assignTempHp(param.characterId, parseInt(param.tempHp));
        
        if(!returnValue){
            res.status(204).send({message:'No Content'});
        }

        res.status(200).send(returnValue);
    } catch (error) {
        console.log(error)
        res.status(500).send({message:'Interval server error'})
    }
})
router.get('/character/:characterId/hp',async(req,res)=>{
    try {
        let hp = await characterCreation.getCharacterCurrentHp(req.params.characterId);
        
        if(!hp){
            res.status(204).send({message:'No Content'});
        }

        res.status(200).send(hp);
    } catch (error) {
        res.status(500).send({message:'Interval server error'})
    }
})

router.post('/character',async(req,res)=>{
    try {
        res.status(200).send(await characterCreation.createCharater(req.body));        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Interval server error'})
    }
})

router.post('/character/:characterId/damage/:damageType/:damage',async(req,res)=>{
    try {
        let param = req.params;        
        let returnValue = await characterCreation.assignDamage(param.characterId, param.damageType, param.damage);

        if (!returnValue) {
            res.status(204).send({message:'No Content'});
        }

        res.status(200).send(returnValue);        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Interval server error'})
    }
})


module.exports=router;