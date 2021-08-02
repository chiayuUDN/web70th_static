new Vue({
    el:'#demo',
    data: {
        tabs:[
            {name: 'Icon', type: 'icon-component'},
            {name: 'Button', type: 'button-component'},
            {name: 'Font', type: 'font-component'},
            {name: 'Template', type: 'template-component'},
        ],
        selectTab: 'template-component',
    },
    components: {
        'icon-component': httpVueLoader('/_demo_components/icon.vue'),
        'button-component': httpVueLoader('/_demo_components/button.vue'),
        'font-component': httpVueLoader('/_demo_components/font.vue'),
        'template-component': httpVueLoader('/_demo_components/template.vue')
    }
})
