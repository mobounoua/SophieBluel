//*variables*//
const form = document.querySelector("form")
const email = document.getElementById("email")
const password = document.getElementById("password")
const errorLog = document.querySelector(".errorLogin")

form.addEventListener ("submit", (e) => {
    e.preventDefault();
    const userEmail = email.value
    const userPassword = password.value
    const login ={
        email : userEmail,
        password : userPassword,
    }
    const user = JSON.stringify(login)

    fetch("http://localhost:5678/api/users/login",{
        method: "POST" , 
        headers : {"Content-Type" : "application/json"},
        body : user
    })
    .then((response) => {
        if (!response.ok){
            email.classList.add("errorInput")
            password.classList.add("errorInput")
            errorLog.textContent =  "L'identifiant ou le mot de passe que vous avez fourni est incorrect."
            throw new Error ("L'identifiant ou le mot de passe que vous avez fourni est incorrect.")
        }
        return response.json()
    }).then ((data) =>{
        window.localStorage.setItem("Token" , data.token)
        window.localStorage.setItem("userId", data.userId);
        window.location.replace ("index.html");
    }).catch(error => {
        console.error('Un problème est survenu: ', error);
      });
})