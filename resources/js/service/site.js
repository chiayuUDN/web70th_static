const site = {
    // 顯示 body 的捲動條
    showScrollbar() {
        document.body.style.overflow = 'visible';
    },
    // 隱藏 body 的捲動條
    hideScrollbar() {
        document.body.style.overflow = 'hidden';
    },
    isHome() {
        let udnHome = document.getElementById('udn-home');
        return udnHome ? true : false;
    }
};