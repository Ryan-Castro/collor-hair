function calendario(){
    db.collection("calendario").get()
    .then(snapshot=>{
        let itens = `   <thead>
                            <tr>
                                <th>Concluir</th>
                                <th>Datas</th>
                                <th>Cliente</th>
                                <th>Local</th>
                                <th>Descrição</th>
                                <th>Apagar</th>
                            </tr>
                        </thead>
                        <tbody>`
        
        snapshot.forEach(doc=>{
            let id = doc.id
            let data = doc.data().data
            let cliente = doc.data().cliente
            let local = doc.data().local
            let descricao = doc.data().descricao
            itens += `  <tr id="${doc.id}" class="${doc.data().status}">
                            <td><input value="Realizado" type="button" onclick="fechar('${id}', '${data}', '${cliente}', '${local}', '${descricao}')"></td>
                            <td>${data}</td>
                            <td>${cliente}</td>
                            <td>${local}</td>
                            <td><input value="descrição" type="button" onclick="modal('${descricao}')"></td>
                            <td><input value="Apagar" type="button" onclick="deletar('${id}')"></td>
                        </tr>`
            } 
            
            
        )
        itens += "</tbody>"
       document.querySelector("table").innerHTML =  itens
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
            
            
        })
    } else {
        alert("preencha todos os campos")
    }
    document.querySelector("#data").value = "" 
    document.querySelector("#cliente").value = "" 
    document.querySelector("#local").value = "" 
    document.querySelector("#descricao").value = ""
}

function fechar(id, data, cliente, local, descricao){
    document.querySelector("div#modal").style.display = "flex"
    document.querySelector("#modal>section").innerHTML =  `<input type="text" id="valor" placeholder="Custo Final"><input value="Realizado" type="button" onclick="concluir('${id}', '${data}', '${cliente}', '${local}', '${descricao}')">`
}

function concluir(id, data, cliente, local, descricao){
    document.querySelector("div#modal").style.display = "none"
    db.collection("concluidos").add({
        valor:  Number(document.querySelector("#valor").value),
        data,
        cliente,
        local,
        descricao,
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
         calendario()
    })
}

function adicionar(){
    let content = ` <input type="date" name="data" id="data">
                    <input type="text" id="cliente" placeholder="Cliente">
                    <input type="text" id="local" placeholder="Local">
                    <input type="text" id="descricao" placeholder="Descrição">
                    <input type="button" value="Adicionar" onclick="enviar()"></input>`

    document.querySelector("div#modal").style.display = "flex"
    document.querySelector("div#modal>section").innerHTML = content
    document.querySelector("div#modal").addEventListener("click", hideModal)
}