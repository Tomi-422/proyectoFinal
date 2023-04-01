const socket = io();
const productsContainer = document.getElementById("products");

socket.on("realtimeproducts", (productos) => {
    const { productsCatched } = productos;
    productsContainer.innerHTML = "";
    productsCatched.forEach((prod) => productsContainer.append(productContainer(prod)))
});

const productContainer = (prod) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <h2>${prod.title}</h2>
        <p>${prod.description}</p>
        <p>Code: ${prod.code}</p>
        <p>Stock: ${prod.stock}</p>
        <p>Price: ${prod.price}</p>
    `;
    return div;
};

