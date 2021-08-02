<template>
    <div id="botton-demo">
        <button class="udn-btn btn-orange">會員註冊</button>
        <button class="udn-btn btn-outline-light-gray">udn 會員服務條款</button>
        <button class="udn-btn btn-outline-gray">
            <span>看更多</span>
            <img class="icon" src="/resources/icons/icon-newwindow.svg" alt="">
        </button>
    </div>
</template>
<script>
module.exports = {
    data(){
        return {}
    }
}
</script>
<style>
    #botton-demo {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
        #botton-demo .udn-btn {
            margin: 16px;
        }
</style>
