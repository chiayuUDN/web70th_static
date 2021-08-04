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
            site: site,
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
            mediaCard: {
                cards:[],
                count: 1,
            },
            mediaShow: [],
            finish: false
        },
        created() {
            udnAPI.getSectionTypes().then(response => {
                if(response.data.success) {
                    let result = response.data.result;
                    this.sectionTypes = result;

                    result.childTaxonomies.forEach(children => {
                        this.init[children.taxonomyId] = true;

                        if(children.taxonomyId == this.newsCarouselBlock || children.taxonomyId == this.specialBlock) {
                            // 輪播文章, 媒體發展
                            this.init[children.taxonomyId] = false;
                            this.getTaxonomyArticlesAPI(children,'first',null)
                        }
                    })

                    filledTab(this,this.sectionTypes,this.order);
                } else {console.log('error')}
            }).catch(error => console.log(error));
        },
        updated(){
            w3.includeHTML(() => {
                if(this.finish && this.isHome) {
                    this.successful();
                }
            })
        },
        mounted() {
            this.carouselStart();
        },
        computed:{
            isHome(){
                return this.site.isHome();
            },
            isMobileVersion(){
                return currentVersion == 'mobile';
            }
        },
        methods: {
            selectedTab(parentsIdKey,children) {
                this.tabs[parentsIdKey] = children.taxonomyId;
                this.$forceUpdate(); // 強迫更新畫面
                this.init[children.taxonomyId] = true;
            },
            isCurrentTab(parentsIdKey,childrenId){
                return this.tabs[parentsIdKey] == childrenId;
            },
            getTaxonomyArticlesAPI(item,type) {
                if(item.taxonomyId == this.newsCarouselBlock) {
                    //輪播文章
                    udnAPI.getNewsCarousel().then(response => {
                        let result = response.data.result;
                        if(response.data.success) {
    
                            if(item.taxonomyId == this.newsCarouselBlock) {
                                
                                this.$set(this.sectionArticles,item.taxonomyUid,result);
                                this.carousel.length = this.sectionArticles[item.taxonomyUid].length;

                                if(type == 'first'){
                                    this.init[item.taxonomyId] = true;
                                    this.finish = true;
                                }
                            }

                        } else {console.log('error')}
                    }).catch(error => console.log(error));

                } else if(item.taxonomyId == this.specialBlock){
                    // 媒體發展
                    udnAPI.getMedia().then(res => {
                        let result = res.data.result;
                        if(res.data.success) {
                            this.mediaCard.cards = result;
                        }
                    }).catch(err => {console.log(err)});
                }
            },
            setMediaShow(value){
                if(this.mediaShow.includes(value.articleUid)) {
                    var index = this.mediaShow.findIndex(item => item == value.articleUid )
                    this.mediaShow.splice(index, 1);
                }else {
                    this.mediaShow.push(value.articleUid)
                }
            },
            returnMediaShow(value) {
                return this.mediaShow.includes(value.articleUid);
            },
            returnArticle(value){
                // 回傳簡介或內文的文章
                let article = "";
                if(this.media.isPhone && this.isMobileVersion) {
                    // mobile
                    article = `/template/articles/main-category/mobile/${value.taxonomyId}.html`;
                } else {
                    // desktop
                    article = `/template/articles/main-category/desktop/${value.taxonomyId}.html`;
                }
                return article;
            },
            successful(){
                this.$nextTick(() => {
                    let hash = window.location.hash;
                    let currentMenu = hash == '' ? 'activiti' : hash.replace('#','');
    
                    let offset = currentMenu == 'activiti' ? -130 : -65;

                    let isInit = Object.keys(this.init).every(Id => {
                        return this.init[Id] == true;
                    })
                    if(isInit && this.finish) {
                        this.$smoothScroll({
                            scrollTo: document.getElementById(currentMenu),
                            offset: offset,
                        })
                        this.finish = false;
                    } else { return }
                })
            },
            carouselStop(){
                clearInterval(this.carousel.timer);
            },
            carouselStart(){
                this.carousel.timer = setInterval(()=>{
                    this.carousel.show ++;
                }, 5000);
            },
            animateHandler(element, keyframes, option){
                if(this.mediaCard.count == 2 && option == 'right'){
                    this.mediaCard.cards.shift();
                    this.mediaCard.cards.push(element);
                } else if(this.mediaCard.count == 1 && option == 'left') {
                    this.mediaCard.cards.unshift(element);
                    this.mediaCard.cards.pop();
                }
                let x = document.getElementById('media-inner')
                x.animate(keyframes, {
                    easing: "ease-in-out",
                    duration: 500,
                    fill: 'both',
                })
            },
            prevHandler(){
                let last = this.mediaCard.cards[this.mediaCard.cards.length-1];
    
                this.animateHandler(last, [
                    // keyframes
                    { transform: 'translateX(-376px)'},
                    { transform: 'translateX(0px)'},
                ], 'left')
    
                this.mediaCard.count = 1;
            },
    
            nextHandler(){
                let first = this.mediaCard.cards[0];
                let x = document.getElementById('media-inner')
    
                this.animateHandler(first, [
                    // keyframes
                    { transform: 'translateX(0px)'},
                    { transform: 'translateX(-376px)' }
                ], 'right')
                this.mediaCard.count = 2;
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

                })
    
                filledTab(app,parent, order + 1);
                
            } else { return }
        });
    }

})


