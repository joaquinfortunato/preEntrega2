// Definir productos disponibles
const products = [
    { id: 1, name: "Tira de asado", price: 100, image: "tiraDeAsado.jpg"},
    { id: 2, name: "Vacio", price: 150, image: "vacioAsado.jpg" },
    { id: 3, name: "Entraña", price: 200, image: "entrañaAsado.jpg" },
    { id: 4, name: "Bife De Chorizo", price: 250, image: "bifeDeChorizo.jpg"}
];

// Función para mostrar los productos disponibles en la página
function renderProducts() {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';
    products.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        itemsContainer.appendChild(itemDiv);
    });
}

// Función para agregar un producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

// Función para renderizar los elementos del carrito
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItemsContainer.innerHTML = '';
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItemsContainer.appendChild(li);
    });
}

// Función para procesar el checkout
function checkout() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    const confirmCheckout = confirm(`Total: $${total}.`);
    if (confirmCheckout) {
        alert('Provecho');
        localStorage.removeItem('cartItems');
        renderCart();
    }
}


renderProducts();

renderCart();

document.getElementById('borrar-listado').addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    renderCart();
});
