$(function () {
    var cont = 1
    $("#mais1").click(e=>{
        e.preventDefault()
        cont++
        var campo = $('<div></div>',{class: 'w3-container', id: 'f'+cont})
        var desc = $('<div></div>',{class: 'w3-cell-row', id: 'desc'+cont})
        var descLabel = $('<label class="w3-cell">Descrição:</label>')
        var descInput = $('<input/>',{class: 'w3-input w3-cell', type: 'text', name:"desc"})
        var ficheiro = $('<div></div>',{class: 'w3-cell-row', id: 'ficheiro'+cont})
        var ficheiroLabel = $('<label class="w3-cell">Ficheiro:</label>')
        var ficheiroInput = $('<input/>',{class: 'w3-input w3-cell', type: 'file', name:"ficheiro"})
        $("#lista").append(campo)
        $("#f" + cont).append(desc)
        $("#desc" + cont).append(descLabel,descInput)
        $("#f" + cont).append(ficheiro)
        $("#ficheiro" + cont).append(ficheiroLabel,ficheiroInput)
    })
})

function show_me(linha, f){
    var ficheiro = $('<h1>Name: ' + f.name + '</h1>\n<h3>Type: ' + f.mimetype + '</h3>\n<h3>Size: ' + f.size + '</h3>')
    
    //var ficheiro = $('<pre>' + JSON.stringify(f) + '</pre>')
    $('#display').empty()
    $('#display').append(ficheiro)
    
    var tipo = f.mimetype
    if(tipo.startsWith('image')) {
        $('#display').load(f.path)
        $('#display').append($('<img>', {id : 'image',src : '/images/' + f.name, width: '400'}))
    }
    $('#display').modal()
}