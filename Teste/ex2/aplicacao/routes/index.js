var express = require('express');
var router = express.Router();
var axios = require('axios')

var apikey = "?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ"

/* 
- Na página inicial, para além de um título e outra informação de contexto, deverá aparecer a lista de tipologias;

- Todos os campos de informação com códigos de entidades, tipologias ou outros devem ser transformados em links com as chamadas à API respetivas;

- Na página de cada tipologia, deve ser mostrada a informação base da tipologia, a lista de entidades de que é composta, os processos em que é dona e os processos em que é participante;

- Em todas as páginas deverá haver um link para voltar à página inicial e outro para a página anterior (nos casos em que justifique);

- Usa a tua imaginação e criatividade...
 */
router.get('/', function(req, res) {
  axios.get('http://clav-api.dglab.gov.pt/api/tipologias' + apikey)
    .then(dados => res.render('index', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

router.get('/entidades/:id', function(req, res) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + apikey)
    .then(dados => res.render('entidade', {ent: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

router.get('/processos/:id', function(req, res) {
  axios.get('http://clav-api.dglab.gov.pt/api/tipologias' + apikey)
    .then(dados => res.render('index', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

router.get('/', function(req, res) {
  axios.get('http://clav-api.dglab.gov.pt/api/tipologias' + apikey)
    .then(dados => res.render('index', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

router.get('/:id', function(req, res) {
  /*axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + apikey)
    .then(dados => res.render('individual', {item: dados.data}))
    .catch(e => res.render('error', {error: e}))
*/
  axios.all([
      axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + apikey),
      axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + '/elementos' + apikey),
      axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + '/intervencao/dono' + apikey),
      axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + '/intervencao/participante' + apikey)
    ])
    .then(axios.spread((id, elementos, dono, participante) => {
      res.render('individual', {item: id.data, elem : elementos.data, owner : dono.data, part : participante.data})
    }));

});

module.exports = router;
