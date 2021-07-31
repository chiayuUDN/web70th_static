w3.includeHTML(() => {

    let udnHomeVue = new Vue({
        el: '#udn-home',
        data: {
            sectionTypes: {},
            sectionArticles: {},
            newsCarouselBlock: 'activiti',
            specialBlock: 'mediaFeature',
            tabs: {}, // 紀錄選擇的tabs
            order: 1,
            media: media,
            site: null,
            init: {},
            carousel: { // 最新消息輪播
                timer: null,
                show: 0,
                transitionName: 'right-in',
                length: 0,
                img: [
                    {src:'/resources/img/1.jpg'},
                    {src:'/resources/img/2.jpg'},
                    {src:'/resources/img/3.jpg'},
                ]
            },
            parentId: null
        },
        created() {
            udnAPI.getSectionTypes().then(response => {
                if(response.data.success) {
                    let result = response.data.result;
                    this.sectionTypes = result;

                    result.childTaxonomies.forEach(children => {
                        this.init[children.taxonomyId] = true;

                        if(children.taxonomyId == this.newsCarouselBlock) {
                            //輪播區塊

                            let payload = null
                            this.getTaxonomyArticlesAPI(children,'first',payload)
                        }

                        if(children.taxonomyId == this.specialBlock) {
                            let payload = {
                                parentId: 'main-category',
                                taxonomyId: children.taxonomyId
                            }
                            this.getTaxonomyArticlesAPI(children,'first',payload)
                        }
                    })

                    filledTab(this,this.sectionTypes,this.order);
                } else {console.log('error')}
            }).catch(error => console.log(error));
        },
        mounted() {
            this.carouselStart();
        },
        methods: {
            selectedTab(parentsIdKey,childrenId) {
                this.tabs[parentsIdKey] = childrenId;
                this.$forceUpdate(); // 強迫更新畫面
            },
            isCurrentTab(parentsIdKey,childrenId){
                return this.tabs[parentsIdKey] == childrenId;
            },
            getTaxonomyArticlesAPI(item,type, payload = null) {
                if(item.taxonomyId == this.newsCarouselBlock) {
                    //輪播文章
                    udnAPI.getNewsCarousel().then(response => {
                        let result = response.data.result;
                        if(response.data.success) {
    
                            if(item.taxonomyId == this.newsCarouselBlock) {
                                
                                this.$set(this.sectionArticles,item.taxonomyUid,result);
                                this.carousel.length = this.sectionArticles[item.taxonomyUid].length
                            }

                        } else {console.log('error')}
                    }).catch(error => console.log(error));

                } else if(item.taxonomyId == this.specialBlock){

                    udnAPI.getArticle('main-category',payload.taxonomyId).then(response => {

                        let result = response.data;
                        if(result) {
                            this.$set(this.sectionArticles,item.taxonomyUid,result);

                        } else {console.log('error')}

                    }).catch(error => console.log(error));
                } else {
                    //其他區塊 html
                    udnAPI.getArticle(payload.parentId,payload.taxonomyId).then(response => {

                        let result = response.data;

                        if(result) {
    
                            this.$set(this.sectionArticles,item.taxonomyUid,result);

                        } else {console.log('error')}

                    }).catch(error => console.log(error));
                }
            },
            carouselStop(){
                clearInterval(this.carousel.timer);
            },
            carouselStart(){
                this.carousel.timer = setInterval(()=>{
                    this.carousel.show ++;
                }, 5000);
            }
        },
        watch: {
            'carousel.show': function(nVal, oVal){
                let length = this.carousel.length;
                if (nVal < 0) {
                    this.carousel.show = length - 1;
                } else if(nVal > length - 1) {
                    this.carousel.show = 0;
                } else {
                    if(oVal < 0) this.transitionName = 'left-in';
                    else if(oVal > length - 1) this.carouseltransitionName = 'right-in';
                    else this.transitionName = nVal > oVal ? 'right-in' : 'left-in';
                }
            }
        }
    })
    
    // 傳入分類與層數，來記錄整個資料的第一個分類ID
    function filledTab(app,taxonomies, order) {
        taxonomies.childTaxonomies.forEach(parent => {
        
            if(parent.childTaxonomies.length != 0) {

                parent.childTaxonomies.forEach((children, childrenIdx) => {

                    if(childrenIdx == 0) {

                        app.tabs[`${parent.taxonomyId}${order}TH`] = children.taxonomyId;

                        
                        
                    }

                    if(children.childTaxonomies.length == 0) {
                        let payload = getTaxonomyId(app,taxonomies,parent,children,order);
                        app.getTaxonomyArticlesAPI(children,'first',payload);
                        
                    }
                })
    
                filledTab(app,parent, order + 1);
                
            } else { return }
        });
    }

    function getTaxonomyId(app,category,parent,children,order){
        let taxonomyId;

        if(order == 1 ) {

            taxonomyId = `${children.taxonomyId}`;

            app.parentId = parent.taxonomyId;

        } else if(order == 2) {

            taxonomyId = `${parent.taxonomyId}-${children.taxonomyId}`;

        } else if(order == 3) {

            taxonomyId = `${category.taxonomyId}-${parent.taxonomyId}-${children.taxonomyId}`;

        }

        return {
            taxonomyId: taxonomyId,
            parentId: app.parentId
        }
    }

})


