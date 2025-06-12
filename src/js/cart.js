import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  // Define productListElement aqui para que esteja disponível em todo o escopo da função
  const productListElement = document.querySelector(".product-list");
  const listFooterElement = document.querySelector(".list-footer");
  const listTotalElement = document.querySelector(".list-total");

  // Limpa o conteúdo anterior para evitar duplicações se renderCartContents for chamada várias vezes
  productListElement.innerHTML = "";

  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productListElement.innerHTML = htmlItems.join("");

    // Calcula o total de todos os itens no carrinho
    const totalAmount = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    // Exibe o valor total
    listTotalElement.innerText = `$${totalAmount.toFixed(2)}`;

    // Mostra a seção do rodapé (remove a classe 'hide')
    listFooterElement.classList.remove("hide");

    // Adiciona event listeners para os botões de remover
    const excludeButtons = document.querySelectorAll(".cart-card__button");
    excludeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const itemId = event.currentTarget.dataset.itemId;
        removeItem(itemId);
      });
    });
  } else {
    // Se o carrinho estiver vazio, exibe uma mensagem e oculta o rodapé
    productListElement.innerHTML = "<p>Seu carrinho está vazio.</p>";
    listFooterElement.classList.add("hide"); // Garante que o rodapé esteja oculto se o carrinho estiver vazio
  }
}

// Change to show the quantity of the item
function cartItemTemplate(item) {
  const productImageSrc = item.Images.PrimaryMedium;

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${productImageSrc}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__button" data-item-id="${item.Id}"><img src="../images/red_trash_bin.webp" alt="bin"></button>
</li>`;

  return newItem;
}

renderCartContents();

function removeItem(itemId) {
  let cartItems = getLocalStorage("so-cart") || [];
  let index = cartItems.findIndex((item) => item.Id === itemId);
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}
