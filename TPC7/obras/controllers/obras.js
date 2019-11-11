var Obra = require('../models/obras')
var mongoose = require('mongoose')

const Obras = module.exports

Obras.listar = () => {
    return Obra
        .find()
        .exec()
}

Obras.listarPeriodo = period => {
    return Obra
        .find({periodo : period })
        .exec()
}

Obras.listarCompositor = comp => {
    return Obra
        .find({compositor : comp })
        .exec()
}

Obras.listarAno = ano => {   
    return Obra
        .find({anoCriacao: { $eq: ano }})
        .exec()
}

Obras.listarCompositores = () => {
    return Obra
        .distinct('compositor')
        .exec()
}