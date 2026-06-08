// Cart Utility Functions
const Cart = {
  // Get cart from localStorage
  getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  },

  // Save cart to localStorage
  saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  // Add item to cart
  addToCart(product) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: product.quantity || 1
      });
    }

    this.saveCart(cart);
    alert(`${product.name} has been added to your cart.`);
    return cart;
  },

  // Remove item from cart
  removeFromCart(productId) {
    const cart = this.getCart();
    const filteredCart = cart.filter(item => item.id !== productId);
    this.saveCart(filteredCart);
    return filteredCart;
  },

  // Update item quantity
  updateQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
    }
    this.saveCart(cart);
    return cart;
  },

checkboxToggle(productId) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.checked = !item.checked;
    }
    this.saveCart(cart);
    return cart;
  },

  // Calculate total price
  calculateTotal(cart) {
    return cart.reduce((total, item) => item.checked ? total + item.price * item.quantity : total, 0);
  }
};

function checkout() {
  const cart = Cart.getCart();
  const checkedItems = cart.filter(item => item.checked);
    if (checkedItems.length === 0) {
        alert('Please select at least one item to checkout.');
        return;
    }
    const total = Cart.calculateTotal(cart);
    alert(`You have checked out ${checkedItems.length} item(s) for a total of ${total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}.`);
  
    


}
