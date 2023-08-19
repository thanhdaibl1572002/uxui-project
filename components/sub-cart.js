import { getLanguageData, getProductById, formatPrice, getTotalPriceCart, showNotify } from "../js/utils.js";
import { updateCartQuantity } from "./header.js";

export const renderSubCart = async () => {
    const languageData = await getLanguageData();
    const subcart = document.getElementById("sub-cart");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    subcart.innerHTML = `
        <div class="sub-cart-header">
            <h3>${languageData.subcart.title} ${cart && cart.length > 0 ? `(${cart.length} ${languageData.subcart.products})` : ``}</h3>
            <a href="../pages/cart.html">${languageData.subcart.viewall}</a>
        </div>
        <div class="sub-cart-content" id="sub-cart-content"></div>
        <div class="sub-cart-footer">
            <div class="sub-total"></div>
            <a href="../pages/order.html" class="sub-cart-checkout"><i class="fa-solid fa-money-check-dollar"></i>${languageData.subcart.checkout}</a>
        </div>  
    `

    let htmlCartItems = '';
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            const cartItem = await getProductById(cart[i].id);
            const color = cartItem.images[cart[i].label].color.label;
            const image = cart[i].image;
            htmlCartItems += `
                <a href="../pages/details.html" class="sub-cart-content-item">
                    <div class="sub-cart-content-item-left">
                        <img src="${image}" alt="">
                    </div>
                    <div class="sub-cart-content-item-right">
                        <h1>${cartItem.name}</h1>
                        <div class="info">
                            <div class="info-memory">
                                ${languageData.subcart.ram}/${languageData.subcart.rom}: <span>${cartItem.ram}/${cartItem.rom} GB</span>
                            </div>
                            <div class="info-color">
                                ${languageData.subcart.color}: <span>${color}</span>
                            </div>
                        </div>
                        <div class="price">
                            ${formatPrice(cartItem.price, cartItem.discount)}<span>${cartItem.discount != 0 ? formatPrice(cartItem.price, 0) : ``}</span>
                        </div>
                        <div class="quantity">
                            <div class="sub-cart-quantity-decrease" data-productid="${cart[i].id}"><i class="fa-solid fa-minus"></i></div>
                            <input type="number" class="sub-cart-increate-number" data-productid="${cart[i].id}" value="${cart[i].quantity}">
                            <div class="sub-cart-quantity-increase" data-productid="${cart[i].id}"><i class="fa-solid fa-plus"></i></div>
                        </div>
                        <div class="action">
                            <button class="sub-cart-action-wishlist"><i class="fa-regular fa-heart"></i> ${languageData.subcart.addwishlist}</button>
                            <button class="sub-cart-action-delete" data-productid="${cart[i].id}" data-name="${cartItem.name}"><i class="fa-regular fa-trash-can"></i></button>
                        </div>
                    </div>
                </a>
            `;
        }
    } else {
        htmlCartItems += `<div class="empty" class=""><i class="fa-solid fa-triangle-exclamation"></i>${languageData.subcart.empty}</div>`
    }

    const subcartContent = document.getElementById("sub-cart-content");
    subcartContent.innerHTML = htmlCartItems;

    const deleteButtons = document.querySelectorAll(".sub-cart-action-delete");
    const backgroundNotify = "linear-gradient(to right, #ff416c 0%, #ff4b2b 100%)";
    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const productId = parseInt(button.dataset.productid);
            const productName = button.dataset.name;
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderSubCart();
            updateSubtotal();
            updateCartQuantity();
            showNotify(productName + " " + languageData.subcart.alreadydelete, "top", "right", backgroundNotify);
        })
    })

    const quantityContainers = document.querySelectorAll(".sub-cart-content-item-right .quantity");
    quantityContainers.forEach(container => {
        const quantityInput = container.querySelector(".sub-cart-increate-number");
        const decreaseButton = container.querySelector(".sub-cart-quantity-decrease");
        const increaseButton = container.querySelector(".sub-cart-quantity-increase");

        increaseButton.addEventListener("click", (event) => {
            event.preventDefault();
            quantityInput.value = parseInt(quantityInput.value) + 1;
            const productId = parseInt(increaseButton.dataset.productid);
            cart = cart.map(item => item.id === productId ? {...item, quantity: parseInt(quantityInput.value)} : item);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateSubtotal();
        });

        decreaseButton.addEventListener("click", (event) => {
            event.preventDefault();
            quantityInput.value = Math.max(parseInt(quantityInput.value) - 1, 1);
            const productId = parseInt(decreaseButton.dataset.productid);
            cart = cart.map(item => item.id === productId ? {...item, quantity: parseInt(quantityInput.value)} : item);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateSubtotal();
        });

        quantityInput.addEventListener('click', (event) => {
            event.preventDefault();
        });

        quantityInput.addEventListener('change', (event) => {
            event.preventDefault();
            const quantity = parseInt(quantityInput.value);
            if (isNaN(quantity) || quantity < 1) {
                quantityInput.value = 1;
            } else {
                quantityInput.value = quantity;
                const productId = parseInt(quantityInput.dataset.productid);
                cart = cart.map(item => item.id === productId ? {...item, quantity: parseInt(quantityInput.value)} : item);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateSubtotal();
            }
        });
    });

    const background = document.getElementById('background');
    background.addEventListener('click', () => {
        background.classList.remove('active');
        subcart.classList.remove('active');
    });
}

export const updateSubtotal = async () => {
    const languageData = await getLanguageData();
    const subtotal = document.querySelector(".sub-cart-footer .sub-total");
    subtotal.innerHTML = `${languageData.subcart.subtotal}<span>${formatPrice(await getTotalPriceCart(), 0)}</span>`;
}

renderSubCart()
updateSubtotal()