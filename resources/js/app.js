let app = new Vue({
    el: "#app",
    data: {
        sectionTypes: {},
        currentNav: null,
        specialBlock: 'mediaFeature',
        tabs: {}, // 紀錄選擇的tabs
        order: 1,
    },
    created() {
        w3.includeHTML();
        getSectionTypes().then(response => {
            if(response.data.success) {
                let result = response.data.result;
                this.sectionTypes = result;
                filledTab(this.sectionTypes,this.order);
            } else {
                console.log('err')
            }
        }).catch(err => console.log(err));
        
    },
    updated(){
        w3.includeHTML();
    },
    computed:{
        navigations() {
            let nav = [];
            if(Object.keys(this.sectionTypes).length != 0) {
                this.sectionTypes.childTaxonomies.forEach(item => {
                    nav.push({
                        taxonomyName: item.taxonomyName,
                        taxonomyId: item.taxonomyId
                    })
                })
            }
            return nav;
        }
    },
    methods: {
        selectedTab(parentsIdKey,childrenId){
            this.tabs[parentsIdKey] = childrenId;
            this.$forceUpdate(); // 強迫更新畫面
        },
        isCurrentTab(parentsIdKey,childrenId){
            return this.tabs[parentsIdKey] == childrenId;
        },
        
    }
});


function getSectionTypes() {
    return  axios.get("./../../resources/js/type.json");
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