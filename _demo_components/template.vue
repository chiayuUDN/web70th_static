<template>
    <div id="template-demo">
        <h1 class="mb-4">Page Link</h1>
        <div class="page-link">
            <a href="/articles/activit-templet-1.html">最新消息樣板 1</a>
            <a href="/articles/activit-templet-2.html">最新消息樣板 2</a>
            <a href="/articles/triaffic.html">交通位置</a>
            <a href="/articles/subscription.html">訂報服務</a>
            <a href="/articles/udn-memorabilia.html">聯合報系大事紀</a>
            <a href="/articles/member.html">隱私權聲明</a>
            <a href="/articles/member-benefits.html">會員條款</a>
        </div>

        <h1 class="mb-4">Template</h1>
        <div>
            <p class="mb-1">1. page article 沒有 mobile 版本，只有 Desktop (RWD)</p>
            <p class="mb-1">2. 其他區塊 article 皆有 Mobile and Desktop (RWD)</p>
            <p class="mb-1">3. Template css 路徑(/resources/css/template)</p>
            <p class="mb-1">4. Template html 路徑(/template)</p>
        </div>
        
    </div>
</template>

<style>
    #template-demo .page-link {
        margin-bottom: 32px;
    }

        #template-demo .page-link > * {
            padding: 8px;
        }
</style>
