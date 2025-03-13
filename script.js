let products = [];
let categories = new Set();
let cart = [];

const sheetID = "معرف-الجدول-هنا"; 
const apiKey = "https://script.google.com/macros/s/AKfycbw1JjYAFcJpPpiS4Yut6u77BjH8XFxVkgKWorF6DSekIZEBT9J5whtXMPm89Zw7k2ag/exec"; 
const sheetName = "Products"; 

async function fetchProducts() {
    const url = https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}?key=${apiKey};
    try {
        let response = await fetch(url);
        let data = await response.json();
        displayProducts(data.values);
    } catch (error) {
        console.error("فشل تحميل البيانات:", error);
    }
}

function displayProducts(data) {
    let productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = "";
    categories.clear();

    for (let i = 1; i < data.length; i++) {
        let [id, name, image, price, category] = data[i];
        products.push({ id, name, image, price, category });
        categories.add(category);

        let card = `
            <div class="product-card">
                <img src="${image}" alt="${name}">
                <h3>${name}</h3>
                <p>السعر: ${price} ل.س</p>
                <button onclick="addToCart(${id})">أضف للسلة</button>
            </div>
        `;
        productGrid.innerHTML += card;
    }

    renderCategories();
}

function renderCategories() {
    let categoriesContainer = document.getElementById("categories");
    categoriesContainer.innerHTML = <button onclick="filterProducts('الكل')">الكل</button>;
    categories.forEach(category => {
        categoriesContainer.innerHTML += <button onclick="filterProducts('${category}')">${category}</button>;
    });
}

function filterProducts(category) {
    let filteredProducts = category === "الكل" ? products : products.filter(p => p.category === category);
    displayProducts(filteredProducts);
}

// *إضافة إلى السلة*
function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    const cartItem = cart.find(item => item.id == productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
}

function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

function renderCart() {
    let cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += <p>${item.name} × ${item.quantity} - ${item.price * item.quantity} ل.س</p>;
    });

    document.getElementById("cart-summary").innerText = الإجمالي: ${total} ل.س;
}

function placeOrder() {
    let customerName = prompt("أدخل اسمك:");
    if (!customerName) return;

    let orderDetails = cart.map(item => ${item.name} × ${item.quantity}).join(", ");
    let totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

    submitOrder(customerName, orderDetails, totalPrice);

    let whatsappMessage = مرحبًا، أود تأكيد الطلب:\n${orderDetails}\nالإجمالي: ${totalPrice} ل.س;
    window.location.href = https://wa.me/9647806949015?text=${encodeURIComponent(whatsappMessage)};
}

async function submitOrder(name, order, price) {
    const ordersAPI = "https://script.google.com/macros/s/AKfycbw1JjYAFcJpPpiS4Yut6u77BjH8XFxVkgKWorF6DSekIZEBT9J5whtXMPm89Zw7k2ag/exec"; 

    try {
        let response = await fetch(ordersAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, order, price })
        });
        console.log(await response.text());
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchProducts();
