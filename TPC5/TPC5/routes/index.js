var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')

var myBD = __dirname + "/../data/alunos.json"
console.log(myBD)

/* GET home page. */
router.get('/alunos', function(req, res, next) {
  jsonfile.readFile(myBD, (erro, dados) => {
    if(!erro){
        res.render('index',{lista : dados})
    } else {
        res.render('error', {error:erro})
    }
  })
});

/* GET one student. */
router.get('/alunos/:idAluno', function (req,res){
  var id = req.params.idAluno;
  jsonfile.readFile(myBD, (erro,alunos) => {
  if(!erro){
    var index = alunos.findIndex(c => c.identificador == id)
    if(index > -1){
      var aluno = alunos[index]
      console.log(aluno)
      res.render('individual',{item : aluno})
   } else {
      console.log('Erro: Aluno não encontrado...')
      res.render('error', {error:erro})
      }
    }
  })
});

/* POST a new student. */
router.post('/alunos' , function (req,res) {
  var registo = req.body
  jsonfile.readFile(myBD, (erro,alunos)=> {
    if(!erro){
      registo.notas = [];
      alunos.push(registo)
      jsonfile.writeFile(myBD,alunos,erro =>{
        if(erro) console.log(erro)
        else console.log('Sucesso na gravação do aluno.')
      })
    }
    res.render('index',{lista : alunos})
  })
});

/* POST a new grade for a student. */
router.post('/alunos/:idAluno/notas' , function (req,res) {
  var id = req.params.idAluno;
  var nota = req.body
  jsonfile.readFile(myBD, (erro,alunos)=> {
    if(!erro){
      var index = alunos.findIndex(c => c.identificador == id)
      if(index > -1){
        var aluno = alunos[index]
        alunos.splice(index,1)
        console.log(aluno)
        aluno.notas.push(nota)
        alunos.push(aluno)
        jsonfile.writeFile(myBD,alunos,erro =>{
          if(erro) console.log(erro)
          else console.log('Sucesso na gravação da nota.')
        })
      }
    }
    res.render('individual',{item : aluno})
  })
});

/* DELETE a student. */
router.delete('/alunos/:idAluno', function (req,res){
  var id = req.params.idAluno
  jsonfile.readFile(myBD, (erro,alunos) => {
  if(!erro){
  var index = alunos.findIndex(c => c.identificador == id)
  if(index > -1){
    alunos.splice(index,1)
    jsonfile.writeFile(myBD, alunos, erro =>{
      if(erro) console.log(erro)
      else console.log('Alunos removido com sucesso')
      })
   } else {
    console.log('Erro: Elemento não encontrado')
      }
    }
    res.render('index',{lista : alunos})
  })
});

/* DELETE a grade from a student. */
router.delete('/alunos/:idAluno/notas/:idNota', function (req,res){
  var id = req.params.idAluno
  var idNota = req.params.idNota
  jsonfile.readFile(myBD, (erro,alunos) => {
  if(!erro){
  var index = alunos.findIndex(c => c.identificador == id)
  if(index > -1){
    var aluno = alunos[index]
    var indexN = aluno.notas.findIndex(c => c.indicador == idNota)
    if(indexN > -1){
      aluno.notas.splice(indexN, 1) // Remove a nota
      alunos.splice(index, 1) // Remove o aluno
      alunos.push(aluno) // Adiciona o aluno atualizado
      jsonfile.writeFile(myBD, alunos, erro =>{
        if(erro) console.log(erro)
        else console.log('Nota removida com sucesso.')
        })
    }else {
      console.log('Erro: Nota não encontrada')
    }
   } else {
    console.log('Erro: Aluno não encontrado')
      }
    }
    res.render('individual',{item : aluno})
  })
});

module.exports = router;
