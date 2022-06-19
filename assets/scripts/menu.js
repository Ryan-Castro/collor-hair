let db = firebase.firestore();

function calendario(){
    db.collection("calendario").get()
    .then(snapshot=>{
        let itens = "<tbody><tr><th>Datas</th><th>cliente</th><th>local</th><th>descrição</th></tr>"
        
        snapshot.forEach(doc=>{
            
            itens += `<tr><td>${doc.data().data}</td><td>${doc.data().cliente}</td><td>${doc.data().local}</td><td><input value="descrição" type="button" onclick="modal('${doc.data().descricao}')"></td></tr>`
            } 
            
            
        )
        itens += "</tbody>"
       document.querySelector("table").innerHTML =  itens
    })
}
  




function more(element){
    console.log(element)
    document.querySelector(".container").classList.add("active")
}

function less(element){
    console.log(element)
    document.querySelector(".container").classList.remove("active")
}

function moreAndLess(element){
    let itemArray = element.classList
    if(itemArray.contains("active")){
        element.classList.remove("active")
    } else{
        element.classList.add("active")
    }
}

function show(element){
    if(document.querySelector(".show")){
        document.querySelector(".show").classList.remove("show")
    }
    document.querySelector("." + element.id).classList.add("show")
    document.querySelector(".container").classList.remove("active")
    
}

function modal(des){
    console.log(des)
}

function enviar(){
    let data = document.querySelector("#data").value
    let cliente = document.querySelector("#cliente").value
    let local = document.querySelector("#local").value
    let descricao = document.querySelector("#descricao").value

    if(data != "" && cliente != "" && local != "" && descricao != ""){ 
        db.collection("calendario").add({
            data, cliente, local, descricao
        }).then(doc=>{
            calendario()
        })
    } else {
        alert("preencha todos os campos")
    }
}