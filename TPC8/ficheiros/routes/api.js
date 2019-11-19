const express = require('express');
const router = express.Router();
const fs = require('fs')
var Ficheiros = require('../controllers/ficheiros')
var Ficheiro = require('../models/ficheiro')
var ncp = require('ncp').ncp;
ncp.limit = 16;

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

/* GET da lista de ficheiros */
router.get('/ficheiros', function(req, res) {
    Ficheiros.listar()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

// router.post('/ficheiros', upload.single('ficheiro'), function(req,res){
router.post('/ficheiros', upload.array('ficheiro'), function(req,res){
    for(var i = 0; i < req.files.length; i++){
        console.log(req.body.desc)
        console.log(req.body.desc[i])
        console.log(req.files[i])
        var oldPath = __dirname + '/../' + req.files[i].path
        var newPath = __dirname + '/../data/' + req.files[i].originalname
        
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err
        })

        // It needs to be saved in public/images
        if(req.files[i].mimetype.startsWith('image')){
            var imagePath = __dirname + '/../public/images/' + req.files[i].originalname
            ncp(newPath, imagePath, function (err) {
                if (err) {
                  console.error(err);
                }
                console.log('Done!');
            });
            
        }

        var data = new Date()

        var novoFicheiro = new Ficheiro(
            { 
                data: data.toISOString(),
                desc: req.body.desc[i],
                name: req.files[i].originalname,
                path: newPath, 
                mimetype: req.files[i].mimetype, 
                size: req.files[i].size
            });
        
        novoFicheiro.save(function (err, ficheiro) {
            if (err) console.log('Error: ' + err)
            else
                console.log(ficheiro.name + ' was saved successfully')
        })
    }
    res.redirect('/')
})

module.exports = router;