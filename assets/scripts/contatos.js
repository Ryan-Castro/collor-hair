function contatos(){
    db.collection("contatos").get()
    .then(snapshot=>{
        let lista = `<ul>`
        snapshot.forEach(doc=>{
            let contato = doc.data()
            let nomeTemp =  contato.nome
            let emailTemp = contato.email
            let telTemp = contato.tel

            lista += `<li class="card">
                        <h2>Nome:</h2>
                        <p>${nomeTemp}</p>
                        <h2>Email:</h2>
                        <p>${emailTemp}</p>
                        <h2>Telefone:</h2>
                        <p>${telTemp}</p>
                        </li>`
            })
        lista += `</ul>`
        document.querySelector("div.contatos").innerHTML =  lista
    })
}