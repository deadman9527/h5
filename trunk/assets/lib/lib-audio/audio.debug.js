;
(function(win, lib) {
    var audio = lib.audio || (lib.audio = {});
    var doc = win.document;
    var windvane = win.WindVane;
    var taobaoApp = lib.env.taobaoApp;
    var audioEl = new Audio();
    var autoIncId = 1;
    var playedId = 0;
    var srcIdMap = {};

    audio.isSupportNative = false;
    if (taobaoApp && windvane) {
        audio.isSupportNative = taobaoApp.version && taobaoApp.version.gte('4.0.0');
    }

    // H5用audio标签
    audioEl.autoplay = false;
    audioEl.addEventListener('ended', endedHandler, false);
    audioEl.addEventListener('error', errorHandler, false);
    // Native监听事件
    doc.addEventListener('AUDIO.IDLE', endedHandler, false);

    function endedHandler(e) {
        if (!audio.paused) {
            if (audio.isSupportNative) {
                var endedId = e.param.playIdentifier;
                if (!endedId || endedId.toString() === playedId.toString()) {
                    audio.paused = true;
                    audio.onended && audio.onended();
                    console.log('endedId:' + endedId);
                }
            } else {
                audio.paused = true;
                audio.onended && audio.onended();
                console.log('ended');
            }
        }
    }

    function errorHandler(e) {
        audio.error = true;
        audio.pause();
        audio.onerror && audio.onerror();
        console.log('error');
    }

    function fillZero(n, w) {
        n = n.toString();
        return new Array(w + 1 - n.length).join('0') + n;
    }

    audio.paused = true;

    audio.play = function(src, onended, onerror) {
        if (arguments.length === 1) {
            if (typeof arguments[0] === 'string') {
                this.src = arguments[0];
            } else if (typeof arguments[0] === 'function') {
                this.onended = onended;
            }
        } else if (arguments.length === 2) {
            if (typeof arguments[0] === 'string') {
                this.src = arguments[0];
                this.onended = arguments[1];
            } else if (typeof arguments[0] === 'function') {
                this.onended = arguments[0];
                this.onerror = arguments[1];
            }
        } else if (arguments.length === 3) {
            this.src = src;
            this.onended = onended;
            this.onerror = onerror;
        }

        this.error = false;

        if (this.src) {
            this.paused = false;

            if (this.isSupportNative) {
                playedId = srcIdMap[this.src];
                if (!playedId) {
                    var tmp = Date.now() % 1000;
                    srcIdMap[this.src] = playedId = '1' + fillZero(tmp, 3) + fillZero(autoIncId, 4);
                    autoIncId = (++autoIncId)%10000;
                }
                console.log('playedId:' + playedId);

                windvane.call('H5AudioPlayer', 'play', {voiceUrl: this.src, playIdentifier: playedId}, function(e){
                    console.log('success to play');
                }, function(e){
                    console.log('fail to play');
                    errorHandler();
                });
            } else {
                if (!audioEl.paused) {
                    audioEl.pause();
                    audioEl.currentTime = 0;
                }
                audioEl.src = this.src;
                audioEl.play();
            }
            console.log('play');
        } else {
            errorHandler();
        }
    }

    audio.pause = function(force) {
        if (!this.paused || force) {
            this.paused = true;
            if (this.isSupportNative) {
                windvane.call('H5AudioPlayer','stop', {voiceUrl: this.src || ''}, function(e){
                    console.log('success to stop');
                }, function(e){
                    console.log('fail to stop');
                });
            } else {
                audioEl.pause();
                if (!audio.error) {
                    audioEl.currentTime = 0;
                }
            }
            console.log('paused');
        }
    }
})(window, window['lib'] || (window['lib'] = {}));


