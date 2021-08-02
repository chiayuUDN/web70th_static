<template>
    <div id="template-demo">
        <div class="page-link">
            <a href="/articles/activit-templet-1.html">最新消息樣板 1</a>
            <a href="/articles/activit-templet-2.html">最新消息樣板 2</a>
            <a href="/articles/triaffic.html">交通位置</a>
            <a href="/articles/subscription.html">訂報服務</a>
            <a href="/articles/udn-memorabilia.html">聯合報系大事紀</a>
            <a href="#">隱私權聲明</a>
            <a href="#">會員條款</a>
        </div>
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
    #template-demo .page-link {
        margin-bottom: 32px;
    }
    #template-demo .page-link > * {
        padding: 8px;
    }
</style>
