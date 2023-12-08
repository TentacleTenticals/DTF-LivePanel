// ==UserScript==
// @name        DTF-LivePanel 2.0
// @namespace   Violentmonkey Scripts
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0.0
// @author      -
// @description 25.11.2023, 12:44:35
// @homepage    https://github.com/TentacleTenticals/DTF-LivePanel-2.0
// @updateURL   https://github.com/TentacleTenticals/DTF-LivePanel-2.0/raw/master/main.user.js
// @downloadURL https://github.com/TentacleTenticals/DTF-LivePanel-2.0/raw/master/main.user.js
//
// Base
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/classes/cls.js
//
// @require     https://github.com/TentacleTenticals/DTF-LivePanel-2.0/raw/main/src/panel/js/main.js
// @require     https://github.com/TentacleTenticals/DTF-LivePanel-2.0/raw/main/src/panel/css/main.js
// ==/UserScript==

(() => {
  let livePanel = true;

  // new El().Css('DTF-SuperFeeds', css(cfg));


  function run(status){
    if(livePanel){
      console.log('[DTF LivePanel] Замена панели...');
      const vanilDtf = document.querySelector(`body>.main.layout>.layout__right-column`);
      if(vanilDtf){
        vanilDtf.remove();

        new Panel().run({
          mPath: document.querySelector(`body>.main.layout`),
          autoUpdate: false,
          updateTimer: 10000,
          showAttachments: true,
          showAvatars: true,
          maxText: 150,
          maxTitle: 80
        });
        livePanel = false;
      }
    }
  }

  new El().Css('DTF-livePanel', panelCss(
    {
      panelWidth: 240,
      avatarSize: 30,
      titleSize: 12,
      textSize: 12,
      updateTimer: 10000
    }
  ));

  // onPageLoad(run);
  document.addEventListener('status', (e) => {
    // console.log('[STATUS]', e.detail);

    run(e.detail);
  });
})();
