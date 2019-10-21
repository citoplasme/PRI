var http = require('http')
var fs = require('fs')

var myserver = http.createServer(function(req,res) {
    var partes = req.url.split('/')
    var pag = partes[partes.length-1]
    
    console.log(req.method + ' ' + req.url)
    console.log(pag)
    
    if(req.method == 'GET'){
        if(parseInt(pag,10) < 449){
            fs.readFile('data/doc' + pag + '.xml', (erro, dados)=>{
                if(!erro){
                    res.writeHead(200, {'Content-Type':'text/xml'}) 
                    res.write(dados);
                }
                else {
                    res.writeHead(200, {'Content-Type':'text/plain'}) 
                    res.write('Erro na leitura do ficheiro ' + 'data/doc' + pag + '.xml...')
                }
                res.end()  
            });      
        }
        else if(pag=="doc2html.xsl"){
            fs.readFile('doc2html.xsl', (erro, dados)=>{
                if(!erro){
                    res.writeHead(200, {'Content-Type':'text/xml'}) 
                    res.write(dados);
                }
                else {
                    res.writeHead(200, {'Content-Type':'text/plain'}) 
                    res.write('Erro na leitura do doc2html.xsl...')
                }
                res.end()  
            });
        }
        else if(req.url == '/w3.css'){
            fs.readFile('w3.css', (erro, dados)=>{
                if(!erro){
                    res.writeHead(200, {'Content-Type':'text/css'}) 
                    res.write(dados);
                }
                else {
                    res.writeHead(200, {'Content-Type':'text/plain'}) 
                    res.write('Erro na leitura do CSS...')
                }
                res.end()  
            });
        }
        else{
            res.end('Erro: Pedido não suportado [' + req.url + ']');
        }
    } else {
        res.end('Erro: Método não suportado [' + req.method + ']');
    } 
})

myserver.listen(3021); 

console.log("servidor á escuta na porta 3021...");