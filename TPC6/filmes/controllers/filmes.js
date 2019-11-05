var Filme = require('../models/filmes')
var mongoose = require('mongoose')

const Filmes = module.exports


// out module.exports.listar = () ...
Filmes.listar = () => {
    return Filme
        .find()
        .exec()
}

Filmes.consultar = id => {
    return Filme
        .findOne({_id : id})
        .exec()
}

Filmes.contar = () => {
    return Filme
        .countDocuments
        .exec()
}

Filmes.inserir = filme =>{
    filme._id = mongoose.Types.ObjectId()
    var filteredCast = filme.cast.filter(function (eli) {
        return eli != '';
    });
    filme.cast = filteredCast;

    var filtered = filme.genres.filter(function (el) {
        return el != '';
    });
    filme.genres = filtered;

    var novo = new Filme(filme)
    return novo.save()
}

Filmes.remover = id => {
    return Filme.deleteOne({_id:id}).exec()
    //return Filme.remove({_id:id}).exec()
}