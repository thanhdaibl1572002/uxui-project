import { getLanguageData, formatPrice } from "../js/utils.js";

const renderSlider = async () => {
    const languageData = await getLanguageData();
    const slider = document.getElementById("slider")
    slider.innerHTML = `
        <div class="swiper">
            <div class="swiper-wrapper">

                <div class="swiper-slide">
                    <video autoplay muted loop>
                        <source src="../resources/videos/slide-1.mp4" type="video/mp4">
                    </video>
                    <div class="swiper-slide-content">
                        <div class="swiper-slide-content-title">
                            <h1>Xiaomi</h1>
                            <h2>13 Pro</h2>
                        </div>
                        <p>${languageData.slider.descriptions[0]}</p>
                        <a href="../pages/details.html">${languageData.slider.seemore} <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>

                <div class="swiper-slide">
                    <video autoplay muted loop>
                        <source src="../resources/videos/slide-2.mp4" type="video/mp4">
                    </video>
                    <div class="swiper-slide-content">
                        <div class="swiper-slide-content-title">
                            <h1>Oppo</h1>
                            <h2>Find X5</h2>
                        </div>
                        <p>${languageData.slider.descriptions[1]}</p>
                        <a href="../pages/details.html">${languageData.slider.seemore} <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>

                <div class="swiper-slide">
                    <video autoplay muted loop>
                        <source src="../resources/videos/slide-3.mp4" type="video/mp4">
                    </video>
                    <div class="swiper-slide-content">
                        <div class="swiper-slide-content-title">
                            <h1>Samsung</h1>
                            <h2>Galaxy S23</h2>
                        </div>
                        <p>${languageData.slider.descriptions[2]}</p>
                        <a href="../pages/details.html">${languageData.slider.seemore} <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>

            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"><i class="fa-solid fa-chevron-left"></i></div>
            <div class="swiper-button-next"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
    `
    
    new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

renderSlider()