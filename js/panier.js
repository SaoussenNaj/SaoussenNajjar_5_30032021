document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  getPricetotal();
  deleteCart();
});

//-----Déclaration de la varriable "produitsEnregistresLocalStorage dans laquelle on met  key et value qui sont dans le localStorage
let produitsEnregistresLocalStorage =
  JSON.parse(localStorage.getItem("panier")) || [];
// Ajout || [] (resume de syntaxe de 4 cas: 0, false, undefined, null)d'un tableau vide comme valeur initiale pour la methode reduce en dessous
// let produitsEnregistresLocalStorage =
//   JSON.parse(localStorage.getItem("panier")) || [];

//----------Affichage produit panier------------
const cart = document.getElementById("container-cart");

//1. afficher la liste des produits selectionnes
function displayCart() {
  //a. si le panier est vide:
  if (produitsEnregistresLocalStorage.length === 0) {
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
        "Prix Unitaire : " +
        " " +
        produitsEnregistresLocalStorage[i].prixProduit +
        " €";
      cloneElt.getElementById("price").removeAttribute("id");
      cloneElt.getElementById("qte").textContent =
        " Quantité : " +
        " " +
        "x" +
        produitsEnregistresLocalStorage[i].quantiteproduit;
      cloneElt.getElementById("qte").removeAttribute("id");
      document.getElementById("panier").appendChild(cloneElt);
    }
  }
}

// -----Suppression de tous les articles du panier--------
function deleteCart() {
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
}

// *********Fonction de calcul du montant total****************

// Declaration de la variable qui donne la liste des prix des produits dans le panier
let prixTotal = 0;
function getPricetotal() {
  // on cherche les prix de chaque produit selectionne
  console.log(produitsEnregistresLocalStorage);
  for (let k = 0; k < produitsEnregistresLocalStorage.length; k++) {
    let prixUnitaireProduit = produitsEnregistresLocalStorage[k].prixProduit;
    let qteTotalProduit = produitsEnregistresLocalStorage[k].quantiteproduit;
    let prixProduitPanier = prixUnitaireProduit * qteTotalProduit;
    //  affectation de la valeur approprie a la variable prix total:
    prixTotal += prixProduitPanier;
  }
  // Affichage de montant total sur html:
  document.getElementById("containerMontant").innerHTML = prixTotal + "€";
  console.log(prixTotal);
}

// ------------------------Validation Formulaire--------------------
let form = document.getElementById("loginForm");

// Ecouter la modification de l'email:

form.inputEmail.addEventListener("change", function () {
  validEmail(this);
});
form.firstname.addEventListener("change", function () {
  validInputNotEmpty(this, "Veuillez renseigner le prénom", "errorFName");
});
form.lastname.addEventListener("change", function () {
  validInputNotEmpty(this, "Veuillez renseigner le nom", "errorLName");
});
form.inputAddress.addEventListener("change", function () {
  validInputNotEmpty(this, "Veuillez renseigner l'adresse", "errorAddress");
});
form.inputCity.addEventListener("change", function () {
  validInputNotEmpty(this, "Veuillez renseigner la ville", "errorCity");
});

// Ecouter la soumission du formulaire
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let isEmailValid = validEmail(this.inputEmail);
  let isFirstNameValid = validInputNotEmpty(
    this.firstname,
    "Veuillez renseigner le prénom",
    "errorFName"
  );
  let isLastNameValid = validInputNotEmpty(
    this.lastname,
    "Veuillez renseigner le nom",
    "errorLName"
  );
  let isAddressValid = validInputNotEmpty(
    this.inputAddress,
    "Veuillez renseigner l'adresse",
    "errorAddress"
  );
  let isCityValid = validInputNotEmpty(
    this.inputCity,
    "Veuillez renseigner la ville",
    "errorCity"
  );
  if (
    isEmailValid !== true ||
    isFirstNameValid !== true ||
    isLastNameValid !== true ||
    isAddressValid !== true ||
    isCityValid !== true
  ) {
    console.log("erreur");
  } else {
    sendOrder();
    console.log("jawna fisfis");
  }
});

//******Valid input ****/
validInputNotEmpty = function (input, errorMessage, errorId) {
  if (input.value.trim() === "") {
    document.getElementById(errorId).innerHTML = errorMessage;
    document.getElementById(errorId).classList.add("text-danger");
    document.getElementById(errorId).style = "display:block;";
    return false;
  } else {
    document.getElementById(errorId).style = "display:none;";
    return true;
  }
};

//****Validation Email****/
const validEmail = function (email) {
  // creation de la reg pour la validation email
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  // tester l'expression reguliere
  let testEmail = emailRegExp.test(email.value);
  let emailError = document.getElementById("emailError");

  if (testEmail) {
    emailError.style = "display:none;";
    return true;
  } else {
    emailError.style = "display:block;";
    emailError.innerHTML = "Adresse non valide";
    // Ajouter une couleur au text 'adresse non valide'
    emailError.classList.add("text-danger");
    return false;
  }
};

//--------- Fonction qui envoie les infos à la route POST-------
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
      localStorage.setItem("orderId", JSON.stringify(data.orderId));
      localStorage.setItem("prixTotal", JSON.stringify(prixTotal));

      // Rediriger l'utilisateur sur la page de remerciement avec l"UUID affiché ainsi que le montant de la commande.
      window.location.href = "/remerciement.html";

      // Une fois l'utilisateur rediriger supprimer le localstorage
    })
    .catch((error) => console.log("error", error));
}
