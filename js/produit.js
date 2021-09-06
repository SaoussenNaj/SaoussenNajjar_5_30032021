// Récupération des parametres dans l'url
const urlParams = new URLSearchParams(location.search);
const id = urlParams.get("id");

// Fonction asynchrone

(async function () {
  // Récupération d'un teddie via l'id récupérer plus haut
  const teddie = await getTeddie(id);

  // Affichage du teddie récupérer dans getTeddie()
  displayTeddie(teddie);
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

// Je clique sur le bouton ajouter au panier

// addEventListener

// 1 : Je récupére l'action du clic

// 2 : Je stop l'event ( Bloquer le rechargement de la page )
// preventDefault

// 3 - 1 : Créer le localstorage :
// localstorage.set ...
// 3-  2: J'ajout le produit dans mon localstorage
// JSON.stringify()

// A voir plus tard :
// 3 .a : Si le localstorage existe :
// 3 .. b : Si le localstorage n'existe pas alors il faut le créer.

// LE LOCALSTORAGE ( MON PANIER )
// Quantité  = 1 / Prix / ID du produit.
