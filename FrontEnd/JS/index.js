// Variables //

const gallery = document.querySelector(".gallery")
const portfolio = document.getElementById("portfolio")
const body = document.querySelector("body");
let token = window.localStorage.getItem("Token") // recuperation du Token
let userId = window.localStorage.getItem("userId") // recup de l'Id de l'utilisateur
const editBar = document.querySelector(".editModeBar")
const logOut = document.querySelector(".logout")
const editTitle = document.querySelector(".editTitle")
const editBtn = document.querySelector(".editBtn")



// recuperation du tableau works //
async function getworks(){
    const reponse = await fetch("http://localhost:5678/api/works");
    return await reponse.json()
}

// recuperation des categories //
async function getCategories(){
    const reponse = await fetch("http://localhost:5678/api/categories");
    return await reponse.json()
}

// afficher les works dans le DOM//

async function afficherWorks (){
    gallery.innerHTML = "";
    const arrayWorks = await getworks()
    arrayWorks.forEach((work) => {  
        createWorks(work)
     });          
}

function createWorks(work){
 // creer les elements du DOM // 
 const figure = document.createElement("figure");
 const img = document.createElement("img");
 const figcaption = document.createElement("figcaption");
 // ajouter le contenu de chaque element //
 img.src = work.imageUrl
 figcaption.textContent = work.title
 // preciser l'emplacement des elements crées //
 gallery.appendChild(figure);
 figure.appendChild(img);
 figure.appendChild(figcaption);  
}

//****afficher les boutons filtres****//

// creation du conteneur des boutons dans le dom //

const containerFiltres = document.createElement("div")
containerFiltres.classList.add("container-filtres")
portfolio.insertBefore (containerFiltres , gallery)

// creation des boutons filtres //

async function createBtn (){
    const arrayCategories = await getCategories()
    arrayCategories.unshift({id:0 , name:"Tous"}); //ajout d'un nouvel element au tableau des categories
   
    arrayCategories.forEach((categorie) => {  
        const btn = document.createElement("button")
        btn.classList.add("buttons-filtres")
        btn.id = categorie.id
        btn.textContent = categorie.name
        containerFiltres.appendChild(btn)
     });          
}

// filtrer les works par categorie //

async function filtrerWorks () {
    const arrayWorks = await getworks()
    const buttons = document.querySelectorAll(".buttons-filtres")
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            buttons.forEach(btn => {
                btn.classList.remove("active");
            });
            button.classList.add("active")
            const btnId = e.target.id  
            gallery.innerHTML = ""  
            if (btnId !== "0") {
                const worksFiltres = arrayWorks.filter((work) => {
                    return work.categoryId == btnId
                })
                worksFiltres.forEach(work => {
                    createWorks(work)
                })
            }else 
            afficherWorks()           
        })
    });
}

// page d'accueil mode connecté //

function editMode(){
    if (userId) {
        editBar.style.display = 'block'
        logOut.textContent = "logout"
        body.classList.add("body-padd")
        editBtn.style.display = "block flex"
        editTitle.classList.add("editMarge")
        containerFiltres.style.display = 'none'
    }  else {
        // L'utilisateur n'est pas connecté
        console.log("L'utilisateur n'est pas connecté");
      } 
}

// supprimer le Token apres deconnection //

function logOutUser() {
   logOut.addEventListener("click", () => {
    if (userId){
        window.localStorage.removeItem("Token")
        window.localStorage.removeItem("userId")
        logOut.textContent = "login"
        window.location.href = "index.html"
    }else{
        window.location.replace  ("login.html")
    }  
   })
}

// l'appel des fonctions //
getworks()
getCategories()
afficherWorks()
createBtn()
filtrerWorks()
editMode()
logOutUser()
