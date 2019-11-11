var express = require('express');
var router = express.Router();

const axios = require('axios')

router.get('/', function(req, res, next) {
  axios.get('http://localhost:3021/api/compositores')
    .then(dados => {
      res.jsonp(dados.data)
    })
    .catch(erro => {
      res.render('error', {error : erro})
  })
})  

router.get('/:nome', function(req, res, next) {
  axios.get('http://localhost:3021/api/compositores/' + req.params.nome)
    .then(dados => {
      res.jsonp(dados.data)
    })
    .catch(erro => {
      res.render('error', {error : erro})
  })
})  

module.exports = router;
