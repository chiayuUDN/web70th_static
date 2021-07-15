vue.component('test', {
    templat:'../article/template.html',
})
new Vue({
    el: "#app",
    component: {test},
    data: {
        text: '測試區域',
        items: ['測試1', '測試2', '測試3', '測試4']
    }
});