import { renderProductList } from "./product-list.js";
import { getLanguageData, getTotalPages, getNumberProducts } from "../js/utils.js";
import { resetFilter } from "./product-filter.js";

const languageData = await getLanguageData();

export const renderPagination = async () => {
    const currentPageValue = parseInt(localStorage.getItem("currentPage")) || 1;
    const totalPages = await getTotalPages();
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = `
    <button id="pagination-prev"><i class="fa-solid fa-arrow-left"></i></button>
    ${languageData.view.page} <input type="number" id="pagination-currentPage" value="${currentPageValue}"/> / ${totalPages}
    <button id="pagination-next"><i class="fa-solid fa-arrow-right"></i></button>
    `;
    
    document.getElementById('pagination-prev').addEventListener('click', () => {
        let currentPage = parseInt(localStorage.getItem("currentPage"))  || 1;
        if (currentPage > 1) {
            currentPage--;
            localStorage.setItem("currentPage", currentPage);
            renderProductList();
            renderPagination();
            renderProductFound();
        } 
    });

    document.getElementById('pagination-next').addEventListener('click', () => {
        let currentPage = parseInt(localStorage.getItem("currentPage"))  || 1;
        if (currentPage < totalPages) {
            currentPage++;
            localStorage.setItem("currentPage", currentPage);
            renderProductList();
            renderPagination();
            renderProductFound();
        } 
    });

    document.getElementById('pagination-currentPage').addEventListener('change', (event) => {
        let newPage = parseInt(event.target.value);
        if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
            let currentPage = newPage;
            localStorage.setItem("currentPage", currentPage);
            renderProductList();
            renderPagination();
            renderProductFound();
        } else {
            const currentPage = localStorage.getItem("currentPage") || 1; 
            if (totalPages === 1) 
                event.target.value = 1;
            else 
                event.target.value = currentPage;
        }
    });

}

export const renderProductFound = async () => {
    const productFound = document.getElementById("product-found");
    const brand = localStorage.getItem('brand') || '';
    const segmentation = localStorage.getItem('segmentation') || '';
    const name = localStorage.getItem('name') || '';
    const numberProducts = await getNumberProducts();
    let htmlProductFound = '';
    if (numberProducts > 0) {
        if (name && !brand && !segmentation) {
            htmlProductFound += `${languageData.view.search} <b>"${name}"</b> (${numberProducts} ${languageData.view.products})`
        }
        if (brand && !name && !segmentation) {
            htmlProductFound += `${languageData.view.search} <b>${brand}</b> (${numberProducts} ${languageData.view.products})`
        }
        if (segmentation && !name && !brand) {
            htmlProductFound += `${languageData.view.search} <b>${segmentation}</b> (${numberProducts} ${languageData.view.products})`
        }
    } else {
        htmlProductFound = `${languageData.view.notfound}.`
    }
    if (htmlProductFound) {
        document.querySelector('#product-list .product-list-top').style.rowGap = "15px";
    } else {
        document.querySelector('#product-list .product-list-top').style.rowGap = "0";
    }
    productFound.innerHTML = htmlProductFound;
};

const renderViewProducts = async () => {
    const viewProducts = document.getElementById("view-products");

    viewProducts.innerHTML = `
        <div class="product-list-top-left"  id="product-found"></div>
        <div class="product-list-top-right">
            <div class="product-list-top-right-left">
                <div class="pagination" id="pagination"></div>
                <div class="dropdown">
                    <div class="select" id="sort-products-select">
                        <span class="selected"><i class="fa-solid fa-arrow-right-arrow-left fa-rotate-90"></i>${languageData.view.sort.newest}</span>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                    <ul class="menu" id="sort-products-menu">
                        <li data-sort="newest">${languageData.view.sort.newest}</li>
                        <li data-sort="top-rated">${languageData.view.sort.toprated}</li>
                        <li data-sort="price-low-to-high">${languageData.view.sort.pricelowtohigh}</li>
                        <li data-sort="price-high-to-low">${languageData.view.sort.pricehightolow}</li>
                    </ul>
                </div>
                <div class="dropdown">
                    <div class="select" id="page-limit-products-select">
                        <span class="selected"><i class="fa-regular fa-eye"></i>${languageData.view.show.show} 8 ${languageData.view.show.products}</span>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                    <ul class="menu" id="page-limit-products-menu">
                        <li data-page_limit="8">${languageData.view.show.show} 8 ${languageData.view.show.products}</li>
                        <li data-page_limit="12">${languageData.view.show.show} 12 ${languageData.view.show.products}</li>
                        <li data-page_limit="16">${languageData.view.show.show} 16 ${languageData.view.show.products}</li>
                        <li data-page_limit="20">${languageData.view.show.show} 20 ${languageData.view.show.products}</li>
                    </ul>
                </div>
            </div>
            <div class="product-list-top-right-right">
                <button class="grid-view active" title="${languageData.view.show4}">
                    <i class="fa-solid fa-grip-vertical"></i>
                    <i class="fa-solid fa-grip-vertical"></i>
                </button>
                <button class="list-view" title="${languageData.view.show2}">
                    <i class="fa-solid fa-grip-vertical"></i>
                </button>
                <button class="reload-view" title="${languageData.view.reset}">
                    <i class="fa-solid fa-rotate-right"></i>
                </button>
            </div>
        </div>
    `

    const sortSelect = document.getElementById('sort-products-select');
    const sortMenu = document.getElementById('sort-products-menu');
    const sortItems = sortMenu.querySelectorAll('li');
    const sortSelected = sortSelect.querySelector('.selected');

    sortItems.forEach(item =>
        item.addEventListener('click', () => {
            sortSelected.innerHTML = `<i class="fa-solid fa-arrow-right-arrow-left fa-rotate-90"></i>${item.innerText}`;
            sortMenu.classList.remove('active');
            const sortCondition = item.dataset.sort;
            localStorage.setItem("sortCondition", sortCondition);
            renderProductList();
        })
    );

    sortSelect.addEventListener('click', e => {
        sortMenu.classList.toggle('active');
        e.stopPropagation();
    });


    document.addEventListener('click', e => {
        if (!sortMenu.contains(e.target)) {
            sortMenu.classList.remove('active');
        }
    });


    const pageLimitSelect = document.getElementById('page-limit-products-select');
    const pageLimitMenu = document.getElementById('page-limit-products-menu');
    const pageLimitItems = pageLimitMenu.querySelectorAll('li');
    const pageLimitSelected = pageLimitSelect.querySelector('.selected');

    pageLimitItems.forEach(item =>
        item.addEventListener('click', () => {
            pageLimitSelected.innerHTML = `<i class="fa-regular fa-eye"></i>${item.innerText}`;
            pageLimitMenu.classList.remove('active');
            const pageLimit = parseInt(item.dataset.page_limit);
            localStorage.setItem("pageLimit", pageLimit);
            renderProductList();
            renderPagination();
        })
    );

    pageLimitSelect.addEventListener('click', e => {
        pageLimitMenu.classList.toggle('active');
        e.stopPropagation();
    });

    document.addEventListener('click', e => {
        if (!pageLimitMenu.contains(e.target)) {
            pageLimitMenu.classList.remove('active');
        }
    });

    renderPagination();
    renderProductFound();

    const gridBtn = document.querySelector('.grid-view');
    const listBtn = document.querySelector('.list-view');
    const reloadBtn = document.querySelector('.reload-view');
    const productList = document.querySelector('.product-list-bottom');

    gridBtn.addEventListener('click', () => {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        productList.classList.remove('active')
    });

    listBtn.addEventListener('click', () => {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        productList.classList.add('active');
    });

    reloadBtn.addEventListener('click', () => {
        localStorage.removeItem('brand');
        localStorage.removeItem('segmentation');
        localStorage.removeItem('name');
        const filterConditions = { usageNeeds: '', ram: 0, rom: 0, screenSize: 0, operatingSystem: '', minPrice: 0, maxPrice: 0, other: '', brand: '', segmentation: '', name: ''};
        localStorage.setItem('filterConditions', JSON.stringify(filterConditions));
        resetFilter();
    });

}

renderViewProducts();



