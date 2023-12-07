const panelCss = (o) => {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap');

:is(.scrollLite, .scrollMid)::-webkit-scrollbar-thumb {
  background-color: rgb(189 164 164);
}
:is(.scrollLite, .scrollMid)::-webkit-scrollbar-corner {
  background-color: unset;
}
.scrollLite::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
.scrollMid::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.dtf-live {
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  background-color: rgb(0,0,0);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  padding: 5px;
  max-height: 100%;
  overflow: auto;
}

.dtf-live>.header {
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
    border: unset;
    /* border: 1px solid rgb(103 98 98); */
    border-radius: 50%;
    background-color: rgb(48 21 69);
    color: rgb(255 255 255);
    box-shadow: 0 0 1px 2px rgb(103 98 98);

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

.comment>.header {
  display: flex;
  flex-direction: row;
  gap: 2px 5px;

  .info {
    display: flex;
    flex-direction: column;
    gap: 2px 5px;
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
    font-size: 12px;
    font-family: 'Exo 2', sans-serif;
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
.comment {
  display: flex;
  flex-direction: column;
  gap: 3px 0;
  
  >.mask.attachment {
    display: flex;
    width: 25%;
    aspect-ratio: 1/1;
    overflow: hidden;
    box-shadow: 0 0 3px 1px rgb(123 123 123);

    :is(img, video) {
      margin: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.comment>.header .mask {
  display: flex;
  min-width: 0;
  min-height: 0;
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 3px 1px rgb(123 123 123);
}
.comment>.header .mask img {
  margin: auto;
  max-width: 100%;
  max-height: 100%;
}

.comment>.text {
  color: rgb(255,255,255);
  font-size: 14px;
  font-weight: 400;
  font-family: 'Manrope', sans-serif;
  font-family: 'Noto Sans JP', sans-serif;
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
