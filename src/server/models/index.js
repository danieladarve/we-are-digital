const fs = require('fs');
const path = require("path");

const cinemaWorld = JSON.parse(fs.readFileSync(path.join(__dirname, './dataset-cinemaWorld.json')));
const filmWorld = JSON.parse(fs.readFileSync(path.join(__dirname, './dataset-filmWorld.json')));

module.exports = {
    cinemaWorld,
    filmWorld,
};