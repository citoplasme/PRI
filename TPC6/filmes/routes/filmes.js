var express = require('express');
var router = express.Router();
const axios = require('axios')

router.get('/', function(req, res, next) {
  axios.get('http://localhost:3004/api/filmes')
    .then(dados => {
      res.render('lista-filmes', {lista : dados.data});
    })
    .catch(erro => {
      res.render('error', {error : erro})
    })
});

router.get('/inserir', function(req, res, next){
  res.render('form-filme');
})

router.get('/:id', function(req, res, next) {
  axios.get('http://localhost:3004/api/filmes/' + req.params.id)
    .then(dados => {
      res.render('individual', {item : dados.data});
    })
    .catch(erro => {
      res.render('error', {error : erro})
    })
});

router.post('/', function(req, res){
  axios.post('http://localhost:3004/api/filmes', req.body)
    .then(dados => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error : erro})
    })
})

router.delete('/:id', function(req, res, next){
  axios.delete('http://localhost:3004/api/filmes/' + req.params.id)
  .then(dados => {
    res.redirect(303,'/')
  })
  .catch(erro => {
    res.render('error', {error : erro})
  })
})

module.exports = router;
