import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // New function to remove an item from the cart
  const excludeButton = document.querySelectorAll(".cart-card__button");

  excludeButton.forEach(button => {
      button.addEventListener("click", (event) => {
          const itemId = event.currentTarget.dataset.itemId;
          removeItem(itemId);
    });
});
}

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
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__button" data-item-id="${item.Id}"><img src="../images/red_trash_bin.webp" alt="bin"></button>
</li>`;

  return newItem;
}

renderCartContents();

function removeItem(itemId) {
  let cartItems = getLocalStorage("so-cart") || [];
  let index = cartItems.findIndex(item => item.Id === itemId);
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}