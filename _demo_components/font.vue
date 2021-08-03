<template>
    <div id="font-demo">
        <h1 class="mb-4">字級</h1>
        <div class="word-level">
            <p class="t1">.t1｜T1｜內頁大標題，48px 、 Mediun｜1.5 行高</p>
            <h1>.h1｜H1｜大標題｜36px｜Mediun｜行高 1.5</h1>
            <h2>.h2｜H2｜福標題｜24px｜Mediun｜行高 1.5</h2>
            <h3>.h3｜H3｜內文｜20px｜Ligth｜行高 1.5</h3>
            <h4>.h4｜H4｜副標題或內文｜18px｜Light｜行高 1.5</h4>
            <h5>.h5｜H5｜附註｜16px｜Mediun｜行高 1.5</h5>
        </div>

        <h1 class="mt-4 mb-4">文字顏色</h1>
        <div class="word-level" >
            <p class="text-golden">.text-golden #988734</p>
            <p class="text-orange">.text-orange #ee6700</p>
            <p class="text-white bg-black">.text-white #FFFFFF</p>
            <p class="text-gray-c1 bg-black">.text-gray-c1 #FAFAFA</p>
            <p class="text-gray-c2 bg-black">.text-gray-c2 #F6F6F6</p>
            <p class="text-gray-c3">.text-gray-c3 #E0E0E0</p>
            <p class="text-gray-c4">.text-gray-c4 #616161</p>
            <p class="text-gray-c5">.text-gray-c5 #979797</p>
            <p class="text-black">.text-black #212121</p>
        </div>
    </div>
</template>
<style>
    #font-demo .word-level {
        display: grid;
        grid-gap: 16px 16px;
    }
    #font-demo .bg-black {
        background-color: #000;
    }
</style>

