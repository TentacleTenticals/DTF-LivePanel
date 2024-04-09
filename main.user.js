// ==UserScript==
// @name        DTF-LivePanel
// @namespace   https://github.com/TentacleTenticals
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0.5
// @author      TentacleTenticals
// @description Новая LivePanel комментариев
// @homepage    https://github.com/TentacleTenticals/DTF-LivePanel
// @updateURL   https://github.com/TentacleTenticals/DTF-LivePanel/raw/main/main.user.js
// @downloadURL https://github.com/TentacleTenticals/DTF-LivePanel/raw/main/main.user.js
//
// Base
// @require     https://github.com/DTF-scripts/libs/raw/main/src/classes/m.js
//
// @require     https://github.com/TentacleTenticals/DTF-LivePanel/raw/main/src/panel/js/main.js
// @require     https://github.com/TentacleTenticals/DTF-LivePanel/raw/main/src/panel/css/main.js
// ==/UserScript==

(() => {
  let livePanel = true;
  cfg = {
    theme: 'dark',
    panel: {
      scroll: 4,
      autoUpdate: false,
      updateTimer: 10000,
      size: {
        width: 320
      }
    },
    comments: {
      title: {
        size: 12,
        length: 80
      },
      text: {
        size: 12,
        length: 150
      },
      lcHeader: {
        noRemote: true,
        replay: true,
        avatar : {
          show: true,
          size: 30
        }
      },
      attachment: {
        show: true,
        size: 25,
        noRemote: true,
        replay: true
      },
      links: {
        openInNewTab: false
      }
    }
  };

  // new El().Css('DTF-SuperFeeds', css(cfg));

  function run(status){
    if(livePanel){
      console.log('[DTF LivePanel] Замена панели...');
      const vanilDtf = document.querySelector(`body>.main.layout>.layout__right-column`);
      const redesignDtf = document.querySelector(`#app>.layout>.aside--right>.live`);
      if(vanilDtf){
        console.log('[DTF LivePanel] Vanil mode');
        vanilDtf.remove();

        El.Css('DTF-livePanel', panelCss(cfg));

        new Panel().run({
          mPath: document.querySelector(`body>.main.layout`),
          cfg: cfg,
          openInNewTab: cfg.comments.links.openInNewTab,
          autoUpdate: cfg.panel.autoUpdate,
          updateTimer: cfg.panel.updateTimer,
          showAttachments: cfg.comments.attachment.show,
          showAvatars: cfg.comments.lcHeader.avatar.show,
          maxText: cfg.comments.text.length,
          maxTitle: cfg.comments.title.length
        });
        livePanel = false;
      }else{
        console.log('[DTF LivePanel] Redesign mode');
        if(redesignDtf) redesignDtf.remove();

        El.Css('DTF-livePanel', panelCss(cfg));

        new Panel().run({
          mPath: document.querySelector(`#app>.layout>.aside--right`),
          cfg: cfg,
          openInNewTab: cfg.comments.links.openInNewTab,
          autoUpdate: cfg.panel.autoUpdate,
          updateTimer: cfg.panel.updateTimer,
          showAttachments: cfg.comments.attachment.show,
          showAvatars: cfg.comments.lcHeader.avatar.show,
          maxText: cfg.comments.text.length,
          maxTitle: cfg.comments.title.length
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
