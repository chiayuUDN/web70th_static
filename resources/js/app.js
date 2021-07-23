let app = new Vue({
    el: "#app",
    data: {
        sectionTypes: {},
        menus:[],
        currentMenu: 'activiti',
        specialBlock: 'mediaFeature',
        tabs: {}, // 紀錄選擇的tabs
        order: 1,
        openNav: false,
        media: media,
        isShowGoTop: false,
        carousels: [1,2,3,4,5],
    },
    created() {
        w3.includeHTML();
        getSectionTypes().then(response => {
            if(response.data.success) {
                let result = response.data.result;
                this.sectionTypes = result;
                this.getMenus();
                filledTab(this.sectionTypes,this.order);
            } else {
                console.log('err')
            }
        }).catch(err => console.log(err));
        getNewsCarousel().then(res => {
            if(res.data.success) {
                this.carousels = res.data.result;
            } else {
                console.log('err')
            }
        }).catch(err => {
            console.log(err)
        })
    },
    mounted() {
        window.addEventListener('scroll', () => {
            this.isShowGoTop = window.pageYOffset > 0 ? true : false;
            this.mapScroll(window.pageYOffset);
        });
    },
    updated(){
        w3.includeHTML();
    },
    computed: {
        getMediaVersion(){
            return media.isPhone ? 'mobile' : 'desktop';
        }
    },
    methods: {
        selectedTab(parentsIdKey,childrenId) {
            this.tabs[parentsIdKey] = childrenId;
            this.$forceUpdate(); // 強迫更新畫面
        },
        isCurrentTab(parentsIdKey,childrenId){
            return this.tabs[parentsIdKey] == childrenId;
        },
        mapScroll(pageYOffset) {
            this.menus.forEach((item,idx) => {
                if(this.$refs[item.taxonomyId][0]){
                    if(pageYOffset >= this.$refs[item.taxonomyId][0].offsetTop) {
                        this.currentMenu = item.taxonomyId;
                    }else if(pageYOffset < this.$refs[this.menus[1].taxonomyId][0].offsetTop){
                        this.currentMenu = this.menus[0].taxonomyId;
                    }
                }
            })
        },
        getMenus() {
            if(Object.keys(this.sectionTypes).length != 0) {
                this.sectionTypes.childTaxonomies.forEach(item => {
                    this.menus.push({
                        taxonomyName: item.taxonomyName,
                        taxonomyId: item.taxonomyId
                    })
                })
            }
        },
        goTop() {
            window.scroll(0, 0);
        }
    },
    watch: {
        openNav(){
            if(this.openNav) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'visible';
            }
        }
    }
});

function getSectionTypes() {
    return axios.get("/resources/js/type.json");
}

function getNewsCarousel() {
    return axios.get("/resources/js/carousel.json");
}

// 傳入分類與層數，來記錄整個資料的第一個分類ID
function filledTab(taxonomies, order) {
    taxonomies.childTaxonomies.forEach(parent => {
        if(parent.childTaxonomies.length != 0) {
            parent.childTaxonomies.forEach((child, childIdx) => {
                if(childIdx == 0) {
                    app.tabs[`${parent.taxonomyId}${order}TH`] = child.taxonomyId;
                }
            })

            filledTab(parent, order + 1);
                
        } else { return }
    });

}