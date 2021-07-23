let site = {
    // 顯示 body 的捲動條
    showScrollbar() {
        document.body.style.overflow = 'visible';
    },
    // 隱藏 body 的捲動條
    hideScrollbar() {
        document.body.style.overflow = 'hidden';
    }
};

// open udn 會員服務條款 popup
const openNemberPopup = function(){
    //udn 會員服務條款 popup
    let udnMemberPopup = document.getElementById('udn-member-popup');

    // open udn 會員服務條款 popup
    site.hideScrollbar();
    udnMemberPopup.setAttribute('data-popup', 'show');

}

// close udn 會員服務條款 popup
const closeNemberPopup = function(){
    //udn 會員服務條款 popup
    let udnMemberPopup = document.getElementById('udn-member-popup');

    // close udn 會員服務條款 popup
    site.showScrollbar();
    udnMemberPopup.removeAttribute('data-popup', 'show');
}

// open 隱私權聲明 popup
const openNemberBenefitsPopup = function(){
    //隱私權聲明 popup
    let udnMemberBenefitsPopup = document.getElementById('udn-member-benefits-popup');

    // open udn 會員服務條款 popup
    site.hideScrollbar();
    udnMemberBenefitsPopup.setAttribute('data-popup', 'show');

}

// close 隱私權聲明 popup
const closeNemberBenefitsPopup = function(){
    //隱私權聲明 popup
    let udnMemberBenefitsPopup = document.getElementById('udn-member-benefits-popup');

    // close udn 會員服務條款 popup
    site.showScrollbar();
    udnMemberBenefitsPopup.removeAttribute('data-popup', 'show');
}
