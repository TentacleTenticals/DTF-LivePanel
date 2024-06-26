class Panel{
  run(o){
    El.Div({
      path: o.mPath,
      cName: 'dtf-live',
      attr: ['theme', cfg.theme],
      func: (main) => {
        El.Div({
          path: main,
          cName: 'mainHeader',
          func: (header) => {
            El.Div({
              path: header,
              cName: 'btnPanel',
              func: (btnPanel) => {
                El.Div({
                  path: btnPanel,
                  cName: 'title',
                  text: 'DTF Live',
                  onclick: () => {
                    main.classList.toggle('hidden');
                  }
                });
                El.Button({
                  path: btnPanel,
                  cName: 'btn rec',
                  onclick: (e) => {
                    // header.classList.toggle('live');
                    this.setAutoupdate({click:true, el:header, ...o});
                  }
                });
                El.Button({
                  path: btnPanel,
                  cName: 'btn update',
                  text: '🔄\uFE0E',
                  onclick: (e) => {
                    this.updateComments(o);
                  }
                });
              }
            });
            El.Div({
              path: header,
              cName: 'progress',
              func: (progress) => {
                El.Div({
                  path: progress,
                  cName: 'animation'
                });
                El.Div({
                  path: progress,
                  cName: 'text'
                });
              }
            });
          }
        });

        El.Div({
          path: main,
          id: 'dtf-liveList',
          cName: 'list scrbar',
          func: (list) => {
            this.setComments(list, o);
            if(o.autoUpdate) this.setAutoupdate({run:true, el:list.previousElementSibling, ...o});
          },
          onmouseenter: (e) => {
            // console.log(e.currentTarget.previousElementSibling)
            // e.target.previousElementSibling.toggleAttribute('paused');
            // if(e.target.parentNode.className.match('live')) ''
            this.setAutoupdate({hover:true, el:e.currentTarget.previousElementSibling, ...o});
            // else{
            //   this.setAutoupdate({hover:true, el:e.currentTarget.previousElementSibling});
            //   this.timer = false;
            // }
            // console.log('[LiveList] Autoupdate stopped!');
            // clearInterval(timer);
          },
          onmouseleave: (e) => {
            this.setAutoupdate({hover:true, el:e.currentTarget.previousElementSibling, ...o});
            // e.target.previousElementSibling.toggleAttribute('paused');
            // if(!this.timer) this.timer = this.setAutoupdate({hover:true, el:e.currentTarget.previousElementSibling});
            // else{
            //   this.setAutoupdate({hover:true, el:e.currentTarget.previousElementSibling});
            //   this.timer = false;
            // }
          }
        })
      }
    })
  }
  getList(){
    return fetch('https://api.dtf.ru/v2.1/live', {
      method: 'GET'
    }).then(
      r => r.status === 200 && r.json()
    ).then(res => {
      return res.result;
    })
  }
  setAutoupdate(o){
    const live = o.el.getAttribute('isLive');
    const timer = o.el.getAttribute('timer');
    // console.log('active', live)
    if(o.click||o.run){
      if(timer === null){
        o.el.toggleAttribute('isLive');
        const t = setInterval(() => {
          // o.el.setAttribute('timer', t);
          this.updateComments(o);
          console.log('[LiveList] Autoupdate runned!', t);
        }, o.panel.updateTimer);
        o.el.setAttribute('timer', t);
      }else
      if(timer !== null){
        o.el.toggleAttribute('isLive');
        clearInterval(timer);
        o.el.removeAttribute('timer');
        console.log('[LiveList] Autoupdate stopped!', timer);
      }
    }else
    if(o.hover && live !== null){
      console.log('Hover');
      if(timer === null){
        o.el.toggleAttribute('paused');
        const t = setInterval(() => {
          this.updateComments(o);
          // o.el.setAttribute('timer', t);
          console.log('[LiveList] Autoupdate runned by hover!', t);
        }, o.panel.updateTimer);
        o.el.setAttribute('timer', t);
      }else
      if(timer !== null){
        o.el.toggleAttribute('paused');
        clearInterval(timer);
        o.el.removeAttribute('timer');
        console.log('[LiveList] Autoupdate stopped by hover!', timer);
      }
    }
  }
  setComments(path, cfg){
    this.getList().then(comments => {
      console.log(comments);
      this.createComments({list:comments, path:path, ...cfg});
    })
  }
  createComments(o){
    function getTime(d){
      const t = new Date(d);
      return `${t.getHours() < 10 ? `0${t.getHours()}` : t.getHours()}:${t.getMinutes() < 10 ? `0${t.getMinutes()}` : t.getMinutes()}:${t.getSeconds() < 10 ? `0${t.getSeconds()}` : t.getSeconds()}`
    }
    o.list.forEach(e => {
      El.Div({
        path: o.path,
        cName: 'liveComment',
        attr: ['cId', e.comment_id],
        func: (c) => {
          El.Div({
            path: c,
            cName: 'lcHeader',
            func: (header) => {
              if(o.showAvatars) this.getAttach({type:'lcHeader', url:e.user.avatar, path:header});
              El.Div({
                path: header,
                cName: 'info',
                func: (info) => {
                  El.Div({
                    path: info,
                    cName: 'name-data',
                    func: (nd) => {
                      El.A({
                        path: nd,
                        cName: 'name',
                        text: e.user.name,
                        url: e.user.url,
                        rel: ['nofollow', 'noopener', 'noreferrer']
                      });
                      El.Div({
                        path: nd,
                        cName: 'date',
                        text: getTime(e.date*1000)
                      });
                      El.A({
                        path: nd,
                        cName: 'link',
                        text: '⤴',
                        url: e.url,
                        rel: ['nofollow', 'noopener', 'noreferrer']
                      })
                    }
                  });
                  El.Div({
                    path: info,
                    cName: 'title-link',
                    func: (tl) => {
                      El.A({
                        path: tl,
                        cName: 'title',
                        text: e.content.title.slice(0, o.maxTitle),
                        title: e.content.title,
                        url: e.content.url,
                        rel: ['nofollow', 'noopener', 'noreferrer']
                      });
                    }
                  });
                }
              });
            }
          });
          El.Div({
            path: c,
            cName: 'text',
            text: e.text.slice(0, o.maxText)
          });
          if(o.showAttachments && e.media.length > 0){
            e.media.forEach(media => {
              // console.log('MEDIA', media);
              if(media.data) this.getAttach({type:'attachment', data:media.data, path:c});
            })
          }
        }
      })
    })
  }
  async updateComments(cfg){
    console.log('[UpdateList] Run');
    const i = {
      list: document.getElementById('dtf-liveList'),
      get list1(){
        return this.list.children
      },
      list2: await this.getList(),
      maxSize: 20,
      willCut: 0,
      get lastItemIndex(){
        delete this.lastItemIndex;
        return this.lastItemIndex = this.list1.length-1;
      },
      get matchedItemIndex(){
        // console.log('MM');
        const lastId = +this.list1[this.lastItemIndex].getAttribute('cid');
        console.log('LastId', lastId);
        delete this.matchedItemIndex;
        return this.matchedItemIndex = this.list2.findIndex(e => e.comment_id === lastId);
      },
      get newList(){
        delete this.newList;
        if(this.matchedItemIndex > 0) return this.newList = this.list2.slice(this.matchedItemIndex+1, this.list2.length);
        else
        return this.newList = this.list2;
      }
    }

    // console.log('Founded same', i.matchedItemIndex);

    // console.log('S', i.list2);

    if(i.list1.length > i.maxSize || i.list1.length + i.newList.length > i.maxSize){
      i.willCut = i.list1.length+i.newList.length - i.maxSize;
      // console.log('Will cut', i.willCut);
    }

    if(i.willCut > 0){
      // console.log('[Cutting]');
      if(i.willCut === i.maxSize){
        // console.log(`[Cutting] Will cut all. List:${i.list.children.length}, will be added:${i.newList.length}`);
        i.list.replaceChildren();

        // console.log(`[Cutting] cutted all. Will be added:${i.newList.length}`);

        const result = new DocumentFragment();
        this.createComments({list:i.newList, path:result, ...cfg});
        i.list.append(result);
        // console.log('[Cutting] Cutted!');
      }else{
        // console.log('[Cutting] Will cut part', i.list1.length);
        const trash = new DocumentFragment();
        for(let el = 0, arr = i.list.children, len = i.willCut; el < len; el++){
          // console.log('Cut');
          trash.appendChild(arr[el]);
          // arr[el].remove();
        }
        trash.replaceChildren();
        // console.log('Trash', trash);
        // i.list.append(trash);
        const result = new DocumentFragment();
        this.createComments({list:i.newList, path:result, ...cfg});
        i.list.append(result);
      }
    }else{
      const result = new DocumentFragment();
      this.createComments({list:i.newList, path:result, ...cfg});
      i.list.append(result);
    }
  }
  getAttach(o){
    El.Div({
      path: o.path,
      cName: `mask ${o.type}`,
      func: (mask) => {
        if(o.data && o.data.type && o.data.type.match(/jpg|jpeg|png/)){
          El.Image({
            path: mask,
            url: o.url||`https://leonardo.osnova.io/${o.data.uuid}`
          });
        }else
        El.Video({
          path: mask,
          cName: 'vid',
          url: o.url||`https://leonardo.osnova.io/${o.data.uuid}`,
          poster: o.url||`https://leonardo.osnova.io/${o.data.uuid}`,
          autoplay: true,
          remote: cfg.comments[o.type].remote,
          replay: cfg.comments[o.type].replay,
          muted: true
        });
      }
    });
  }
}
