//-----Déclaration de la varriable "produitsEnregistresLocalStorage dans laquelle on met  key et value qui sont dans le localStorage
let produitsEnregistresLocalStorage = JSON.parse(
  localStorage.getItem("panier") || []
);
// Ajout || [] d'un tableau vide comme valeur initiale pour la methode reduce en dessous
// let produitsEnregistresLocalStorage =
//   JSON.parse(localStorage.getItem("panier")) || [];

//----------Affichage produit panier------------
const cart = document.getElementById("container-cart");

//1. afficher la liste des produits selectionnes
//a. si le panier est vide:
if (produitsEnregistresLocalStorage === null) {
  document.getElementById("emptyCart").style = "display:block;";
} else {
  document.getElementById("container-cart").style = "display:block;";

  // boucler sur le localstorage

  for (i = 0; i < produitsEnregistresLocalStorage.length; i++) {
    // Refaire comme sur la page index.js: on clone puis on affiche sur le dom

    const templateElt = document.getElementById("templateCart");
    const cloneElt = document.importNode(templateElt.content, true);

    cloneElt.getElementById("picture").src =
      produitsEnregistresLocalStorage[i].lienImage;
    cloneElt.getElementById("picture").removeAttribute("id");

    cloneElt.getElementById("name").textContent =
      produitsEnregistresLocalStorage[i].nomProduit;
    // une fois le clone fait supprimer les id:on supprime l'id car il se repete a chaque appel de produit (l'id est unique)
    cloneElt.getElementById("name").removeAttribute("id");
    cloneElt.getElementById("price").textContent =
      produitsEnregistresLocalStorage[i].prixProduit + " €";
    cloneElt.getElementById("price").removeAttribute("id");
    cloneElt.getElementById("qte").textContent =
      "x" + produitsEnregistresLocalStorage[i].quantiteproduit;
    cloneElt.getElementById("qte").removeAttribute("id");
    document.getElementById("panier").appendChild(cloneElt);
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
let prixTotal = 0;
// on cherche les prix de chaque produit selectionne
console.log(produitsEnregistresLocalStorage);
for (let k = 0; k < produitsEnregistresLocalStorage.length; k++) {
  let prixUnitaireProduit = produitsEnregistresLocalStorage[k].prixProduit;
  let qteTotalProduit = produitsEnregistresLocalStorage[k].quantiteproduit;
  let prixProduitPanier = prixUnitaireProduit * qteTotalProduit;

  //  affectation de la valeur approprie a la variable prix total:
  prixTotal += prixProduitPanier;
}

console.log(prixTotal);

//  ---------2eme methode-----------:
// Additionner les prix qui se trouve dans prixTotal avec la methode reduce()
// const reducer = (prixTotal, produit) =>
//   prixTotal + produit.prixProduit * produit.quantiteproduit;
// const montantTotal = produitsEnregistresLocalStorage.reduce(reducer, 0);
// console.log(montantTotal);

// Affichage de montant total sur html:
document.getElementById("containerMontant").innerHTML = prixTotal + "€";

// ------------------------Validation Formulaire--------------------
let form = document.querySelector("#loginForm");

// Ecouter la modification de l'email:
/*
form.inputEmail.addEventListener("change", function () {
  validEmail(this);
});
// Ecouter la soumission du formulaire
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validEmail(form.inputEmail)) {
    console.log("email valide");
    sendOrder();
  } else {
    console.log("email non valide");
  }
});
*/

//****Validation Email****/
/*
const validEmail = function (email) {
  // creation de la reg pour la validation email
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  // tester l'expression reguliere
  let testEmail = emailRegExp.test(email.value);
  // variable pour designer <small> et "nextElementSibling" elle attrappe l'element juste apres
  let small = email.nextElementSibling;

  if (testEmail) {
    small.innerHTML = "Adresse valide";
    // pour eviter la duplication des classes danger ou success
    small.classList.remove("text-danger");
    // Ajouter une couleur au text 'adresse valide'
    small.classList.add("text-success");
  } else {
    small.innerHTML = "Adresse non valide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};
*/
// Fonction qui envoie les infos à la routes POST

const orderBtn = document.getElementById("validate");

orderBtn.addEventListener("submit", (event) => {
  event.preventDefault();
  valideInput();
});

function valideInput() {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  if (emailRegExp.test(document.getElementById("email").value !== true)) {
    alert("email invalide");
  } else {
    sendOrder();
  }
}

function sendOrder() {
  let contactInput = {
    firstName: document.getElementById("firstname").value,
    lastName: document.getElementById("lastname").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  let productId = [];
  for (let i = 0; i < produitsEnregistresLocalStorage.length; i++) {
    productId.push(produitsEnregistresLocalStorage[i].idProduit);
  }

  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contact: contactInput,
      products: productId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Récupération de l'UUID
      console.log(data.orderId);
      // Sauvegarder l'UUID dans le localstorage
      localStorage.setItem("orderId", data.orderId);

      // Rediriger l'utilisateur sur la page de remerciement avec l"UUID affiché ainsi que le montant de la commande.
      window.location.href = "/remerciement.html";

      // Une fois l'utilisateur rediriger supprimer le localstorage
    })
    .catch((error) => console.log("error", error));
}
