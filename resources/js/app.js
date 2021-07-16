let app = new Vue({
    el: "#app",
    data: {
        sectionTypes: {},
        tabs: {},
        order: 0
    },
    created() {
        w3.includeHTML();
        axios.get("./../../resources/js/type.json")
          .then(response => {
              if(response.data.success) {
                  let result = response.data.result;
                  result.childTaxonomies = result.childTaxonomies.slice(1)
                  this.sectionTypes = result;
                  filledTab(this.sectionTypes,this.order + 1);

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
            this.$forceUpdate();
        },
        isCurrentTab(parentsIdKey,childrenId){
            return this.tabs[parentsIdKey] == childrenId;
        }
    }
});

function filledTab(taxonomies,order) {
    taxonomies.childTaxonomies.forEach((a,AIdx) => {
        if(a.childTaxonomies.length != 0) {

            a.childTaxonomies.forEach((b,BIdx) => {

                if(BIdx == 0) {
                    app.tabs[`${a.taxonomyId}${order}TH`] = b.taxonomyId;
                }
                
            })

            filledTab(a,order + 1);
                
        } else { return }
    });

}