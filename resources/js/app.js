let app = new Vue({
    el: "#app",
    data: {
        sectionTypes: {},
        tabs: {}, // 紀錄選擇的tabs
        order: 1, 
    },
    created() {
        w3.includeHTML();
        axios.get("./../../resources/js/type.json")
          .then(response => {
              if(response.data.success) {
                  let result = response.data.result;
                  result.childTaxonomies = result.childTaxonomies.slice(1)
                  this.sectionTypes = result;
                  filledTab(this.sectionTypes,this.order);

              } else {
                  console.log('err')
              }
          }).catch(err => console.log(err))
    },
    mounted(){
        console.log(this.tabs);
    },
    updated(){
        w3.includeHTML();
    },
    methods: {
        selectedTab(parentsIdKey,childrenId){
            this.tabs[parentsIdKey] = childrenId;
            this.$forceUpdate(); // 強迫更新畫面
        },
        isCurrentTab(parentsIdKey,childrenId){
            return this.tabs[parentsIdKey] == childrenId;
        }
    }
});

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