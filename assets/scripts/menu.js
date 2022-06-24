let db = firebase.firestore();

function active(){
    let itemArray = document.querySelector('.container').classList
    if(itemArray.contains("active")){
        document.querySelector('.container').classList.remove("active")
    } else{
        document.querySelector('.container').classList.add("active")
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


function detalhes(doc){
    document.querySelector("div#modal").style.display = "flex"
    document.querySelector("#modal>section").innerHTML =  doc
    
    document.querySelector("div#modal").addEventListener("click", hideModal)
}

function hideModal(e){
    if(e.target.id == "modal"){
        document.querySelector("div#modal").style.display = "none"
    }
}
  