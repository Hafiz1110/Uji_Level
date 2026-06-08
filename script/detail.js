const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let products = []; // Global variable untuk menyimpan produk

fetch("../item.json")
  .then((respon) => respon.json())
  .then((data) => {
    products = data; // Simpan data ke variabel global
    const item = data.find((product) => product.id === Number(id));
    if (!item) {
      document.getElementById("detail").innerHTML = "<p>Product not found.</p>";
      return;
    }
    console.log(item);

    let hasil = `
      <div class="min-h-screen flex items-center justify-center bg-gray-50 py-10">
        <div class="w-full max-w-5xl bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div class="w-full md:w-1/2 p-6 flex items-center justify-center bg-gray-100">
            <img class="w-full h-auto rounded-2xl" src="${item.image}" alt="${item.name}">
          </div>
          <div class="w-full md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">${item.name}</h2>
              <p class="text-gray-600 mb-6 leading-relaxed">${item.description}</p>
            </div>
            <div>
              <p class="text-4xl font-extrabold text-gray-900 mb-6">${item.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
              <div class="flex flex-col sm:flex-row gap-3">
              <input type="number" id="quantity" name="quantity" min="1" value="1" class="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200">
                <button onclick="BuyButton(${item.id})" class="w-full sm:w-auto px-6 py-3 rounded-sm bg-taupe-700 text-white font-semibold hover:bg-taupe-500 transition">Buy now</button>
                <button onclick="addToCartButton(${item.id}, '${item.name}', ${item.price}, '${item.image}')" class="w-full sm:w-auto px-6 py-3 rounded-sm bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;

    document.getElementById("detail").innerHTML = hasil;
  });

function addToCartButton(id, name, price, image) {
  const product = {
    id: id,
    name: name,
    price: price,
    image: image,
    quantity: 1
  };
  
  Cart.addToCart(product);
}



