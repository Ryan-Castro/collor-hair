const firebaseConfig = {
    apiKey: "AIzaSyB6VxOUJegUH04tv8VXrcwbf_134ilKRj0",
    authDomain: "collor-hair.firebaseapp.com",
    projectId: "collor-hair",
    storageBucket: "collor-hair.appspot.com",
    messagingSenderId: "1037215701068",
    appId: "1:1037215701068:web:4295756c7adff8ae61fce9",
    measurementId: "G-7BECSXQ0L9"
  };
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();

  function adicionar(){
    let nome = document.querySelector('#nome').value
    let email = document.querySelector('#email').value
    let tel =  document.querySelector('#tel').value
    let existente = false

    if(nome != ""){
        document.querySelector('.error').style.display = "none"
        if(email != "" || tel != ""){
            db.collection("contatos").get().then((snapshot) => {
                snapshot.forEach(element => {
                    if(element.data().tel == tel && tel != "" || element.data().email == email && email != ""){
                        existente = true
                    }
                }) 
                if(existente){
                    alert('Contato já existente')
                } else {
                    if(tel == ""){
                        tel = "numero não indentificado"
                    }
                    if(email == ""){
                        email = "email não indentificado"
                    }
                    db.collection("contatos").doc(nome + Math.random().toString(36).substr(2, 9)).set({
                    nome,
                    email,
                    tel
            }).then(doc=>{
                document.querySelector(".adicionado").style.display = "flex"
                document.querySelector('.adicionado').innerHTML = "Contato salvo com sucesso"
            })
        };
            })
           
        } else {
            document.querySelector('.error').style.display = "flex"
            document.querySelector('.error').innerHTML = "Digite ou o nome ou o seu email, ele vai servir para encontrar você"
        }
    } else {
        document.querySelector('.error').style.display = "flex"
        document.querySelector('.error').innerHTML = "Digite seu nome, ele vai servir para salvar em nossa agenda"
    }
  }