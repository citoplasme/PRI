const express = require('express')
const router = express.Router()

var Obras = require('../controllers/obras')

router.get('/obras', function (req,res) {
    if(req.query.periodo){
        Obras.listarPeriodo(req.query.periodo)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro)) 
    } else if(req.query.compositor){
        Obras.listarCompositor(req.query.compositor)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro)) 
    } else if(req.query.anoCriacao){
        console.log(req.query.anoCriacao)
        Obras.listarAno(req.query.anoCriacao)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro)) 
    } else {
        Obras.listar()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
})

router.get('/compositores', function (req,res) {
    Obras.listarCompositores()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

router.get('/compositores/:nome', function (req,res) {
    Obras.listarCompositor(req.params.nome)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router