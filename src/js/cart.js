import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const listFooterElement = document.querySelector(".list-footer");
  const listTotalElement = document.querySelector(".list-total");
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productListElement.innerHTML = htmlItems.join("");

    // Calculate the total of all items in the cart
    const totalAmount = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    // Display the total amount
    listTotalElement.innerText = `$${totalAmount.toFixed(2)}`;

    // Show the footer section (remove the 'hide' class)
    listFooterElement.classList.remove("hide");

    // Add event listeners for remove buttons
    const excludeButtons = document.querySelectorAll(".cart-card__button");
    excludeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const itemId = event.currentTarget.dataset.itemId;
        removeItem(itemId);
      });
    });
  } else {
    // If the cart is empty, display a message and hide the footer
    productListElement.innerHTML = "<p>Seu carrinho está vazio.</p>";
    listFooterElement.classList.add("hide"); // Ensure footer is hidden if cart is empty
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
