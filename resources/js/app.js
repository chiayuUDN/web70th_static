
Vue.component("component-dropdown", {
    template: '#component-dropdown',
});


new Vue({
    el: "#app",
    data: {
        text: '測試區域',
        items: ['測試1', '測試2', '測試3', '測試4']
    }
});