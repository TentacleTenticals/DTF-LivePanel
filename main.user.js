// ==UserScript==
// @name        DTF-LivePanel
// @namespace   https://github.com/TentacleTenticals
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0.0
// @author      TentacleTenticals
// @description Новая LivePanel комментариев
// @homepage    https://github.com/TentacleTenticals/DTF-LivePanel
// @updateURL   https://github.com/TentacleTenticals/DTF-LivePanel/raw/master/main.user.js
// @downloadURL https://github.com/TentacleTenticals/DTF-LivePanel/raw/master/main.user.js
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
      const redesignDtf = document.querySelector(`#app>.layout>.aside--right>.live`);
      if(vanilDtf){
        console.log('[DTF LivePanel] Vanil mode');
        vanilDtf.remove();

        new El().Css('DTF-livePanel', panelCss(
          {
            panelWidth: 270,
            avatarSize: 30,
            attachmentSize: 25,
            titleSize: 12,
            textSize: 12,
            scroll: 4,
            updateTimer: 10000
          }
        ));

        new Panel().run({
          mPath: document.querySelector(`body>.main.layout`),
          openInNewTab: false,
          autoUpdate: false,
          updateTimer: 10000,
          showAttachments: true,
          showAvatars: true,
          maxText: 150,
          maxTitle: 80
        });
        livePanel = false;
      }else
      if(redesignDtf){
        console.log('[DTF LivePanel] Redesign mode');
        redesignDtf.remove();

        new El().Css('DTF-livePanel', panelCss(
          {
            panelWidth: 320,
            avatarSize: 30,
            attachmentSize: 25,
            titleSize: 12,
            textSize: 12,
            scroll: 4,
            updateTimer: 10000
          }
        ));

        new Panel().run({
          mPath: document.querySelector(`#app>.layout>.aside--right`),
          openInNewTab: false,
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

  document.addEventListener('status', (e) => {
    // console.log('[STATUS]', e.detail);

    run(e.detail);
  }, {once:true});
})();
