//-----Déclaration de la varriable "produitsEnregistresLocalStorage dans laquelle on met  key et value qui sont dans le localStorage
let produitsEnregistresLocalStorage = JSON.parse(
  localStorage.getItem("panier")
);
// console.log(produitsEnregistresLocalStorage);

//----------Affichage produit panier------------
const cart = document.getElementById("container-cart");

//1. afficher la liste des produits selectionnes
//a. si le panier est vide:
if (produitsEnregistresLocalStorage === null) {
  console.log("je suis vide");
  document.getElementById("emptyCart").style = "display:block;";
} else {
  document.getElementById("container-cart").style = "display:block;";

  // boucler sur le localstorage

  for (i = 0; i < produitsEnregistresLocalStorage.length; i++) {
    // console.log(produitsEnregistresLocalStorage[i].prixProduit);
    // console.log(produitsEnregistresLocalStorage[i].nomProduit);
    // console.log(produitsEnregistresLocalStorage[i].quantiteProduit);

    // Refaire comme sur la page index.js: on clone puis on affiche sur le dom

    const templateElt = document.getElementById("templateCart");
    const cloneElt = document.importNode(templateElt.content, true);

    // cloneElt.getElementById("picture").src =
    //   produitsEnregistresLocalStorage[i].imageUrl;

    cloneElt.getElementById("name").textContent =
      produitsEnregistresLocalStorage[i].nomProduit;
    // une fois le clone fait supprimer les id:on supprime l'id car il se repete a chaque appel de produit (l'id est unique)
    cloneElt.getElementById("name").removeAttribute("id");
    cloneElt.getElementById("price").textContent =
      produitsEnregistresLocalStorage[i].prixProduit;
    cloneElt.getElementById("price").removeAttribute("id");
    cloneElt.getElementById("qte").textContent =
      "x" + produitsEnregistresLocalStorage[i].quantiteproduit;
    cloneElt.getElementById("qte").removeAttribute("id");
    document.getElementById("panier").appendChild(cloneElt);
    // console.log("je ne suis pas vide");
  }
}

// -----Suppression de tous les articles du panier--------

// 1 : Je récupére l'action du clic sur le bouton
const btnSuppression = document.getElementById("btnSupprimer");
// J'écoute l'évènement
btnSuppression.addEventListener("click", function (event) {
  // 2 : Je stop l'event ( Bloquer le rechargement de la page )
  event.preventDefault();
  // 3: je supprime tous les produits du panier
  localStorage.removeItem("panier");
  //   chargement de la page panier.html
  window.location.href = "panier.html";
});

// Declaration de la variable qui donne la liste des prix des produits dans le panier
let prixTotal = [];
// on cherche les prix de chaque produit selectionne
for (let k = 0; k < produitsEnregistresLocalStorage.length; k++) {
  let prixProduitPanier = produitsEnregistresLocalStorage[k].prixProduit;
  // mettre la liste de prix dans le tableau prixTotal
  prixTotal.push(prixProduitPanier);
  //   console.log(prixTotal);
}
//  Additionner les prix qui se trouve dans [prixTotal]
const reducer = (previousValue, currentValue) => previousValue + currentValue;
const montantTotal = prixTotal.reduce(reducer, 0);
console.log(montantTotal);

// // la fonction qui fait la somme de tous les prix des produits achete
// function sumPriceProductArray(prixTotal) {
//   let sum = 0;
//   for (let j = 0; j < prixTotal.length; j++) {
//     sum += prixTotal[j];
//   }
//   return sum;
// }

// function test input

// vérifier si les champs ne sont pas vide

// test email avec regex
