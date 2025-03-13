const SHEET_URL = "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:json";
const WHATSAPP_URL = "https://wa.me/9647806949015?text=";

let products = [];
let cart = [];

async function fetchProducts() {
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    products = json.table.rows.map(row => ({
        name: row.c[0].v,
        category: row.c[1].v,
        price: row.c[2].v,
        image: row.c[3].v
    }));

    displayProducts(products);
}

function displayProducts(productsList) {
    const container = document.getElementById("products");
    container.innerHTML = "";
    productsList.forEach(product => {
        container.innerHTML += `
            <div class="product">
                <img src="${product.image}" width="100">
                <h3>${product.name}</h3>
                <p>${product.price} ل.س</p>
                <button onclick="addToCart('${product.name}', ${product.price})">إضافة</button>
            </div>
        `;
    });
}

function filterProducts(category) {
    if (category === "all") {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

function searchProduct() {
    const query = document.getElementById("search").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartContainer.innerHTML += `
            <li>${item.name} - ${item.price} ل.س
                <button onclick="removeFromCart(${index})">❌</button>
            </li>
        `;
    });

    totalPriceElement.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function confirmOrder() {
    if (cart.length === 0) {
        alert("السلة فارغة!");
        return;
    }

    let message = "طلب جديد:\n";
    cart.forEach(item => {
        message += - ${item.name} : ${item.price} ل.س\n;
    });

    window.location.href = WHATSAPP_URL + encodeURIComponent(message);
}

fetchProducts();
