<template>
    <div id="botton-demo">
        <div class="mr-3">
            <button class="udn-btn btn-orange">會員註冊</button>
            <p class="mb-3 mt-3">.udn-btn .btn-orange</p>
        </div>
        <div class="mr-3"> 
            <button class="udn-btn btn-outline-light-gray">udn 會員服務條款</button>
            <p class="mb-3 mt-3">.udn-btn .btn-outline-light-gray</p>
        </div>
        <div>
            <a class="udn-btn btn-outline-gray">
                <span>看更多</span>
                <img class="icon" src="/resources/icons/icon-newwindow.svg" alt="">
            </a>
            <p class="mb-3 mt-3">.udn-btn .btn-outline-gray</p>
        </div>
    </div>
</template>

<style>
    #botton-demo {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
        #botton-demo > div{
            text-align: center;
        }
</style>
