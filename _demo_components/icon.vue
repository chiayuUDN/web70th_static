<template>
    <div id="icon">
        <div class="wrapper">
            <div class="cel" v-for="icon in icons" :key="icon">
                <img :src="`/resources/icons/${icon}.svg`" :alt="icon">
                <h5 v-text="`${icon}.svg`"></h5>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    data(){
        return {
            icons: [
                'icon-udn-logo','btn-fb','btn-ig','btn-line','btn-youtube',
                'icon-hamburgerbtn','icon-close','icon-newwindow',
                'icon-leftarrow','icon-rightarrow','icon-downarrow',
                'icon-collapse','icon-mail','icon-edit',
                'icon-step-rightarrow','icon-step-downarrow',
                'icon-dropdown-off','icon-dropdown-on',
                'icon-address','icon-locationmap'
            ]
        }
    }
}
</script>

<style>
    #icon .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
    }
        #icon .wrapper .cel {
            width: 180px;
            display: grid;
            grid-template-rows: auto;
            justify-items: center;
            word-wrap: break-word;
            word-break: break-all;
            grid-gap: 16px;
            margin: 16px;
        }
</style>