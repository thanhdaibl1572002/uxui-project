import { getLanguageData, getUniqueRam, getUniqueRom, getUniqueOS, getMaxPrice, getMinPrice, roundUp } from "../js/utils.js";
import { renderProductList } from "./product-list.js";
import { renderPagination, renderProductFound } from "./product-view.js";

const languageData = await getLanguageData();
const language = localStorage.getItem("language")

const renderProductFilter = async () => {
    const filter = document.getElementById("product-filter")

    const uniqueRam = await getUniqueRam();
    let htmlFilterRam = ''
    for (let i = 0; i < uniqueRam.length; i++) {
        htmlFilterRam += `<li data-ram="${uniqueRam[i]}">${uniqueRam[i]} GB</li>`
    }

    const uniqueRom = await getUniqueRom();
    let htmlFilterRom = ''
    for (let i = 0; i < uniqueRom.length; i++) {
        htmlFilterRom += `<li data-rom="${uniqueRom[i]}">${uniqueRom[i]} GB</li>`
    }

    const uniqueOS = await getUniqueOS();
    let htmlFilterOS = ''
    for (let i = 0; i < uniqueOS.length; i++) {
        htmlFilterOS += `<li data-os="${uniqueOS[i]}">${uniqueOS[i]}</li>`
    }

    const maxPrice = roundUp(await getMaxPrice());
    const minPrice = roundUp(await getMinPrice());
    const stepPrice = (maxPrice - minPrice) / 100;
    const gapPrice = (maxPrice - minPrice) / 10;
    let currencySymbol = ''
    if (language === 'vi') currencySymbol = 'VND'
    else if (language === 'en') currencySymbol = 'USD'
    else if (language === 'zh') currencySymbol = 'CNY'

    const htmlFilter = `
    <div class="product-filter-item">
        <h3>${languageData.filter.usageneeds.title}</h3>
        <div class="filter-by-usage-needs" id="filter-by-usage-needs">
            <div class="filter-by-usage-needs-item" data-usage-need="game">
                <img src="../resources/images/mobile-game.png" alt=""/>
                <span>${languageData.filter.usageneeds.items.game}</span>
            </div>
            <div class="filter-by-usage-needs-item" data-usage-need="battery">
                <img src="../resources/images/mobile-battery.png" alt=""/>
                <span>${languageData.filter.usageneeds.items.battery}</span>
            </div>
            <div class="filter-by-usage-needs-item" data-usage-need="camera">
                <img src="../resources/images/mobile-camera.png" alt=""/>
                <span>${languageData.filter.usageneeds.items.camera}</span>
            </div>
            <div class="filter-by-usage-needs-item" data-usage-need="chipset">
                <img src="../resources/images/mobile-chipset.png" alt=""/>
                <span>${languageData.filter.usageneeds.items.configuration}</span>
            </div>
        </div>
    </div>
    <div class="product-filter-item">
        <h3>${languageData.filter.specifications.title}</h3>
        <div class="filter-by-phone-specifications">
            <div class="filter-by-phone-specifications-item">
                <h4>${languageData.filter.specifications.items.ram}</h4>
                <ul id="filter-by-ram">${htmlFilterRam}</ul>
            </div>
            <div class="filter-by-phone-specifications-item">
                <h4>${languageData.filter.specifications.items.rom}</h4>
                <ul id="filter-by-rom">${htmlFilterRom}</ul>
            </div>
            <div class="filter-by-phone-specifications-item">
                <h4>${languageData.filter.specifications.items.screensize.title}</h4>
                <ul id="filter-by-screen-size">
                    <li data-size="under-6">${languageData.filter.specifications.items.screensize.items.under6inches}</li>
                    <li data-size="is-6">${languageData.filter.specifications.items.screensize.items.is6inches}</li>
                    <li data-size="over-6">${languageData.filter.specifications.items.screensize.items.over6inches}</li>
                </ul>
            </div>
            <div class="filter-by-phone-specifications-item">
                <h4>${languageData.filter.specifications.items.operatingsystem}</h4>
                <ul id="filter-by-operating-system">${htmlFilterOS}</ul>
            </div>
        </div>
    </div>

    <div class="product-filter-item">
        <h3>${languageData.filter.othercriteria.title}</h3>
        <div class="filter-by-other-criteria">
            <div class="filter-by-other-criteria-item" id="filter-by-price">
                <h4>${languageData.filter.othercriteria.items.price.title} (${currencySymbol})</h4>
                <div class="price-input">
                    <div class="number-input">
                        <div class="field">
                            <span>${languageData.filter.othercriteria.items.price.from}</span>
                            <input type="number" class="input-min" value="0">
                        </div>
                        <div class="field">
                            <span>${languageData.filter.othercriteria.items.price.to}</span>
                            <input type="number" class="input-max" value="${maxPrice}">
                        </div>
                    </div>
                    <div class="slider">
                        <div class="progress"></div>
                    </div>
                    <div class="range-input">
                        <input type="range" class="range-min" min="0" max="${maxPrice}" value="0" step="${stepPrice}">
                        <input type="range" class="range-max" min="0" max="${maxPrice}" value="${maxPrice}" step="${stepPrice}">
                    </div>
                </div>
            </div>
            <div class="filter-by-other-criteria-item">
                <h4>${languageData.filter.othercriteria.items.remainingcriteria.title}</h4>
                <ul id="filter-by-other">
                    <li data-other="discount">${languageData.filter.othercriteria.items.remainingcriteria.discount}</li>
                    <li data-other="highrating">${languageData.filter.othercriteria.items.remainingcriteria.highrating}</li>
                    <li data-other="authentic">${languageData.filter.othercriteria.items.remainingcriteria.authentic}</li>
                    <li data-other="greyimport">${languageData.filter.othercriteria.items.remainingcriteria.greyimport}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="product-filter-reset-buttons">
        <button id="product-filter-button"><i class="fa-solid fa-sliders"></i>${languageData.filter.buttons.apply}</button>
        <button id="product-reset-button"><i class="fa-solid fa-rotate-right"></i>${languageData.filter.buttons.reset}</button>
    </div>
    
    `

    filter.innerHTML = htmlFilter;

    const selectElements = (elements) => {
        elements.forEach((el) => {
            el.addEventListener("click", () => {
                if (el.classList.contains('active')) {
                    el.classList.remove('active');
                } else {
                    elements.forEach((el) => { el.classList.remove('active'); });
                    el.classList.add('active');
                }
            });
        });
    };

    const ramElements = document.querySelectorAll('#filter-by-ram li');
    const romElements = document.querySelectorAll('#filter-by-rom li');
    const screenSizeElements = document.querySelectorAll('#filter-by-screen-size li');
    const osElements = document.querySelectorAll('#filter-by-operating-system li');
    const otherElements = document.querySelectorAll('#filter-by-other li');
    const usageNeedElements = document.querySelectorAll('#filter-by-usage-needs .filter-by-usage-needs-item');

    selectElements(usageNeedElements);
    selectElements(ramElements);
    selectElements(romElements);
    selectElements(screenSizeElements);
    selectElements(osElements);
    selectElements(otherElements);


    const rangeInput = document.querySelectorAll("#product-filter .range-input input");
    const numberInput = document.querySelectorAll("#product-filter .number-input input");
    const progress = document.querySelector("#product-filter .progress")

    numberInput.forEach(input => {
        input.addEventListener("input", e => {
            let minVal = parseInt(numberInput[0].value);
            let maxVal = parseInt(numberInput[1].value);
            console.log(maxVal)
            if ((maxVal - minVal >= gapPrice) && maxVal <= maxPrice) {
                if (e.target.className === "input-min") {
                    rangeInput[0].value = minVal;
                    progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
                } else {
                    rangeInput[1].value = maxVal;
                    progress.style.right = Math.floor(100 - (maxVal / rangeInput[1].max) * 100) + "%";
                }
            }
        })
    })

    rangeInput.forEach(input => {
        input.addEventListener("input", e => {
            let minVal = parseInt(rangeInput[0].value);
            let maxVal = parseInt(rangeInput[1].value);
            if (maxVal - minVal < gapPrice) {
                if (e.target.className === "range-min") {
                    rangeInput[0].value = maxVal - gapPrice;
                } else {
                    rangeInput[1].value = minVal + gapPrice;
                }
            } else {
                numberInput[0].value = minVal;
                numberInput[1].value = maxVal;
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
                progress.style.right = Math.floor(100 - (maxVal / rangeInput[1].max) * 100) + "%";
                if (progress.style.right === "0%") {
                    rangeInput[1].value = maxPrice;
                    numberInput[1].value = maxPrice;
                }
            }
        })
    })

    const productFilterButton = document.getElementById('product-filter-button');

    productFilterButton.addEventListener('click', async () => {
        const brand = localStorage.getItem('brand') || '';
        const segmentation = localStorage.getItem('segmentation') || '';
        const name = localStorage.getItem('name') || '';
        let filterConditions = { usageNeeds: '', ram: 0, rom: 0, screenSize: 0, operatingSystem: '', minPrice: 0, maxPrice: 0, other: '', brand: brand, segmentation: segmentation, name: name};

        const activeUsageNeedItem = document.querySelector('.filter-by-usage-needs-item.active');
        const usageNeeds = activeUsageNeedItem ? activeUsageNeedItem.dataset.usageNeed : '';
        filterConditions.usageNeeds = usageNeeds;

        const activeRamItem = document.querySelector('#filter-by-ram li.active');
        const ram = activeRamItem ? activeRamItem.dataset.ram : 0;
        filterConditions.ram = parseInt(ram);

        const activeRomItem = document.querySelector('#filter-by-rom li.active');
        const rom = activeRomItem ? activeRomItem.dataset.rom : 0;
        filterConditions.rom = parseInt(rom);

        const activeScreenSizeItem = document.querySelector('#filter-by-screen-size li.active');
        const screenSize = activeScreenSizeItem ? activeScreenSizeItem.dataset.size : 0;
        filterConditions.screenSize = screenSize;

        const activeOperatingSystemItem = document.querySelector('#filter-by-operating-system li.active');
        const operatingSystem = activeOperatingSystemItem ? activeOperatingSystemItem.dataset.os : '';
        filterConditions.operatingSystem = operatingSystem;

        const minPrice = parseInt(document.querySelector('.input-min').value);
        const maxPrice = parseInt(document.querySelector('.input-max').value);
        filterConditions.minPrice = minPrice;
        filterConditions.maxPrice = maxPrice;

        const activeOtherItem = document.querySelector('#filter-by-other li.active');
        const other = activeOtherItem ? activeOtherItem.dataset.other : '';
        filterConditions.other = other;

        localStorage.setItem('filterConditions', JSON.stringify(filterConditions));
        renderProductList();
        renderPagination();
        renderProductFound();

        const offset = document.getElementById('view-products').offsetTop - 20;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    });

    const productResetButton = document.getElementById('product-reset-button');
    productResetButton.addEventListener('click', () => {
        resetFilter();
    })
}

renderProductFilter()

export const resetFilter = async () => {
    const brand = localStorage.getItem('brand') || '';
    const segmentation = localStorage.getItem('segmentation') || '';
    const name = localStorage.getItem('name') || '';
    const filterConditions = { usageNeeds: '', ram: 0, rom: 0, screenSize: 0, operatingSystem: '', minPrice: 0, maxPrice: 0, other: '', brand: brand, segmentation: segmentation, name: name};
    localStorage.setItem('filterConditions', JSON.stringify(filterConditions));
    const filter = document.getElementById("product-filter")
    const activeElements = filter.querySelectorAll('.active');
    activeElements.forEach((element) => {
        element.classList.remove('active');
    });
    const rangeInput = document.querySelectorAll("#product-filter .range-input input");
    const numberInput = document.querySelectorAll("#product-filter .number-input input");
    const progress = document.querySelector("#product-filter .progress")
    rangeInput[0].value = numberInput[0].value = 0;
    rangeInput[1].value = numberInput[1].value = roundUp(await getMaxPrice());
    progress.style.left = "0";
    progress.style.right = "0";
    renderProductList();
    renderPagination();
    renderProductFound();
    const offset = document.getElementById('view-products').offsetTop - 20;
    window.scrollTo({ top: offset, behavior: 'smooth' });
}

