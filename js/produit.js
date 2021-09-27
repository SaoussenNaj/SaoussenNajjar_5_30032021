// Récupération des parametres dans l'url
const urlParams = new URLSearchParams(location.search);
const id = urlParams.get("id");
let selectedTeddie;

// Fonction asynchrone
(async function () {
  // --Récupération d'un teddie via l'id récupérer plus haut
  const teddie = await getTeddie(id);
  // --Affichage du teddie récupérer dans getTeddie()
  displayTeddie(teddie);
  selectedTeddie = teddie;
})();

// ETAPE 2: 
// 1 : Je récupére un id qui se trouve dans l'url
// 2 : Je récupère les données via l'id
function getTeddie() {
  return fetch("http://localhost:3000/api/teddies/" + id).then((responseHttp) =>
    responseHttp.json()
  );
}

// 3 : Afficher les données au front
function displayTeddie(teddie) {
  // affichage dynamique de la liste des couleurs du produit:
  for (let i = 0; i < teddie.colors.length; i++) {
    document.getElementById(
      "color"
    ).innerHTML += `<option>${teddie.colors[i]}</option>`;
  }
  document.getElementById("productName").innerHTML = teddie.name;
  document.getElementById("productDescription").innerHTML = teddie.description;
  document.getElementById("productPrice").innerHTML = teddie.price / 100 + " €";
  document.getElementById("productImage").src = teddie.imageUrl;
}

// Declaration d'une variable qte pour la valeur "quantite" saisie par l'utilisateur
let qte = 1;
// Ajout d'un eventListener quand la quantite change
let a = document.getElementById("qte");
a.addEventListener(
  "change",
  function () {
    qte = this.value;
  },
  false
);
// 1 : Je récupére l'action du clic sur le bouton ajouter au panier
const btn = document.getElementById("btnAjout");
// J'écoute l'évènement
btn.addEventListener("click", function (event) {
  // 2 : Je stop l'event ( Bloquer le rechargement de la page )
  event.preventDefault();

  //---- Déclaration de l'ensemble des variables qui seront enregistrés dans le localStorage:
  let optionProduit = {
    idProduit: selectedTeddie._id,
    nomProduit: selectedTeddie.name,
    prixProduit: selectedTeddie.price / 100,
    quantiteproduit: parseInt(qte),
    lienImage: selectedTeddie.imageUrl,
  };
  console.log(optionProduit);
  // //-----Déclaration de la variable "produitsEnregistresLocalStorage dans laquelle on met "key" et "value" qui se trouvent dans le localStorage-----
  let produitsEnregistresLocalStorage = JSON.parse(
    localStorage.getItem("panier")
  );
 // Fenetre pop-up de confirmation
  function popupConfirmation() {
    if (window.confirm(`Votre article a bien été ajouté au panier.`)) {
      // window.location.href = "produit.html";
    }
  }
// fonction pour modifier quantite
  function updateQte(produit, quantiteAajouter) {
    produit.quantiteproduit += quantiteAajouter;
    return produit;
  }

  // --- Si le panier existe déjà dans le localstorage et si l'id produit existe aussi :
  if (produitsEnregistresLocalStorage) {
    let produitExist = false;
    //1. Parcourir le tableau produit pour chercher si id existe ou pas, s'il existe on fait l'update de la qte
    for (i = 0; i < produitsEnregistresLocalStorage.length; i++) {
      if (
        produitsEnregistresLocalStorage[i].idProduit === optionProduit.idProduit
      ) {
        produitExist = true;
        produitsEnregistresLocalStorage[i] = updateQte(
          produitsEnregistresLocalStorage[i],
          optionProduit.quantiteproduit
        );
      }
    }
    // Si l'id produit n'existe pas dans le localStorage, on ajoute le produit:
    if (produitExist === false) {
      produitsEnregistresLocalStorage.push(optionProduit);
      localStorage.setItem(
        "panier",
        JSON.stringify(produitsEnregistresLocalStorage)
      );
    } else {
      localStorage.setItem(
        "panier",
        JSON.stringify(produitsEnregistresLocalStorage)
      );
    }
    popupConfirmation();

    // --- Si le produit n'existe pas dans le localstorage on le push dans le localstorage :
  } else {
    let produitsEnregistresLocalStorage = [];
    produitsEnregistresLocalStorage.push(optionProduit);
    localStorage.setItem(
      "panier",
      JSON.stringify(produitsEnregistresLocalStorage)
    );
    popupConfirmation();
  }
});
