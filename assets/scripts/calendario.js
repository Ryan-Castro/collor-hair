let itemSelect = { }
function calendario(){
    db.collection("calendario").get()
    .then(snapshot=>{
        let itens = ``
        let mesBase = Number()
        let data = new Date()
        snapshot.forEach(doc=>{
            let mesAtual = Number(doc.data().data.slice(0,7).replace("-", ""))
            if(mesBase<mesAtual){
                data.setMonth(mesAtual.toString().slice(4,6)-1)
                data.setFullYear(mesAtual.toString().slice(0, 4))
                itens += `<tr><th colspan="4" class="mes">${data.toLocaleString("pt-BR", {month: "long"})} - ${data.toLocaleString("pt-BR", {year: "numeric"})}</th></tr>`
                mesBase = mesAtual
            }
            itens += `  <tr id="${doc.id}" class="${doc.data().status}">
                            <td>${doc.data().data.slice(8,10)} As ${doc.data().hora}</td>
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
    let hora = document.querySelector("#hora").value

    if(data != "" && cliente != "" && local != "" && descricao != ""){ 
        db.collection("calendario").doc(data + Math.random().toString(36).substr(2, 9)).set({
            data, 
            cliente, 
            local, 
            descricao,
            hora,
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
                    <input type="text" name="hora" id="hora" placeholder="Hora">
                    <input type="text" id="cliente" placeholder="Cliente">
                    <input type="text" id="local" placeholder="Local">
                    <textarea id="descricao" placeholder="descrição"></textarea>
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
            hora: snapshot.data().hora,
            cliente: snapshot.data().cliente, 
            local: snapshot.data().local, 
            descricao: snapshot.data().descricao
        }
        let content = ` <input type="button" id="processo" value="Processo" onclick="modal('${snapshot.data().descricao}')">
                        <input type="button" id="fechar" value="Concluido" onclick="fechar('${id}')">
                        <input type="button" id="delet" value="Apagar" onclick="deletar('${id}')">
                        <input type="button" id="alterar" value="Alterar" onclick="alterar()">
                        `

    document.querySelector("div#modalOptions").style.display = "flex"
    document.querySelector("div#modalOptions>section").innerHTML = content
    document.querySelector("div.modal").addEventListener("click", hideModal)
    })
}

function alterar(){
    document.querySelector("div#modalDet").style.display = "flex"
    let alterarConteudo = "<select>"
    for(let obj in itemSelect){
        if(obj != "id"){
            alterarConteudo += `<option value="${obj}">${obj}</option>`
        }
    }
    alterarConteudo+= `</select>
                        <input type="text" id="txtAlt">
                        <input type="date" id="dateAlt">
                        <input type="button" onclick="confirmarAlteracao()" value="confirmar a alteração">`

    
    document.querySelector("#modalDet>section").innerHTML = alterarConteudo
    
    document.querySelector("#modalDet").addEventListener("click", hideModal)
}

function confirmarAlteracao(){
    let select = document.querySelector("select")
    let value = select.options[select.selectedIndex].value
    if(value == "data"){
        var txt = document.querySelector("#dateAlt").value
    }else{
    var txt = document.querySelector("#txtAlt").value
    }

    let alteracao = {} 
    alteracao[value] = txt
    
    db.collection("calendario").doc(itemSelect.id).update(alteracao)
    calendario()
    document.querySelector("div.modal").style.display = "none"
    document.querySelector("div#modalDet").style.display = "none"
}