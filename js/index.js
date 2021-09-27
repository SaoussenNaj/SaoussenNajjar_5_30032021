(async function () {
  const teddies = await getTeddies();
  for (teddie of teddies) {
    displayTeddies(teddie);
  }
})();

// Récupére la data de l'API via les promesses
function getTeddies() {
  return fetch("http://localhost:3000/api/teddies").then((responseHttp) =>
    responseHttp.json()
  );
}

// Fonction qui va afficher les teddies

function displayTeddies(teddie) {
  const templateElt = document.getElementById("template");
  const cloneElt = document.importNode(templateElt.content, true);

  cloneElt.getElementById("title").textContent = teddie.name;
  cloneElt.getElementById("title").removeAttribute("id");
  cloneElt.getElementById("teddyImg").src = teddie.imageUrl;
  cloneElt.getElementById("teddyImg").removeAttribute("id");
  cloneElt.getElementById("price").textContent = teddie.price / 100 + " €";
  cloneElt.getElementById("price").removeAttribute("id");
  cloneElt.getElementById("detail").href = "/produit.html?id=" + teddie._id;
  cloneElt.getElementById("detail").removeAttribute("id");

  document.getElementById("produits").appendChild(cloneElt);
}
