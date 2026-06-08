function getLoginRedirectPath() {
    return window.location.pathname.includes('/src/') ? 'login.html' : 'src/login.html';
}

function ensureLogin(action = 'use this feature') {
    if (sessionStorage.getItem('name')) return true;
    alert(`Please log in to ${action}.`);
    window.location.href = getLoginRedirectPath();
    return false;
}

function BuyButton(){
    if (!ensureLogin('buy this item')) {
        return;
    }
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = products.find(p => p.id === Number(productId));

    if (product) {
        const quantityInput = document.getElementById('quantity');
        const quantity = parseInt(quantityInput.value) || 1;
        const totalPrice = product.price * quantity;
        alert(`You have bought ${quantity} x ${product.name} for a total of ${totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}.`);
    }
}