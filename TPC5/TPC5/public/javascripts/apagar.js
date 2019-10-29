function removeAluno(ident){
    console.log('Apagando o aluno ' + ident)
    axios.delete('/alunos/' + ident)
        .then(response => window.location.assign('/alunos'))
        .catch(error => console.log(error))
}

function removeNota(identA, identN){
    console.log('Apagando a nota ' + identN + 'do aluno ' + identA)
    axios.delete('/alunos/' + identA + '/notas/' + identN)
        .then(response => window.location.assign('/alunos/' + identA))
        .catch(error => console.log(error))
}