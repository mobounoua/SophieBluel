////* VARIABLES *////
const modal = document.getElementById("modal")
const xmark = document.querySelector('.modal-portfolio .fa-xmark')
const xmark2 = document.querySelector('.modalAddWork .fa-xmark')
const modalGallery = document.querySelector(".modal-gallery")
// variables pour afficher la 2eme modale//
const buttonAddPhoto = document.getElementById("btnAdd")
const modalPortfolio = document.querySelector(".modal-portfolio")
const modalAddWork = document.querySelector(".modalAddWork")
const arrowLeft = document.querySelector('.fa-arrow-left')
// variables pour l'apreçu de l'image //
const previewImg = document.getElementById("previewImage")
const inputFile = document.querySelector(".containerAddPhoto input")
// variables pour l'ajout des photos //
const formAdd = document.getElementById("formAddWork")


//* afficher la modale *//

function displayModal () {
    const editBtn = document.querySelector(".editBtn")
    editBtn.addEventListener("click", () => {
        modal.style.display = "flex"
    })
}
displayModal()

// fermer la modale //
function closeModal () {
    xmark.addEventListener("click", () => {
        modal.style.display = "none"
    })
    xmark2.addEventListener("click", () => {
        inputFile.value = "";
        previewImg.style.display = "none";
        modal.style.display = "none"
    })
    modal.addEventListener("click" , (e) => {   
        if (e.target == modal) {
            modal.style.display = "none";
            inputFile.value = "";
            previewImg.style.display = "none";
        }
    })
}
closeModal()

// afficher la gallerie dans la modale //

async function afficherWorkModal () {
    modalGallery.innerHTML = "";
    const arrayWorks = await getworks()
    arrayWorks.forEach((work) => {  
    createWorkModal(work)
    })
    deleteWork()  
}
afficherWorkModal()

function createWorkModal (work) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const span = document.createElement("span")
    const trash = document.createElement("i")
    trash.id = work.id
    img.src = work.imageUrl
    img.alt = work.title
    trash.classList.add( "fa-solid" ,"fa-trash-can")
    modalGallery.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(span)
    span.appendChild(trash)
}

// supprimer work a partir de la poubelle //
function deleteWork () {
    const trashs = document.querySelectorAll(".fa-trash-can")
    trashs.forEach((trash) => {
        trash.addEventListener("click" , (e) =>{
            e.preventDefault()                    
            const id = e.target.id     
            fetch ("http://localhost:5678/api/works/"+id ,{
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer "+token}
            })
            .then((response)=>{
                return response.json    
            }).then((data) =>{
                afficherWorkModal ()
                afficherWorks()
            })
        })
    });
}

// Afficher la 2eme modale //
function displayAddModal () {
    buttonAddPhoto.addEventListener('click' , () =>{
        modalPortfolio.style.display = "none"
        modalAddWork.style.display = "flex"
    })
}
displayAddModal()
//retourner à la modale precedente//
function returnModalPortfolio () {
    arrowLeft.addEventListener("click" ,() => {
        inputFile.value = "";
        previewImg.style.display = "none";
        modalPortfolio.style.display = "flex"
        modalAddWork.style.display = "none"
    })
}
returnModalPortfolio()

// previsualisation de l'image //
function prevImg () {
    inputFile.addEventListener("change" , ()=> {
        const file = inputFile.files[0];
        if (file) {
            // Créez un objet URL pour le fichier
            const imageURL = URL.createObjectURL(file);        
            // Affichez  l'aperçu
            previewImg.src = imageURL;
            previewImg.style.display = "block";
        }else {
            previewImg.style.display = "none";
        }
    }
)}
prevImg()

// generer le menu catégories  //
async function categoryModal(){
    const select = document.getElementById("categoryInput")
    const categories = await getCategories();
    categories.forEach(category => {
        const option = document.createElement("option")
        option.value = category.id
        option.textContent = category.name
        select.appendChild(option)
    });
}
categoryModal()

// ajouter des photos //
function addwork() {
    formAdd.addEventListener("submit", (e) =>{
        e.preventDefault()
        const formData = new FormData(formAdd);
        fetch ("http://localhost:5678/api/works" ,{
            method : "POST",
            headers : {
                Authorization : "Bearer "+token},
            body : formData
            })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi du fichier");
            }
            return response.json ()  
        }).then((data) =>{
            afficherWorkModal()
            afficherWorks()
            formAdd.reset()
        })
        
    })      
}
addwork()
