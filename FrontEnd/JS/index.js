// Variables //

const gallery = document.querySelector(".gallery")

//importation tableau works //
async function getworks(){
const reponse = await fetch("http://localhost:5678/api/works");
return await reponse.json()
}
getworks()

// afficher les works dans le DOM//
async function afficherWorks (){
    const arrayWorks = await getworks()
    arrayWorks.forEach(work => {
        // creer les elements du DOM // 
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        // preciser l'emplacement des elements crées //
        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        // ajouter le contenu de chaque element //
        img.src = work.imageUrl
        figcaption.textContent = work.title    
     });     
}
afficherWorks()



