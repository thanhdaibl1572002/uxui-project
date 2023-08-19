import { getLanguageData, createStarRatingHTML, formatPrice, filterProducts, showNotify } from "../js/utils.js";
import { renderSubCart, updateSubtotal } from "./sub-cart.js";
import { updateCartQuantity } from "./header.js";

export const renderProductList = async () => {
    const languageData = await getLanguageData();
    const filterConditions = JSON.parse(localStorage.getItem('filterConditions')) || { usageNeeds: '', ram: 0, rom: 0, screenSize: 0, operatingSystem: '', minPrice: 0, maxPrice: 0, other: '', brand:'', segmentation: '', name: ''};
    const sortCondition = localStorage.getItem("sortCondition") || "newest";
    const currentPage = parseInt(localStorage.getItem("currentPage")) || 1;
    const pageLimit = parseInt(localStorage.getItem("pageLimit")) || 8;

    const startIndex = (currentPage - 1) * pageLimit;
    const endIndex = startIndex + pageLimit;

    const currentPageProducts = await filterProducts(filterConditions, sortCondition, startIndex, endIndex);

    const showProducts = document.getElementById("show-products")
    let htmlProducts = ''
    let htmlDiscount = ''
    let htmlColors = ''
    let htmlImage = ''
    let htmlRating = ''
    let htmlDescriptions = ''

    for (let i = 0; i < currentPageProducts.length; i++) {
        const product = currentPageProducts[i]

        // ============== Discount ==============
        htmlDiscount = ''
        product.discount != 0 ? htmlDiscount = `<span class="saleoff">-${product.discount}%</span>` : htmlDiscount = ``

        // ============== Colors ==============
        htmlColors = ''
        for (let j = 0; j < product.images.length; j++) {
            const color = product.images[j].color.code
            const name = product.images[j].color.name
            const labelColorIndex = j;
            const image = product.images[j].url
            htmlColors += `
            <div class="product-item-top-colors-item ${j == 0 ? `active` : ``}" 
            style="background-color: ${color}" data-color="${name}" data-label="${labelColorIndex}" data-image="${image}"
            data-target="${product.id}" >
            </div>`
        }

        // ============== Image ==============
        htmlImage = ''
        htmlImage += `<img data-target="${product.id}" src="${product.images[0].url}" alt=""/>`

        // ============== Rating ==============
        htmlRating = ''
        htmlRating += createStarRatingHTML(product.rating)

        // ============== Descriptions ==============
        htmlDescriptions = ''
        for (let j = 0; j < product.descriptions.length; j++) {
            htmlDescriptions += `<li><i class="fa-regular fa-hand-point-right"></i></i></i>${product.descriptions[j]}</li>`
        }

        htmlProducts += `
        <a href="./details.html?id=${product.id}" id=${`${product.id}`} data-name="${product.name}" class="product-item">
            ${htmlDiscount}
            <div class="product-item-top">
                <div class="product-item-top-colors">
                    ${htmlColors}
                </div>
                <div class="product-item-top-images">
                    <div class="product-item-top-images-item">
                        ${htmlImage}
                    </div>
                </div>
                <div class="product-item-top-stars">
                    ${htmlRating} (${product.rating.toFixed(1)})
                </div>
            </div>
            <div class="product-item-bottom">
                <h1>${product.name}</h1>
                <div class="product-item-bottom-specifications">
                    <div class="product-item-bottom-specifications-item" title="${languageData.products.ram}">
                        ${product.ram} GB
                    </div>
                    <div class="product-item-bottom-specifications-item" title="${languageData.products.rom}">
                        ${product.rom} GB
                    </div>
                    <div class="product-item-bottom-specifications-item" title="${languageData.products.screensize}">
                        ${product.screenSize} IN
                    </div>
                </div>
                <div class="product-item-bottom-price">
                    <h2>${formatPrice(product.price, product.discount)}</h2><h3>${product.discount != 0 ? formatPrice(product.price, 0) : ``}</h3>
                </div>
                <ul class="product-item-bottom-description">
                    ${htmlDescriptions}
                </ul>
                <button class="product-item-add-cart-button" data-productid="${product.id}">
                    <i class="fa-solid fa-cart-shopping"></i> ${product.button}
                </button>
            </div>
        </a>
        `
    }
    showProducts.innerHTML = htmlProducts

    const colorItems = document.querySelectorAll('.product-item-top-colors-item');
    colorItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const color = item.getAttribute('data-color');
            const colorTarget = item.getAttribute('data-target');
            const productImage = document.querySelector(`.product-item-top-images-item img[data-target="${colorTarget}"]`);
            const colorItemsTarget = document.querySelectorAll(`.product-item-top-colors-item[data-target="${colorTarget}"]`);
            productImage.src = `../resources/images/${color}.png`;
            colorItemsTarget.forEach(item => item.classList.remove('active'));
            item.classList.add('active');
        });
    });

    const addCartButtons = document.querySelectorAll(".product-item-add-cart-button");
    const subcart = document.getElementById("sub-cart");
    const background = document.getElementById('background');
    const backgroundNotify = "linear-gradient(to right, #ff416c 0%, #ff4b2b 100%)";
    addCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = parseInt(button.dataset.productid);
            const productSelected = document.getElementById(productId);
            const labelColorIndex = productSelected.querySelector(".product-item-top-colors-item.active").dataset.label;
            const productImage = productSelected.querySelector(".product-item-top-colors-item.active").dataset.image;
            const productName = productSelected.dataset.name;
            
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (!(cart.some(item => item.id === productId))) {
                cart.push({
                    id: productId,
                    label: labelColorIndex,
                    image: productImage,
                    quantity: 1,
                })
                localStorage.setItem('cart', JSON.stringify(cart));
                renderSubCart();
                updateSubtotal();
                updateCartQuantity();
                background.classList.add('active');
                subcart.classList.add('active');
                showNotify(productName + " " + languageData.subcart.alreadyadd);
            } else {
                showNotify(productName + " " + languageData.subcart.alreadyexists, "top", "right", backgroundNotify);
            }
        })
    })
}

renderProductList();