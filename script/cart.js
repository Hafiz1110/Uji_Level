let allProducts = [];

// Fetch products data
fetch("../item.json")
  .then((response) => response.json())
  .then((data) => {
    allProducts = data;
    displayCart();
  })
  .catch((error) => console.error("Error loading products:", error));

// Display cart items
function displayCart() {
  const cart = Cart.getCart();
  const cartContainer = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="text-center text-gray-500 py-8">Your cart is empty</p>';
    updateOrderSummary(cart);
    return;
  }

  let html = '';
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    const checkedAttr = item.checked ? 'checked' : '';
    html += `
      <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6" data-product-id="${item.id}">
        <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <div class="shrink-0 md:order-1">
            <img class="h-20 w-20 dark:hidden" src="${item.image}" alt="${item.name}" />
            <img class="hidden h-20 w-20 dark:block" src="${item.image}" alt="${item.name}" />
          </div>

          <label for="counter-input" class="sr-only">Choose quantity:</label>
          <div class="flex items-center justify-between md:order-3 md:justify-end">
            <div class="flex items-center">
              <button type="button" class="decrement-btn inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700" data-product-id="${item.id}">
                <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                </svg>
              </button>
              <input type="text" class="quantity-input w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" data-product-id="${item.id}" value="${item.quantity}" required />
              <button type="button" class="increment-btn inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700" data-product-id="${item.id}">
                <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
              </button>
            </div>
            <div class="text-end md:order-4 md:w-32">
              <p class="text-base font-bold text-gray-900 dark:text-white">${itemTotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
            </div>
          </div>

          <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <p class="text-base font-medium text-gray-900 hover:underline dark:text-white">${item.name}</p>
            <div class="flex items-center gap-4">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" class="item-checkbox h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" data-product-id="${item.id}" ${checkedAttr}>
                <span class="sr-only">Select ${item.name}</span>
              </label>

              <button type="button" class="remove-button inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500" data-product-id="${item.id}">
                <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  cartContainer.innerHTML = html;

  // quantity decrement
  document.querySelectorAll('.decrement-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.currentTarget.dataset.productId);
      const newQuantity = Math.max(1, parseInt(document.querySelector(`.quantity-input[data-product-id="${productId}"]`).value) - 1);
      Cart.updateQuantity(productId, newQuantity);
      displayCart();
    });
  });

  // quantity increment
  document.querySelectorAll('.increment-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.currentTarget.dataset.productId);
      const newQuantity = parseInt(document.querySelector(`.quantity-input[data-product-id="${productId}"]`).value) + 1;
      Cart.updateQuantity(productId, newQuantity);
      displayCart();
    });
  });

  // quantity manual change
  document.querySelectorAll('.quantity-input').forEach((input) => {
    input.addEventListener('change', (e) => {
      const productId = parseInt(e.target.dataset.productId);
      const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
      Cart.updateQuantity(productId, newQuantity);
      displayCart();
    });
  });

  // remove item
  document.querySelectorAll('.remove-button').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.currentTarget.dataset.productId);
      Cart.removeFromCart(productId);
      displayCart();
    });
  });

  // checkbox handling: toggle checked state and update summary
  document.querySelectorAll('.item-checkbox').forEach((cb) => {
    cb.addEventListener('change', (e) => {
      const productId = parseInt(e.currentTarget.dataset.productId);
      Cart.checkboxToggle(productId);
      // update order summary without full reload for snappiness
      const cartNow = Cart.getCart();
      updateOrderSummary(cartNow);
      // visually mark the item card
      const container = document.querySelector(`[data-product-id="${productId}"]`);
      if (container) {
        if (cb.checked) container.classList.add('ring-2', 'ring-green-200');
        else container.classList.remove('ring-2', 'ring-green-200');
      }
    });
  });

  updateOrderSummary(cart);
}

function updateOrderSummary(cart) {
  const subtotal = Cart.calculateTotal(cart);
  const subtotalEl = document.getElementById('subtotal');
  if (subtotalEl) {
    subtotalEl.textContent = subtotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  }
}



window.addEventListener('DOMContentLoaded', displayCart);
