var http = require('http')
var fs = require('fs')

var myserver = http.createServer(function(req,res) {
    var spl = req.url.split('/')
    var num = spl[spl.length-1]
    
    console.log(req.method + ' ' + req.url)
    if(req.method == 'GET'){
        if((parseInt(num,10) > 0) && (parseInt(num,10) < 449)){
            fs.readFile('data/doc' + num + '.xml', (erro, dados)=>{
                if(!erro){
                    res.writeHead(200, {'Content-Type':'text/xml'}) 
                    res.write(dados);
                }
                else {
                    res.writeHead(200, {'Content-Type':'text/plain'}) 
                    res.write('Erro na leitura do ficheiro ' + 'data/doc' + num + '.xml...')
                }
                res.end()  
            });      
        }
        else if(num=="doc2html.xsl"){
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
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'}) 
            res.end('Erro: Pedido não suportado [' + req.url + ']');
        }
    } else {
        res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'}) 
        res.end('Erro: Método não suportado [' + req.method + ']');
    } 
})

myserver.listen(3021); 

console.log("servidor á escuta na porta 3021...");
