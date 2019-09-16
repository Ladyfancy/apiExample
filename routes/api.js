const express = require('express');
const router  = express.Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000"`)
  .then(allPokes => {
    console.log("all the pokes ====>>>>>", allPokes.data);
    res.render ('apiViews/apiHome');
  })
    .catch(err => next(err));
  });



router.get('/poke/:pokeId', (req, res, next) => {
  //                |
  //                ------------------------------------------
  //                                                          |
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.pokeId}`)
  .then(responseFromAPI => {
    console.log("><>><<<><><><><><> ", responseFromAPI.data);

    data = {
      pokes: responseFromAPI.data,
      loadedInfo: true
    };

    if(!responseFromAPI.data.name.includes('saur')) {
      data.loadedInfo = false;
    }

    res.render('apiViews/apiHome', data);
  }).catch(err => next(err));
});

module.exports = router;
