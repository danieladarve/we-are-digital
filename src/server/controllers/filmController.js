const filmModel = require("../models");
const fs = require('fs');
const path = require("path");
const { sample, findLastIndex } = require("lodash");
const { cinemaWorld, filmWorld } = filmModel;

// Allows to mimic if a request should fail
const failRandomly = (provider) => {
    const now = new Date();
    const fails = now.getUTCMilliseconds() % 2 === 0;
    const providers = ['filmWorld','cinemaWorld'];
    // if searching for all
    if(provider === 'false'){
        if(fails){
            // return a random element
            return sample(providers)
        }
        return false;
    }
    // if filtering by provider
    if(fails){
        return provider==='cinemaWorld'?'filmWorld':'cinemaWorld';
    }
    return provider;
}

const filmController = {
    all (req, res) {
        try {
            const provider = failRandomly(req.params.provider);
            
            if(!provider){
                res.json([...cinemaWorld, ...filmWorld]);
                return;
            }
            res.json(filmModel[provider]);
            return;
            
        } catch (err) {
            // In the case we had implemented a DB here 
            // we could return the current saved dataset
            console.log(err)
            res.json(false);
            return;
        }
    },
    film  (req, res) {
        try {
            res.json(filmModel[req.params.provider].filter(item => item.id == req.params.id));
            return;
        } catch (err) {
            res.json(false);
            return;
        }
    },
    create (req, res) {
        try {
            const requestBody = req.body;
            const price = requestBody.price;
            const id = requestBody.id;
            const index = findLastIndex(filmModel[req.params.provider], function(o){
                return o.id === id
            })
            let result = false;
            if(index >= 0){
                filmModel[req.params.provider][index].price = price;
                let data = JSON.stringify(filmModel[req.params.provider]);
                fs.writeFileSync(path.join(__dirname, `../models/dataset-${req.params.provider}.json`), data);
                result = true;
            }

            res.json(result);
            return;
        } catch (err) {
            res.json(false);
            return;
        }
    }
}

module.exports = filmController;