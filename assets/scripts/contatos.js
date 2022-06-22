function contatos(){
    db.collection("contatos").get()
    .then(snapshot=>{
        let lista = `<ul>`
        snapshot.forEach(doc=>{
            let contato = doc.data()
            lista += `<li onclick="detalhes('${contato.email}')">${doc.id}</li>`
            })
        lista += `</ul>`
        document.querySelector("div.contatos").innerHTML =  lista
    })
}

