w3.includeHTML(() => {

    let udnHeaderVue = new Vue({
        data: {
            menus:[],
            currentMenu: null,
            media: media,
            openNav: false,
            isShowGoTop: false,
        },
        created() {
            udnAPI.getSectionTypes().then(response => {
                if(response.data.success) {
                    let result = response.data.result;
                    result.childTaxonomies.forEach(item => {
                        this.menus.push({
                            taxonomyName: item.taxonomyName,
                            taxonomyId: item.taxonomyId,
                            taxonomyUid: item.taxonomyUid
                        })
                    })
                } else {console.log('error')}
            }).catch(error => console.log(error));

            this.currentMenu = window.location.pathname == '/' ? 'activiti' : null;
        },
        mounted() {
            window.addEventListener('scroll', () => {
                this.isShowGoTop = window.pageYOffset > 0 ? true : false;
                this.mapScroll(window.pageYOffset);
            });
        },
        methods: {
            mapScroll(pageYOffset) {
                this.menus.forEach((item,idx) => {
                    let Id = document.getElementById(item.taxonomyId);
                    let firstId = document.getElementById(this.menus[0].taxonomyId);
                    if(Id){
                        if(pageYOffset >= Id.offsetTop) {
                            this.currentMenu = item.taxonomyId;
                        }else if(pageYOffset < firstId.offsetTop){
                            this.currentMenu = this.menus[0].taxonomyId;
                        }
                    }
                })
            },
        },
        watch: {
            openNav(){
                if(this.openNav) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'visible';
                }
            },
        }
    }).$mount('#udn-header');

});
