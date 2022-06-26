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


function modal(doc){
    document.querySelector("div#modalDet").style.display = "flex"
    document.querySelector("#modalDet>section").innerHTML =  doc
    
    document.querySelector("#modalDet").addEventListener("click", hideModal)
}

function hideModal(e){
    let element = this
    if(e.target.classList == "modal"){
        element.innerHTML =  '<section></section>'
        element.style.display = "none"
    }
}
  