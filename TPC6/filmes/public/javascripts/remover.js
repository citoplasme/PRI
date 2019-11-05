function removeFilme (ident){
	console.log('Deleting ' + ident)
	
	axios.delete('api/filmes/' + ident)
		.then(response=> window.location.assign('/'))
		.catch(error=>console.log(error))
}