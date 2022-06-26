let itemSelect = { }
function calendario(){
    db.collection("calendario").get()
    .then(snapshot=>{
        let itens = ``
        
        snapshot.forEach(doc=>{
            itens += `  <tr id="${doc.id}" class="${doc.data().status}">
                            <td>${doc.data().data}</td>
                            <td>${doc.data().cliente}</td>
                            <td>${doc.data().local}</td>
                            <td><input type="button" value="Detalhes" onclick="detalhes('${doc.id}')"></td>

                        </tr>`
            } 
            
            
        )
       document.querySelector("tbody").innerHTML =  itens
    })
}

function enviar(){
    let data = document.querySelector("#data").value
    let cliente = document.querySelector("#cliente").value
    let local = document.querySelector("#local").value
    let descricao = document.querySelector("#descricao").value

    if(data != "" && cliente != "" && local != "" && descricao != ""){ 
        db.collection("calendario").add({
            data, 
            cliente, 
            local, 
            descricao,
            status: "não-concluido"

        }).then(doc=>{
            calendario()
            document.querySelector("div.modal").style.display = "none"
            
            
        })
    } else {
        alert("preencha todos os campos")
    }
    document.querySelector("#data").value = "" 
    document.querySelector("#cliente").value = "" 
    document.querySelector("#local").value = "" 
    document.querySelector("#descricao").value = ""
}

function fechar(id){
    document.querySelector("div#modalDet").style.display = "flex"
    document.querySelector("#modalDet>section").innerHTML =  `<input type="text" id="valor" placeholder="Custo Final"><input value="Realizado" type="button" onclick="concluir('${id}')">`
}

function concluir(id){
    document.querySelector("div#modalDet").style.display = "none"
    db.collection("concluidos").add({
        valor:  Number(document.querySelector("#valor").value),
        data: itemSelect.data,
        cliente: itemSelect.cliente,
        local: itemSelect.local,
        descricao: itemSelect.descricao,
    }).then(element=>{
        db.collection("calendario").doc(id).update({
            status: "concluido"
        }).then(()=>{
             calendario()
        })
       
    })
}
function deletar(id){
    db.collection("calendario").doc(id).delete().then(()=>{
        document.querySelector("div#modalOptions").style.display = "none"
        calendario()
    })
}

function adicionar(){
    let content = ` <input type="date" name="data" id="data">
                    <input type="text" id="cliente" placeholder="Cliente">
                    <input type="text" id="local" placeholder="Local">
                    <input type="text" id="descricao" placeholder="Descrição">
                    <input type="button" value="Adicionar" onclick="enviar()">`

    document.querySelector("div#modalOptions").style.display = "flex"
    document.querySelector("#modalOptions>section").innerHTML = content
    document.querySelector("div.modal").addEventListener("click", hideModal)
}

function detalhes(id){
    db.collection("calendario").doc(id).get()
    .then(snapshot=>{
        itemSelect = {
            id, 
            data: snapshot.data().data, 
            cliente: snapshot.data().cliente, 
            local: snapshot.data().local, 
            descricao: snapshot.data().descricao
        }
        let content = ` <input type="button" id="processo" value="processo" onclick="modal('${snapshot.data().descricao}')">
                        <input type="button" id="fechar" value="Concluido" onclick="fechar('${id}')">
                        <input type="button" id="delet" value="Apagar" onclick="deletar('${id}')">
                        `

    document.querySelector("div#modalOptions").style.display = "flex"
    document.querySelector("div#modalOptions>section").innerHTML = content
    document.querySelector("div.modal").addEventListener("click", hideModal)
    })
}