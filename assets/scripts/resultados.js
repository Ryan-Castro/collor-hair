function resultados(){
    db.collection("concluidos").get()
    .then(snapshot=>{
        let res = Number()
        snapshot.forEach(doc=>{
            res += doc.data().valor
            })
        document.querySelector("div.resultados").innerHTML =  res
    })
}

