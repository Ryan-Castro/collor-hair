//iniciando fire base
//------------------------------
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

let auth = firebase.auth()
//---------------------------------
//login
//------------------------------
function login(){
  let userEmail = document.querySelector("#email").value
  let userPassoword = document.querySelector("#password").value



  auth.signInWithEmailAndPassword(userEmail, userPassoword)
  .then(loggedUser => {
    location.href = "./admin/calendario.html"
  }).catch(error=>{
    alert("Senha ou Email Errado")
  })
}
//------------------------------
//verificação
//------------------------------

if(location.href == "https://ryan-castro.github.io/collor-hair/login.html"){
  auth.onAuthStateChanged(user=>{
    if(user){
      location.href ="https://ryan-castro.github.io/collor-hair/admin/calendario.html"
      hideLoad()
    }
  } )
}else{
  hideLoad()
}
 if(location.href != "https://ryan-castro.github.io/collor-hair/login.html"){
  auth.onAuthStateChanged(user=>{
    if(user){
      hideLoad()
    }else if(location.href != "https://ryan-castro.github.io/collor-hair/login.html"){
      location.href = "https://ryan-castro.github.io/collor-hair/login.html"
      hideLoad()
    }
  } )
}else{
  hideLoad()
}
//------------------------------

console.log(location.href)

function hideLoad(){
  setInterval(() => {
    document.querySelector("#load").classList.add("hide")
  }, 1000);
}
