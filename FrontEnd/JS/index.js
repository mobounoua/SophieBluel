// Variables //

const gallery = document.querySelector(".gallery")
const portfolio = document.getElementById("portfolio")

// recuperation du tableau works //
async function getworks(){
    const reponse = await fetch("http://localhost:5678/api/works");
    return await reponse.json()
}
getworks()

// recuperation des categories //
async function getCategories(){
    const reponse = await fetch("http://localhost:5678/api/categories");
    return await reponse.json()
}
getCategories()

// afficher les works dans le DOM//

async function afficherWorks (){
    const arrayWorks = await getworks()
    arrayWorks.forEach((work) => {  
        createWorks(work)
     });          
}
afficherWorks()

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

//afficher les boutons filtres//

async function createBtn (){
    const arrayCategories = await getCategories()
    arrayCategories.unshift({id:0 , name:"Tous"}); //ajout d'un nouvel element au tableau des categories

    const containerFiltres = document.createElement("div")
    containerFiltres.classList.add("container-filtres")
    portfolio.insertBefore (containerFiltres , gallery)
   
    arrayCategories.forEach((categorie) => {  
        const btn = document.createElement("button")
        btn.classList.add("buttons-filtres")
        btn.id = categorie.id
        btn.textContent = categorie.name
        containerFiltres.appendChild(btn)
     });          
}
createBtn()

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
filtrerWorks()