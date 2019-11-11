var express = require('express');
var router = express.Router();

const axios = require('axios')

router.get('/', function(req, res, next) {
  if(req.query.periodo){
    axios.get('http://localhost:3021/api/obras?' + 'periodo=' + req.query.periodo)
    .then(dados => {
      res.jsonp(dados.data)
    })
    .catch(erro => {
      res.render('error', {error : erro})
    })  
  } else if(req.query.compositor){
    axios.get('http://localhost:3021/api/obras?' + 'compositor=' + req.query.compositor)
    .then(dados => {
      res.jsonp(dados.data)
    })
    .catch(erro => {
      res.render('error', {error : erro})
    })  
  } else if(req.query.anoCriacao){
    console.log(">>" + req.query.anoCriacao)
    axios.get('http://localhost:3021/api/obras?' + 'anoCriacao=' + req.query.anoCriacao)
    .then(dados => {
      res.jsonp(dados.data)
    })
    .catch(erro => {
      res.render('error', {error : erro})
    })  
  }else {
    axios.get('http://localhost:3021/api/obras')
    .then(dados => {
      res.jsonp(dados.data)
      //res.render('lista-obras', {lista : dados.data});
    })
    .catch(erro => {
      res.render('error', {error : erro})
    })
  }
});

module.exports = router;
