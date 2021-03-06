const express = require('express');
const router = express.Router();
const axios = require('axios')
const lhost = require('../config/env').host
const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res) {
  axios.get(lhost + '/api/ficheiros')
    .then(dados => {
      res.render('index', {lista: dados.data});
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})

module.exports = router;