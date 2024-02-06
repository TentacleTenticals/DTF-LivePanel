const panelCss = (o) => {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap');

.scrbar::-webkit-scrollbar-thumb {
  background-color: rgb(189 164 164);
}
.scrbar::-webkit-scrollbar-corner {
  background-color: unset;
}
.scrbar::-webkit-scrollbar {
  width: ${o.scroll}px;
  height: ${o.scroll}px;
}
.scrbar {
  scrollbar-width: thin;
  scrollbar-color: rgb(189 164 164) rgb(0, 0, 0);
}

.dtf-live {
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  position: sticky;
  top: 60px;
  min-width: ${o.panelWidth}px;
  width: ${o.panelWidth}px;
  height: calc(100vh - 60px);
  background-color: rgb(0,0,0);
  z-index: 10;

  &.hidden {
    position: fixed;
    right: calc(-${o.panelWidth}px + 30px);
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    padding: 5px;
    max-height: 100%;
    overflow: auto;
  }
}

.dtf-live>.mainHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0 5px;
  padding: 5px;
  color: rgb(255 255 255);

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    padding: 0;
    margin: 0;
    font-size: 11px;
    line-height: normal;
    border: unset;
    border-radius: 50%;
    background-color: rgb(48 21 69);
    color: rgb(255 255 255);
    box-shadow: 0 0 1px 2px rgb(103 98 98);
    padding-inline: 3px;
    padding-block: 3px;

    &:hover {
      filter: hue-rotate(45deg);
      cursor: pointer;
    }
  }

  .rec {
    &:hover {
      filter: hue-rotate(45deg);
      cursor: pointer;
    }

    &::after {
      display: block;
      margin: auto;
      content: '▶︎\uFE0E';

      &.live {
        content: '⏸️\uFE0E';
        font-family: math;
      }
    }
  }

  .title {
    font-family: 'Oswald', sans-serif;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }

  .btnPanel {
    display: flex;
    flex-direction: row;
    flex-basis: 100%;
    gap: 0 5px;
    font-family: 'Oswald', sans-serif;
  }

  &[isLive] {
    .rec::after {
      content: '⏸️\uFE0E';
      font-family: math;
    }

    .progress {
      .animation {
        animation: ${o.updateTimer / 1000}s infinite linear progress;
      }
      .text {
        animation: ${o.updateTimer / 1000}s infinite linear progressTimer;
      }
    }
  }
  &[paused] {
    .progress {
      .animation {
        animation-name: none;
      }
      .text {
        animation-name: none;
      }
    }
  }
}

.liveComment>.lcHeader {
  display: flex;
  flex-direction: row;
  gap: 2px 5px;

  .info {
    display: flex;
    flex-direction: column;
    gap: 2px 5px;
    max-width: calc(100% - ${o.avatarSize+5}px);
  }

  .name-data {
    display: flex;
    flex-direction: row;
    gap: 2px 5px;
  }

  .name {
    font-size: 12px;
    font-family: 'Exo 2', sans-serif;
    color: rgb(255 255 255);
  
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  .date {
    font-size: 12px;
    font-family: 'Exo 2', sans-serif;
    color: rgb(195 173 191);
  }

  .title-link {
    display: flex;
    flex-direction: row;
    gap: 2px 5px;
  }

  .title {
    font-size: ${o.titleSize}px;
    font-family: 'Exo 2', sans-serif;
    line-height: normal;
    color: rgb(199 199 199);
  
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  .link {
    padding: 0 3px 0 3px;
    font-size: 12px;
    color: rgb(255 255 255);
  
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
}
.liveComment {
  display: flex;
  flex-direction: column;
  gap: 0px 0;
  word-break: break-word;
  
  >.mask.attachment {
    display: flex;
    width: ${o.attachmentSize}%;
    aspect-ratio: 1/1;
    padding: 4px;
    overflow: hidden;
    background-color: rgb(0 0 0);
    box-shadow: 0 0 3px 1px rgb(123 123 123);

    :is(img, video) {
      margin: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.liveComment>.lcHeader .mask {
  display: flex;
  min-width: 0;
  min-height: 0;
  width: ${o.avatarSize}px;
  height: ${o.avatarSize}px;
  padding: 2px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 3px 1px rgb(123 123 123);
}
.liveComment>.lcHeader .mask :is(img, video) {
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}

.liveComment>.text {
  color: rgb(255,255,255);
  font-size: ${o.textSize}px;
  font-weight: 400;
  font-family: 'Manrope', sans-serif;
  font-family: 'Noto Sans JP', sans-serif;
  line-height: normal;
}


@property --percent {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}
@property --int {
  syntax: '<integer>';
  initial-value: 0;
  inherits: false;
}

@keyframes progress {
  from {
    --percent: 0%;
  }
  to {
    --percent: 100%;
  }
}
@keyframes progressTimer {
  from {
    --int: 0;
  }
  to {
    --int: 10;
  }
}

.progress {
  display: flex;
  position: relative;
  min-width: 0px;
  aspect-ratio: 1/1;
  align-items: center;
  justify-content: center;
  
  .animation {
    width: 100%;
    height: 100%;
    background-image: conic-gradient(rgb(25 255 255) var(--percent), rgb(83 83 83) 0);
    border-radius: 50%;
    mask: radial-gradient(transparent 55%, rgb(0,0,0) 0%);
    -webkit-mask: radial-gradient(transparent 55%, rgb(0,0,0) 0%);
  }
  
  .text {
    position: absolute;
    counter-reset: int var(--int);
    font-size: 13px;
  }
  .text::after {
    content: counter(int);
    font-family: 'Exo 2', sans-serif;
  }
}
  `
};
