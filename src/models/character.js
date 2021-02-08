import mongoose from 'mongoose';

let character= new mongoose.Schema({
    data: JSON,
    maxHp: Number,
    hp: Number,
    tempHp: Number,
    resistances: Array,
    immunities: Array
})


module.exports = mongoose.model("Character", character);