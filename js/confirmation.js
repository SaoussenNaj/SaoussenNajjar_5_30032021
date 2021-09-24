// Afficher les données du localstorage  (UUID + Montant commande)
const orderId = JSON.parse(localStorage.getItem("orderId"));
const prixTotal = JSON.parse(localStorage.getItem("prixTotal"));
let msgConfirmation = (document.getElementById(
  "messageConfirm"
).innerHTML = `Le numéro de votre commande est le : ${orderId} pour un montant total de : ${prixTotal} €`);
// Vider le localstorage
localStorage.clear();
