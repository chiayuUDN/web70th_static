function selectTabs(event, id) {
    const tabs = document.querySelectorAll(id + " .tab");
    const articles = document.querySelectorAll(id + " .secend-category-article");
    const articleId = event.target.dataset.id;
    tabs.forEach(tab => {
        tab.classList.remove("selected");
    })
    articles.forEach(article => {
        article.classList.remove("showArticle");
    })
    event.target.classList.add("selected");
    document.querySelector("#" + articleId).classList.add("showArticle");
}