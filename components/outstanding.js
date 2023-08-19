import { getLanguageData, formatPrice } from "../js/utils.js";

const renderOutstanding = async () => {
    const languageData = await getLanguageData();
    const outstanding = document.getElementById("outstanding");
    outstanding.innerHTML = `
        <div class="outstanding-item">
            <span class="outstanding-item-brand">Xiaomi</span>
            <div class="outstanding-item-left">
                <h1>Redmi 12C</h1>
                <p>MediaTek Helio G85</p>
                <span>${formatPrice(languageData.outstanding.price[0], 0)}</span>
                <a href="../pages/details.html">${languageData.outstanding.seemore} <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            
            <div class="outstanding-item-right">
                <img src="../resources/images/xiaomi-redmi-12c/outstanding.png" alt="">
            </div>
        </div>

        <div class="outstanding-item">
            <span class="outstanding-item-brand">Oppo</span>
            <div class="outstanding-item-left">
                <h1>Oppo A55</h1>
                <p>MediaTek Helio G35</p>
                <span>${formatPrice(languageData.outstanding.price[1], 0)}</span>
                <a href="../pages/details.html">${languageData.outstanding.seemore} <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            
            <div class="outstanding-item-right">
                <img src="../resources/images/oppo-a55/outstanding.png" alt="">
            </div>
        </div>

        <div class="outstanding-item">
            <span class="outstanding-item-brand">Apple</span>
            <div class="outstanding-item-left">
                <h1>iPhone 14</h1>
                <p>Apple A16 Bionic</p>
                <span>${formatPrice(languageData.outstanding.price[2], 0)}</span>
                <a href="../pages/details.html">${languageData.outstanding.seemore} <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            
            <div class="outstanding-item-right">
                <img src="../resources/images/iphone-14-pro/outstanding.png" alt="">
            </div>
        </div>

        <div class="outstanding-item">
            <span class="outstanding-item-brand">Samsung</span>
            <div class="outstanding-item-left">
                <h1>Galaxy A13</h1>
                <p>Exynos 850</p>
                <span>${formatPrice(languageData.outstanding.price[3], 0)}</span>
                <a href="../pages/details.html">${languageData.outstanding.seemore} <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            
            <div class="outstanding-item-right">
                <img src="../resources/images/samsung-galaxy-a13/outstanding.png" alt="">
            </div>
        </div>

        <div class="outstanding-item">
            <span class="outstanding-item-brand">Oppo</span>
            <div class="outstanding-item-left">
                <h1>Find X5</h1>
                <p>Snapdragon 8 Gen 1</p>
                <span>${formatPrice(languageData.outstanding.price[4], 0)}</span>
                <a href="../pages/details.html">${languageData.outstanding.seemore} <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            
            <div class="outstanding-item-right">
                <img src="../resources/images/oppo-find-x5-pro/outstanding.png" alt="">
            </div>
        </div>

        <div class="outstanding-item">
            <span class="outstanding-item-brand">Xiaomi</span>
            <div class="outstanding-item-left">
                <h1>Xiaomi 12T</h1>
                <p>MediaTek Dimensity</p>
                <span>${formatPrice(languageData.outstanding.price[5], 0)}</span>
                <a href="../pages/details.html">${languageData.outstanding.seemore} <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            
            <div class="outstanding-item-right">
                <img src="../resources/images/xiaomi-12t/outstanding.png" alt="">
            </div>
        </div>
    `
}

renderOutstanding();