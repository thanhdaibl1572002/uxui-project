import { getLanguageData } from "../js/utils.js";


const renderFooter = async () => {
    const languageData = await getLanguageData();
    const footer = document.getElementById("footer")
    footer.innerHTML = `
    <div class="footer-top">
        <div class="footer-top-left">
            <div class="footer-top-left-item">
                <h3>${languageData.footer.features.title}</h3>
                <ul>
                    <li><a href="#">${languageData.footer.features.home}</a></li>
                    <li><a href="#">${languageData.footer.features.policy}</a></li>
                    <li><a href="#">${languageData.footer.features.sale}</a></li>
                    <li><a href="#">${languageData.footer.features.contact}</a></li>
                </ul>
            </div>
            <div class="footer-top-left-item">
                <h3>${languageData.footer.categories.title}</h3>
                <ul>
                    <li><a href="#">${languageData.footer.categories.inexpensive}</a></li>
                    <li><a href="#">${languageData.footer.categories.moderate}</a></li>
                    <li><a href="#">${languageData.footer.categories.luxury}</a></li>
                </ul>
            </div>
            <div class="footer-top-left-item">
                <h3>${languageData.footer.brands.title}</h3>
                <ul>
                    <li><a href="#">${languageData.footer.brands.apple}</a></li>
                    <li><a href="#">${languageData.footer.brands.samsung}</a></li>
                    <li><a href="#">${languageData.footer.brands.oppo}</a></li>
                    <li><a href="#">${languageData.footer.brands.xiaomi}</a></li>
                </ul>
            </div>
            <div class="footer-top-left-item">
                <h3>${languageData.footer.contact.title}</h3>
                <ul>
                    <li><a href="#"><i class="fa-solid fa-location-dot"></i>${languageData.footer.contact.address}</a></li>
                    <li><a href="#"><i class="fa-solid fa-phone"></i>${languageData.footer.contact.phone}</a></li>
                    <li><a href="#"><i class="fa-solid fa-envelope"></i>${languageData.footer.contact.email}</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-top-right">
            <div class="logo">
                <a href="./home.html">
                    <img src="../resources/images/logo.png" alt="uxui shop logo" />
                    UXUI<span>SHOP</span>
                </a>
            </div>
            <div class="social">
                <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i class="fa-brands fa-twitter"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
            </div>
            <div class="subscribe">
                <h4>${languageData.footer.getinfo}</h4>
                <div class="input">
                    <input type="text" placeholder="${languageData.footer.emailaddress}">
                    <button><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
            <div class="payment">
                <h4>${languageData.footer.paymentmethod}</h4>
                <div class="method">
                    <div class="method-item"><img src="../resources/images/payment-method-visa.png" alt=""></div>
                    <div class="method-item"><img src="../resources/images/payment-method-mastercard.png" alt=""></div>
                    <div class="method-item"><img src="../resources/images/payment-method-paypal.png" alt=""></div>
                    <div class="method-item"><img src="../resources/images/payment-method-discover.png" alt=""></div>
                    <div class="method-item"><img src="../resources/images/payment-method-amazon.png" alt=""></div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <p>${languageData.footer.copyright}</p>
    </div>
    `
}

renderFooter()