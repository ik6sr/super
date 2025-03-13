const SHEET_URL = "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:json";

async function fetchProducts() {
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const products = json.table.rows.map(row => ({
        name: row.c[0].v,
        category: row.c[1].v,
        price: row.c[2].v,
        image: row.c[3].v
    }));

    displayProducts(products);
}

function displayProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = "";
    products.forEach(product => {
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

let cart = [];
function addToCart(name, price) {
    cart.push({ name, price });
    alert(تمت إضافة ${name} إلى السلة);
}

function confirmOrder() {
    let message = "طلب جديد:\n";
    cart.forEach(item => {
        message += ${item.name} - ${item.price} ل.س\n;
    });
    window.location.href = https://wa.me/YOUR_PHONE_NUMBER?text=${encodeURIComponent(message)};
}

fetchProducts();
