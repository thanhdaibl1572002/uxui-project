import { getLanguageData } from "./utils.js";

const languageData = await getLanguageData();
document.title = languageData.homeTitle;

window.addEventListener('beforeunload', () => {
    localStorage.removeItem("filterConditions");
    localStorage.removeItem("pageLimit");
    localStorage.removeItem("sortCondition");
    localStorage.removeItem("currentPage");
    localStorage.removeItem("totalPages");
    localStorage.removeItem("brand");
    localStorage.removeItem("segmentation");
    localStorage.removeItem("name");
})

const backToTopButton = document.getElementById("back-to-top");

window.onscroll = () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.classList.add("active");
    } else {
        backToTopButton.classList.remove("active");
    }
}

backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const homeSubTitles = document.querySelectorAll(".home-sub-title");
homeSubTitles[0].innerText = languageData.homeSubTitleServices;
homeSubTitles[1].innerText = languageData.homeSubTitleOutstanding;
homeSubTitles[2].innerText = languageData.homeSubTitleProducts;