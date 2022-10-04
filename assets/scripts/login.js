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
    location.href = "./admin/index.html"
  }).catch(error=>{
    alert("Senha ou Email Errado")
  })
}
console.log(location.pathname)

if (location.pathname == "/collor-hair/login.html") {
  auth.onAuthStateChanged(user => {
    if (user) {
      location.pathname = "/collor-hair/admin/index.html"
      hideLoad()
      console.log("foi")
    }
    hideLoad()
    console.log("foi")

  })
}
if (location.pathname == "/collor-hair/admin/index.html") {
  auth.onAuthStateChanged(user => {
    if (location.pathname != "/collor-hair/login.html" && !user){
      location.pathname = "/collor-hair/login.html"
      hideLoad()
      console.log("foi")
      
    }else{
      hideLoad()
      console.log("foi")
      
    }
    
  })
}


function hideLoad(){
  setInterval(() => {
    document.querySelector("#load").classList.add("hide")
  }, 1000);
}
