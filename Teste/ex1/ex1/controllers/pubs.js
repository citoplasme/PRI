var Pub = require('../models/pubs')
var mongoose = require('mongoose')

module.exports.listar = () => {
    return Pub
        .find() //.find({},{_id : 1, category : 1, year : 1})
        .exec()
}

module.exports.consultar = ident => {
    return Pub
        .findOne({id: ident})
        .exec()
}

// Types
module.exports.tipos = () => {
    return Pub
        .distinct("type")
        .exec()
}

// Filtrar Genero
module.exports.filtrartype = (tipo) => {
    return Pub
        .find({type:tipo})
        .exec()
}

// Filtrar Genero e Data
module.exports.filtrarambos = (tipo, ano) => {
    return Pub
        .find({type : tipo, year : {$gt : ano}})
        .exec()
}
// Autores
module.exports.autores = () => {
    return Pub
        .distinct("authors.element")
        .exec()
}

module.exports.pubsautor = (name) => {
    return Pub
        .aggregate([{$unwind:"$authors.element"},
            {$project:{name: "$authors.element",pub:{booktile:"$booktitle",title:"$title", year: "$year"}}}, 
            {$group:{_id:"$name",pubs:{$push:"$pub"}}},
            {$sort:{_id:1}},
            {$match: {_id : name}}
        ])
        .exec();
}