;(function (win, lib, ctrl) {
var doc = win.document;
var isIEMobile = win.navigator.userAgent.match(/IEMobile\/([\d\.]+)/);
var stylePrefix = !!isIEMobile?'ms':'webkit';

function outputDebug() {
    if (win.console && !!win.console.debuggerMode) {
        var fn = win.console.debug || win.console.info;
        if (fn.apply) {
            fn.apply(win.console, arguments);
        } else {
            fn(arguments);
        }
    }
}

function outputError() {
    if (win.console && !!win.console.debuggerMode) {
        var fn = win.console.error || win.console.info;
        if (fn.apply) {
            fn.apply(win.console, arguments);
        } else {
            fn(arguments);
        }
    }
}

function Page(name, constructor) {
    var that = this;

    this.name = name;

    this.async = function(handler) {
        return function() {
            var deferred = lib.promise.deferred();
            var args = Array.prototype.slice.call(arguments);
            args.push(function() {
                deferred.resolve();
            });
            handler.apply(that, args);
            return deferred.promise();
        }
    }

    this.startup = this.async(function(root, done){done()});
    this.show = this.async(function(root, persisted, done){done()});
    this.hide = this.async(function(root, done){done()});
    this.teardown = this.async(function(root, done){done()});

    constructor && constructor.call(this);
}


var incId = 0;

function PageView(element, options) {
    var that = this;
    var views = [];
    var pages = {};
    var id = Date.now() + '-' + (++incId);
    var root = document.createDocumentFragment();

    if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
        options = arguments[0];
        element = null;
    }

    if (!element) {
        element = document.createElement('div');
        root.appendChild(element);
    }
    options = options || {};

    element.setAttribute('data-ctrl-name', 'pageview');
    element.setAttribute('data-ctrl-id', id);
    if (!!options.fullscreen) {
        element.className = 'fullscreen';
    }

    function dispatch(name, extra) {
        var ev = document.createEvent('HTMLEvents');
        ev.initEvent(name, false, true);
        if (extra) {
            for (var key in extra) {
                ev[key] = extra[key];
            }
        }
        root.dispatchEvent(ev);
    }

    var currentPromise = lib.promise.resolve();

    function createView(state) {    
        var view = doc.createElement('div');
        view.className = 'view';
        view.setAttribute('id', 'view-' + state.id);

        var context = pages[state.name];
        var promise;
        if (!context) {
            promise = new lib.promise(function(r) {
                // TODO load Script
                r.resolve(context);
            });
        } else {
            promise = lib.promise.resolve(context);
        }

        return promise.then(function(context){
            outputDebug('success:load ' + state.name + ' page');
            view.context = context;
            return lib.promise.resolve(context.startup(view));
        }, function(err){
            outputDebug('failure:load ' + state.name + ' page');
            return lib.promise.reject(false);
        }).then(function() {
            outputDebug('success:call startup on', {create: view});
            return lib.promise.resolve(view);
        }, function(err) {
            outputError('failure:call startup on', err.stack);
            return lib.promise.reject(view);
        });
    }

    function pushView(nextView, curView) {
        var rect = element.getBoundingClientRect();
        var promises = [];
        nextView.style.width = rect.width + 'px';
        nextView.style.height = rect.height + 'px';
        element.appendChild(nextView);

        if (curView) {
            promises.push(new lib.promise(function(r) {
                nextView.style.display = 'block';
                nextView.style[stylePrefix + 'Transform'] = 'translateX(' + rect.width + 'px) translateZ(1px)';
                var anim = new lib.animation(400, lib.cubicbezier.ease, 0, function(i1, i2) {
                    nextView.style[stylePrefix + 'Transform'] = 'translateX(' + (rect.width * (1 - i2)) + 'px) translateZ(1px)';
                });
                anim.onend(function() {
                    nextView.style[stylePrefix + 'Transform'] = '';
                    r.resolve(nextView);
                });
                anim.play();
            }));

            promises.push(new lib.promise(function(r) {
                curView.style.opacity = '1';
                curView.style[stylePrefix + 'Transform'] = 'scale(1) translateZ(0)';
                var anim = new lib.animation(400, lib.cubicbezier.ease, 0, function(i1, i2) {
                    curView.style[stylePrefix + 'Transform'] = 'scale(' + (1 - 0.1 * i2) + ')';
                    curView.style.opacity = (1 - i2) + '';
                });
                anim.onend(function() {
                    curView.style[stylePrefix + 'Transform'] = '';
                    curView.style.opacity = '';
                    curView.style.display = 'none';
                    r.resolve(curView);
                });
                anim.play();
            }));
        } else {
            nextView.style.display = 'block';
            promises.push(lib.promise.resolve(nextView));
        }

        return lib.promise.every.apply(lib.promise, promises);
    }

    function PushExecuter(state){
        this.exec = function(){
            lib.promise.every(createView(state), currentPromise).then(function(args) {
                var nextView = args[0];
                var curView = args[1];
                outputDebug('begin:push animation for', {next:nextView, cur:curView});
                return pushView(nextView, curView);
            }, function(err) {
                return lib.promise.reject(err);
            }).then(function(args) {
                var nextView = args[0];
                var curView = args[1];                
                views.push(nextView);

                outputDebug('end:push animation for', {next:nextView, cur:curView});
                var thenable = curView && curView.context.hide(curView);
                currentPromise = lib.promise.resolve(thenable).then(function() {
                    curView && outputDebug('success:call hide on', {cur:curView});
                    return lib.promise.resolve(nextView.context.show(nextView, false));
                }, function() {
                    curView && outputError('failure:call hide on', {cur:curView});
                    return lib.promise.reject(false);
                }).then(function(){
                    outputDebug('success:call show on', {next:nextView});
                    return lib.promise.resolve(nextView);
                }, function() {
                    outputError('failure:call show on', {next:nextView});
                    return lib.promise.reject(nextView);
                });
            }, function(err) {
                outputError('failure:when push animation', err.stack);
            });       
        }
    }

    function popView(preView, curView) {
        if (!preView.parentNode) {
            element.insertBefore(preView, curView);
        }

        var rect = element.getBoundingClientRect();
        var promises = [];

        promises.push(new lib.promise(function(r) {
            preView.style.opacity = '0';
            preView.style.display = 'block';
            preView.style[stylePrefix + 'Transform'] = 'scale(0.9) translateZ(0)';
            var anim = new lib.animation(400, lib.cubicbezier.ease, 0, function(i1, i2) {
                preView.style[stylePrefix + 'Transform'] = 'scale(' + (0.9 + 0.1 * i2) + ') translateZ(0)';
                preView.style.opacity = i2 + '';
            });
            anim.onend(function() {
                preView.style[stylePrefix + 'Transform'] = '';
                preView.style.opacity = '';
                r.resolve(preView);
            });
            anim.play();
        }));

        promises.push(new lib.promise(function(r){
            curView.style.display = 'block';
            curView.style[stylePrefix + 'Transform'] = 'translateX(0) translateZ(1px)';
            var anim = new lib.animation(400, lib.cubicbezier.ease, 0, function(i1, i2) {
                curView.style[stylePrefix + 'Transform'] = 'translateX(' + (rect.width * i2) + 'px) translateZ(1px)';
            });
            anim.onend(function() {
                curView.style[stylePrefix + 'Transform'] = '';
                element.removeChild(curView);
                r.resolve(curView);
            });
            anim.play();
        }));

        return lib.promise.every.apply(lib.promise, promises);
    }

    function PopExecuter(state){
        this.exec = function(){
            var promise;
            views.pop();

            if (!views.length) {
                promise = createView(state);
            } else {
                promise = lib.promise.resolve(views.pop());
            }

            lib.promise.every(promise, currentPromise).then(function(args) {
                var preView = args[0];
                var curView = args[1];
                outputDebug('begin:pop animation for', {pre:preView, cur:curView});
                return popView(preView, curView);
            }, function(err) {
                return lib.promise.reject(err);
            }).then(function(args) {
                var preView = args[0];
                var curView = args[1];                
                views.push(preView);

                outputDebug('end:pop animation for',  {pre:preView, cur:curView});
                var thenable = curView && curView.context.hide(curView);
                currentPromise = lib.promise.resolve(thenable).then(function() {
                    outputDebug('success:call hide on', {cur:curView});
                    return lib.promise.resolve(preView.context.show(preView, false));
                }, function() {
                    outputError('failure:call hide on', {cur:curView});
                    return lib.promise.reject(false);
                }).then(function(){
                    outputDebug('success:call show on', {pre:preView});
                    return lib.promise.resolve(preView);
                }, function() {
                    outputError('failure:call show on', {pre:preView});
                    return lib.promise.reject(preView);
                });
            }, function(err) {
                outputError('failure:pop pop animation', err.stack);
            })
        }
    }

    function replaceView(newView, curView) {
        var rect = element.getBoundingClientRect();
        var promises = [];
        newView.style.width = rect.width + 'px';
        newView.style.height = rect.height + 'px';
        element.appendChild(newView);

        promises.push(new lib.promise(function(r) {
            newView.style.opacity = '0';
            newView.style.display = 'block';
            newView.style[stylePrefix + 'Transform'] = 'translateZ(1px)';
            var anim = new lib.animation(400, lib.cubicbezier.ease, 0, function(i1, i2) {
                newView.style.opacity = i2 + '';
            });
            anim.onend(function() {
                newView.style.opacity = '';
                newView.style[stylePrefix + 'Transform'] = '';
                r.resolve(newView);
            });
            anim.play();
        }));

        promises.push(new lib.promise(function(r) {
            curView.style.opacity = '1';
            curView.style[stylePrefix + 'Transform'] = 'scale(1) translateZ(0)';
            var anim = new lib.animation(400, lib.cubicbezier.ease, 0, function(i1, i2) {
                curView.style.opacity = (1 - i2) + '';
                curView.style[stylePrefix + 'Transform'] = 'scale(' + (1 - 0.1 * i2) + ')';
            });
            anim.onend(function() {
                curView.style.opacity = '';
                curView.style[stylePrefix + 'Transform'] = '';
                element.removeChild(curView);
                r.resolve(curView);
            });
            anim.play();
        }));

        return lib.promise.every.apply(lib.promise, promises);
    }

    function ReplaceExecuter(state){
        this.exec = function(){
            views.pop();

            lib.promise.every(createView(state), currentPromise).then(function(args) {
                var newView = args[0];
                var curView = args[1];
                outputDebug('begin:replace animation for', {"new":newView, cur:curView});
                return replaceView(newView, curView);
            }, function(err) {
                return lib.promise.reject(err);
            }).then(function(args) {
                var newView = args[0];
                var curView = args[1];
                views.push(newView);

                outputDebug('end:replace animation for', {"new":newView, cur:curView});
                var thenable = curView && curView.context.hide(curView);
                currentPromise = lib.promise.resolve(thenable).then(function() {
                    curView && outputDebug('success:call hide on', {cur:curView});
                    return lib.promise.resolve(newView.context.show(newView, false));
                }, function() {
                    curView && outputError('failure:call hide on', {cur:curView});
                    return lib.promise.reject(false);
                }).then(function(){
                    outputDebug('success:call show on', {"new":newView});
                    return lib.promise.resolve(newView);
                }, function() {
                    outputError('failure:call show on', {"new":newView});
                    return lib.promise.reject(newView);
                });
            }, function(err) {
                outputError('failure:when replace animation', err.stack);
            });       
        }
    }

    this.definePage = function (name, constructor){
        return (pages[name] = new Page(name, constructor));
    }

    this.push = function(name, args, id) {
        new PushExecuter({
            name: name,
            args: args,
            id: id || Date.now()
        }).exec();
    }

    this.pop = function(name, args, id) {
        new PopExecuter({
            name: name,
            args: args,
            id: id || Date.now()
        }).exec();
    }

    this.replace = function(name, args, id) {
        new ReplaceExecuter({
            name: name,
            args: args,
            id: id || Date.now()
        }).exec();
    }

    this.addEventListener = function(name, handler) {
        this.root.addEventListener(name, handler, false);
    }

    this.removeEventListener = function(name, handler) {
        this.root.removeEventListener(name, handler, false);
    }

    this.root = root;
    this.element = element;
}

ctrl.pageview = PageView;

})(window, window['lib'], window['ctrl'] || (window['ctrl'] = {}));