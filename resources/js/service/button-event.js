(function(){
    window.onload = function() {
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
        
        // udn 會員服務條款 button
        let udnMemberBtnEven = document.getElementById('udn-member-btn-even');

        //udn 會員服務條款 popup
        let udnMemberPopup = document.getElementById('udn-member-popup');

        // udn 會員服務條款 popup close button
        let udnMemberPopupBtnClose = document.getElementById('udn-member-popup-btn-close');
        
        // 隱私權聲明 button
        let udnMemberBenefitsBtnEven = document.getElementById('udn-member-benefits-btn-even');
        
        //隱私權聲明 popup
        let udnMemberBenefitsPopup = document.getElementById('udn-member-benefits-popup');
        
        // 隱私權聲明 popup close button
        let udnMemberBenefitsPopupBtnClose = document.getElementById('udn-member-benefits-popup-btn-close');

        
        // open udn 會員服務條款 popup
        udnMemberBtnEven.addEventListener('click',function(e){
            site.hideScrollbar();
            udnMemberPopup.setAttribute('data-popup', 'show');
        },false)
        
        // close udn 會員服務條款 popup
        udnMemberPopupBtnClose.addEventListener('click',function(e){
            site.showScrollbar();
            udnMemberPopup.removeAttribute('data-popup', 'show');
        },false)
        
        // open 隱私權聲明 popup
        udnMemberBenefitsBtnEven.addEventListener('click',function(e){
            site.hideScrollbar();
            udnMemberBenefitsPopup.setAttribute('data-popup', 'show');
        },false)
        
        // close 隱私權聲明 popup
        udnMemberBenefitsPopupBtnClose.addEventListener('click',function(e){
            site.showScrollbar();
            udnMemberBenefitsPopup.removeAttribute('data-popup', 'show');
        },false)
    };
})();