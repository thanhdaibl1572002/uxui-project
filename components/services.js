import { getLanguageData } from "../js/utils.js";

const renderServices = async () => {
    const languageData = await getLanguageData();
    const services = document.getElementById("services");
    services.innerHTML = `
        <div class="services-item">
            <div class="services-item-left">
                <img src="../resources/images/icon-delivery.png" alt="">
            </div>
            <div class="services-item-right">
                <h3>${languageData.services.delivery.title}</h3>
                <span>${languageData.services.delivery.description}</span>
            </div>
        </div>
        <div class="services-item">
            <div class="services-item-left">
                <img src="../resources/images/icon-support.png" alt="">
            </div>
            <div class="services-item-right">
                <h3>${languageData.services.support.title}</h3>
                <span>${languageData.services.support.description}</span>
            </div>
        </div>
        <div class="services-item">
            <div class="services-item-left">
                <img src="../resources/images/icon-return.png" alt="">
            </div>
            <div class="services-item-right">
                <h3>${languageData.services.return.title}</h3>
                <span>${languageData.services.return.description}</span>
            </div>
        </div>
        <div class="services-item">
            <div class="services-item-left">
                <img src="../resources/images/icon-discount.png" alt="">
            </div>
            <div class="services-item-right">
                <h3>${languageData.services.discount.title}</h3>
                <span>${languageData.services.discount.description}</span>
            </div>
        </div>
    `
}

renderServices();