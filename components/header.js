import { getLanguageData, getProductByName, formatPrice } from "../js/utils.js";
import { resetFilter } from "./product-filter.js";
import { renderProductList } from "./product-list.js";
import { renderPagination, renderProductFound } from "./product-view.js";

const renderHeader = async () => {
    const languageData = await getLanguageData();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const user = JSON.parse(localStorage.getItem('user')) || undefined;

    const header = document.getElementById("header");

    header.innerHTML = `
        <div class="header-top">
            <div class="header-top-left">
                <div class="header-top-left-item" id="header-address">
                    <i class="fa-solid fa-location-dot"></i>
                    ${languageData.header.headerTop.address}
                </div>
                <div class="header-top-left-item" id="header-phone">
                    <i class="fa-solid fa-phone"></i>
                    ${languageData.header.headerTop.phone}
                </div>
                <div class="header-top-left-item" id="header-email">
                    <i class="fa-solid fa-envelope"></i>
                    ${languageData.header.headerTop.email}
                </div>
            </div>
            <div class="header-top-right">
                <div class="header-top-right-item" id="header-language">
                    <i class="fa-solid fa-globe"></i>
                    <div class="dropdown">
                        <div class="select">
                            <span class="selected">${languageData.header.headerTop.languages.selected}</span>
                            <i class="fa-solid fa-caret-down"></i>
                        </div>
                        <ul class="menu">
                            <li id="viLang"><img src="../resources/images/icon-vietnam.png" alt="vietnam" />${languageData.header.headerTop.languages.vietnamese}</li>
                            <li id="enLang"><img src="../resources/images/icon-usa.png" alt="usa" />${languageData.header.headerTop.languages.english}</li>
                            <li id="zhLang"><img src="../resources/images/icon-china.png" alt="china" />${languageData.header.headerTop.languages.chinese}</li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
            <div class="header-center">
                <div class="header-center-logo" id="header-logo">
                    <a href="./home.html">
                        <img src="../resources/images/logo.png" alt="uxui shop logo" />
                        UXUI<span>SHOP</span>
                    </a>
                </div>
                <ul class="header-center-navigations" id="header-navigations">
                    <li class="active"><a href="./home.html">${languageData.header.headerCenter.navigations.home}</a></li>
                    <li><a href="./home.html">${languageData.header.headerCenter.navigations.policy}</a></li>
                    <li><a href="./home.html">${languageData.header.headerCenter.navigations.sale}</a></li>
                    <li><a href="./home.html">${languageData.header.headerCenter.navigations.contact}</a></li>
                </ul>
                <div class="header-center-authentication" id="header-authentication">
                    ${user ? `
                    <div class="setting-account">
                        ${languageData.header.headerCenter.welcome}, 
                        <span>${user.name}!</span>
                        <i class="fa-solid fa-gear"></i>
                        <ul class="menu">
                            <li><i class="fa-solid fa-pen-to-square"></i>${languageData.header.headerCenter.menu.editProfile}</li>
                            <li><i class="fa-solid fa-key"></i>${languageData.header.headerCenter.menu.changePassword}</li>
                            <li id="signout-button"><i class="fa-solid fa-right-from-bracket"></i>${languageData.header.headerCenter.menu.signout}</li>
                        </ul>
                    </div>
                    ` : 
                    `
                    <button id="signup-button"><i class="fa-solid fa-user-plus"></i>${languageData.header.headerCenter.buttons.signup}</button>
                    <button id="signin-button"><i class="fa-solid fa-right-to-bracket"></i>${languageData.header.headerCenter.buttons.signin}</button>
                    `} 
                </div>
            </div>
            <div class="header-bottom">
            <div class="header-bottom-left">
                <div class="header-bottom-left-item" id="header-categories">
                    <i class="fa-solid fa-list-ul"></i>
                    <div class="dropdown">
                        <div class="select">
                            <span class="selected">${languageData.header.headerBottom.categories.title}</span>
                            <i class="fa-solid fa-caret-down"></i>
                        </div>
                        <ul class="menu" id="filter-by-segmentation">
                            <li data-segmentation="${languageData.header.headerBottom.categories.inexpensive}">${languageData.header.headerBottom.categories.inexpensive}</li>
                            <li data-segmentation="${languageData.header.headerBottom.categories.moderate}">${languageData.header.headerBottom.categories.moderate}</li>
                            <li data-segmentation="${languageData.header.headerBottom.categories.luxury}">${languageData.header.headerBottom.categories.luxury}</li>
                        </ul>
                    </div>
                </div>
                <div class="header-bottom-left-item" id="header-brands">
                    <i class="fa-solid fa-tags"></i>
                    <div class="dropdown">
                        <div class="select">
                            <span class="selected">${languageData.header.headerBottom.brands.title}</span>
                            <i class="fa-solid fa-caret-down"></i>
                        </div>
                        <ul class="menu" id="filter-by-brand">
                            <li data-brand="${languageData.header.headerBottom.brands.apple}"><img src="../resources/images/logo-apple.png" alt="logo apple" />${languageData.header.headerBottom.brands.apple}</li>
                            <li data-brand="${languageData.header.headerBottom.brands.samsung}"><img src="../resources/images/logo-samsung.png" alt="logo samsung" />${languageData.header.headerBottom.brands.samsung}</li>
                            <li data-brand="${languageData.header.headerBottom.brands.oppo}"><img src="../resources/images/logo-oppo.png" alt="logo oppo" />${languageData.header.headerBottom.brands.oppo}</li>
                            <li data-brand="${languageData.header.headerBottom.brands.xiaomi}"><img src="../resources/images/logo-xiaomi.png" alt="logo xiaomi" />${languageData.header.headerBottom.brands.xiaomi}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="header-bottom-center">
                <div class="search-box">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" id="header-search" placeholder="${languageData.header.headerBottom.search.placeholder}" />
                    <button id="header-search-button">${languageData.header.headerBottom.search.button}</button>
                    <div class="search-box-history" id="search-box-history">
                        <span><i class="fa-solid fa-clock-rotate-left"></i>${languageData.header.headerBottom.search.history}</span>
                        <ul id="search-history"></ul>
                    </div>
                    <div class="search-box-recommended" id="search-box-recommended">
                        <span><i class="fa-regular fa-circle-question"></i>${languageData.header.headerBottom.search.recommended}</span>
                        <ul id="search-recommended"></ul>
                    </div> 
                </div>
            </div>
            <div class="header-bottom-right">
                <a href="./order.html" class="header-bottom-right-item"  id="header-order">
                    <!-- <span>99+</span> -->
                    <i class="fa-solid fa-clipboard-list"></i>
                    ${languageData.header.headerBottom.order}
                </a>
                <a href="./home.html" class="header-bottom-right-item"  id="header-wishlist">
                    <!-- <span>99+</span> -->
                    <i class="fa-solid fa-heart"></i>
                    ${languageData.header.headerBottom.wishlist}
                </a>
                <a href="#" class="header-bottom-right-item"  id="header-cart"></a>
            </div>
        </div>
    `
    // ========================================== Sự kiện ==========================================

    // Xét ngôn ngữ
    document.getElementById("viLang").addEventListener("click", () => {
        localStorage.setItem("language", "vi")
        location.reload()
    })

    document.getElementById("enLang").addEventListener("click", () => {
        localStorage.setItem("language", "en")
        location.reload()
    })

    document.getElementById("zhLang").addEventListener("click", () => {
        localStorage.setItem("language", "zh")
        location.reload()
    })

    const signUp = document.getElementById('sign-up');
    const signIn = document.getElementById('sign-in');
    const signUpButton = document.getElementById('signup-button');
    const signInButton = document.getElementById('signin-button');
    const signOutButton = document.getElementById("signout-button");
    const background = document.getElementById('background');

    if (signUpButton) {
        signUpButton.addEventListener("click", () => {
            signUp.classList.add('active');
            background.classList.add('active');
        });
    } 

    if (signInButton) {
        signInButton.addEventListener("click", () => {
            signIn.classList.add('active');
            background.classList.add('active');
        });
    }

    if (signOutButton) {
        signOutButton.addEventListener('click', () => {
            if (user) {
                localStorage.removeItem("user");
                window.location.reload();
            }
        })
    }

    const offset = document.getElementById('view-products').offsetTop - 20;
    const applyFilter = (filterType, filterValue) => {
        resetFilter();
        let filterConditions;
        if (filterType === 'segmentation') {
            localStorage.setItem('segmentation', filterValue);
            localStorage.setItem('brand', '');
            localStorage.setItem('name', '');
            filterConditions = {
                usageNeeds: '', ram: 0, rom: 0, screenSize: 0, operatingSystem: '',
                minPrice: 0, maxPrice: 0, other: '', brand: '', segmentation: filterValue, name: ''
            };
        } else if (filterType === 'brand') {
            localStorage.setItem('segmentation', '');
            localStorage.setItem('brand', filterValue);
            localStorage.setItem('name', '');
            filterConditions = {
                usageNeeds: '', ram: 0, rom: 0, screenSize: 0, operatingSystem: '',
                minPrice: 0, maxPrice: 0, other: '', brand: filterValue, segmentation: '', name: ''
            };
        } else if (filterType === 'name') {
            localStorage.setItem('segmentation', '');
            localStorage.setItem('brand', '');
            localStorage.setItem('name', filterValue);
            filterConditions = {
                usageNeeds: '', ram: 0, rom: 0, screenSize: 0, operatingSystem: '',
                minPrice: 0, maxPrice: 0, other: '', brand: '', segmentation: '', name: filterValue
            };
        }

        localStorage.setItem('filterConditions', JSON.stringify(filterConditions));
        renderProductList();
        renderPagination();
        renderProductFound();
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }

    const segmentationItems = document.querySelectorAll('#filter-by-segmentation li');
    segmentationItems.forEach((segmentationItem) => {
        segmentationItem.addEventListener('click', () => {
            applyFilter('segmentation', segmentationItem.dataset.segmentation);
        });
    });

    const brandItems = document.querySelectorAll('#filter-by-brand li');
    brandItems.forEach((brandItem) => {
        brandItem.addEventListener('click', () => {
            applyFilter('brand', brandItem.dataset.brand);
        })
    })

    const headerSearch = document.getElementById("header-search");
    const searchBoxHistoryElm = document.getElementById("search-box-history");
    const searchHistotyElm = document.getElementById("search-history");

    headerSearch.addEventListener("focus", (event) => {
        if (!event.target.value) {
            let searchHistoty = JSON.parse(localStorage.getItem('searchHistoty')) || [];
            searchHistoty.reverse();
            searchHistoty = searchHistoty.slice(0, 5);
            if (searchHistoty && searchHistoty.length > 0) {
                searchBoxHistoryElm.style.display = "flex";
                let htmlSearchHistory = '';
                if (searchHistoty) {
                    for (let i = 0; i < searchHistoty.length; i++) {
                        htmlSearchHistory += `<li data-histoty="${searchHistoty[i]}">${searchHistoty[i]}</li>`
                    }
                }
                searchHistotyElm.innerHTML = htmlSearchHistory;
                const listSearchHistotyElm = searchHistotyElm.querySelectorAll('li');
                listSearchHistotyElm.forEach(li => {
                    li.addEventListener("click", () => {
                        applyFilter('name', li.textContent);
                        searchBoxHistoryElm.style.display = "none";
                        headerSearch.value = li.textContent;
                    })
                })
            } else {
                searchBoxHistoryElm.style.display = "none";
            }
        }
    });


    headerSearch.addEventListener('keydown', (event) => {
        const data = event.target.value.trim();
        if (data && event.key === 'Enter') {
            let searchHistory = JSON.parse(localStorage.getItem('searchHistoty')) || [];
            if (searchHistory.indexOf(data) === -1) {
                searchHistory.push(data);
            }
            localStorage.setItem('searchHistoty', JSON.stringify(searchHistory));
            applyFilter('name', data);
            searchBoxHistoryElm.style.display = 'none';
            searchBoxRecommendedElm.style.display = 'none';
            if (!headerSearch.value) {
                headerSearch.value = data;
            }
        }
    });

    const headerSearchButton = document.getElementById("header-search-button");
    headerSearchButton.addEventListener('click', () => {
        const data = headerSearch.value.trim();
        if (data) {
            let searchHistory = JSON.parse(localStorage.getItem('searchHistoty')) || [];
            if (searchHistory.indexOf(data) === -1) {
                searchHistory.push(data);
            }
            localStorage.setItem('searchHistoty', JSON.stringify(searchHistory));
            applyFilter('name', data);
            headerSearch.value = data;
        }
        searchBoxHistoryElm.style.display = 'none';
        searchBoxRecommendedElm.style.display = 'none';
    });


    document.addEventListener('click', (event) => {
        if (!searchBoxHistoryElm.contains(event.target)
            && !event.target.closest('#search-box-history')
            && !event.target.closest('#header-search')) {
            searchBoxHistoryElm.style.display = 'none';
        }
    });

    const searchBoxRecommendedElm = document.getElementById("search-box-recommended");
    const searchRecommendedElm = document.getElementById("search-recommended");
    headerSearch.addEventListener('keyup', async (event) => {
        const data = event.target.value.trim();
        let htmlRecommended = ''
        if (data) {
            const products = await getProductByName(data);
            searchBoxHistoryElm.style.display = 'none';
            if (products && products.length > 0) {
                for (let i = 0; i < products.length; i++) {
                    htmlRecommended += `
                        <li class="search-recommended-item">
                            <a href="../pages/details.html?id=${products[i].id}">
                                <div class="search-recommended-item-image">
                                    <img src="${products[i].images[0].url}" alt="" />
                                </div>
                                <div class="search-recommended-item-info">
                                    <h1>${products[i].name}</h1>
                                    <div class="price">${formatPrice(products[i].price, products[i].discount)}<span>${products[i].discount != 0 ? formatPrice(products[0].price, 0) : ``}</span></div>
                                    <div class="memory">RAM/ROM: <span>${products[i].ram}/${products[i].rom} GB</span></div>
                                </div>
                            </a>
                        </li>
                    `;
                }
                searchBoxRecommendedElm.style.display = 'flex';
            } else {
                searchBoxRecommendedElm.style.display = 'none';
            }
        } else {
            htmlRecommended = ''
            searchBoxRecommendedElm.style.display = 'none';
        }
        searchRecommendedElm.innerHTML = htmlRecommended;
    });

    document.addEventListener('click', (event) => {
        if (!searchBoxRecommendedElm.contains(event.target)
            && !event.target.closest('#search-box-recommended')
            && !event.target.closest('#header-search')) {
            searchBoxRecommendedElm.style.display = 'none';
        }
    });

    const headerCart = document.getElementById("header-cart");
    const subcart = document.getElementById("sub-cart");
    headerCart.addEventListener('click', () => {
        background.classList.add('active');
        subcart.classList.add('active');
    })
}

renderHeader();

export const updateCartQuantity = async () => {
    const languageData = await getLanguageData();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const headerCart = document.getElementById("header-cart");
    headerCart.innerHTML = `
        ${cart.length > 0 ? `<span>${cart.length > 99 ? `99+` : cart.length}</span>` : ``}
        <i class="fa-solid fa-cart-shopping"></i>
        ${languageData.header.headerBottom.cart}
    `
};

updateCartQuantity();
