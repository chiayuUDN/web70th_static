Vue.component("component-dropdown", {
    template: '#component-dropdown',
});

new Vue({
    el: "#app",
    data: {
        text: '測試區域',
        items: ['測試1', '測試2', '測試3', '測試4'],
        sectionTypes: {}
    },
    created() {
        axios.get("./../../resources/js/type.json")
          .then(response => {
              if(response.data.success) {
                  let result = response.data.result ;
                  console.log(result);
                  this.sectionTypes = result;
              } else {
                  console.log('err')
              }
          }).catch(err => console.log(err))
    },
});
