
let udnAPI = {
    getSectionTypes: function () {return axios.get("/resources/data/type.json")},
    getNewsCarousel: function() {return axios.get("/resources/data/carousel.json")},
    getMedia: function() {return axios.get("/resources/data/media.json")},
    getArticle: function(parentId,taxonomyId,version) {return axios.get(`/template/articles/${parentId}/${version}/${taxonomyId}.html`)}
    
}