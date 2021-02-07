const express = require("express");
const router = express.Router();
const passport = require("passport");
const filmController = require("../controllers/filmController")
const cors = require('cors')

require("dotenv").config();

const corsOptions = {
    origin: process.env.APP_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
router.use(cors(corsOptions));

router.get('/api/:provider/movies',
    passport.authenticate('bearer', { session: false }),
    filmController.all
);

router.get('/api/:provider/movie/:id',
    passport.authenticate('bearer', { session: false }),
    filmController.film
);

router.post('/api/:provider/movie',
    passport.authenticate('bearer', { session: false }),
    filmController.create
);


module.exports = router;