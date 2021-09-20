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

// ETAPE 2 Récupérer le parametre (id) de la page  :

// http://127.0.0.1:5500/produit.html?id=5be9c8541c9d440000665243

// 1 : Je récupére un id qui se trouve dans l'url

// 2 : Je récupère les données via l'id
function getTeddie() {
  return fetch("http://localhost:3000/api/teddies/" + id).then((responseHttp) =>
    responseHttp.json()
  );
}

// 3 : Afficher les données au front

function displayTeddie(teddie) {
  document.getElementById("productName").innerHTML = teddie.name;
  document.getElementById("productColor").innerHTML = teddie.colors;
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
  // //-----Déclaration de la variable "produitsEnregistresLocalStorage dans laquelle on met  key et value qui sont dans le localStorage
  let produitsEnregistresLocalStorage = JSON.parse(
    localStorage.getItem("panier")
  );
  // console.log(produitsEnregistresLocalStorage);

  // Fenetre pop-up de confirmation
  // function popupConfirmation() {
  //   if (
  //     window.confirm(
  //       `Votre article a bien été enregistré, voulez vous continuer ou annuler?`
  //     )
  //   ) {
  //     window.location.href = "panier.html";
  //   } else {
  //     window.location.href = "index.html";
  //   }
  // }

  // fonction pour modifier quantite
  function updateQte(produit, quantiteAajouter) {
    produit.quantiteproduit += quantiteAajouter;
    return produit;
  }

  // --- Si le panier existe déjà dans le localstorage et si l'id produit existe aussi :

  if (produitsEnregistresLocalStorage) {
    let produitExist = false;
    // Parcourir le tableau produit pour chercher si id existe ou pas
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
    // Si le produit n'existe pas dans le localStorage, on l'ajoute:
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

    // popupConfirmation();

    // --- Si le produit n'existe pas dans le localstorage :
  } else {
    let produitsEnregistresLocalStorage = [];
    produitsEnregistresLocalStorage.push(optionProduit);
    localStorage.setItem(
      "panier",
      JSON.stringify(produitsEnregistresLocalStorage)
    );
    // console.log(produitsEnregistresLocalStorage);
    // popupConfirmation();
  }
});
