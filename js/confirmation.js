document.addEventListener("DOMContentLoaded", () => {
  displayMessageCommande();
});
function displayMessageCommande() {
  // Recuperation des données du localstorage  (UUID + Montant commande)
  const orderId = JSON.parse(localStorage.getItem("orderId"));
  const prixTotal = JSON.parse(localStorage.getItem("prixTotal"));
  // Affichage du message de confirmation de la commande
  let msgConfirmation = (document.getElementById(
    "messageConfirm"
  ).innerHTML = `Le numéro de votre Commande est le : ${orderId} pour un Montant Total de : ${prixTotal} €`);
  // Vider le localstorage
  localStorage.clear();
}
