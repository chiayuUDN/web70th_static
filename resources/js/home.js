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
            finish: false
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

                }
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


