function selectTabs(event, id, level) { //傳入事件, 文章id, 分類
    if(level == 2) {
        var tabs = document.querySelectorAll("#"+id + " .tabs-2th .tab");
        var articles = document.querySelectorAll("#"+id + " .secend-category-article");
    } else if(level == 3) {
        var tabs = document.querySelectorAll("#"+id + " .tabs-3th .tab");
        var articles = document.querySelectorAll("#"+id + " .third-category-article");
    } else if(level == 4) {
        var tabs = document.querySelectorAll("#"+id + " .tabs-4th .tab");
        var articles = document.querySelectorAll("#"+id + " .fourth-category-article");
    }
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