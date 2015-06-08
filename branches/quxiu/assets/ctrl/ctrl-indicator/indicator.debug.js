;(function(win, ctrl) {

    var incId = 0;
    function Indicator(element, options) {
        var that = this;
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

        element.setAttribute('data-ctrl-name', 'indicator');
        element.setAttribute('data-ctrl-id', id);

        function setDirection() {
            element.setAttribute('data-dir', direction);
        }

        function render() {
            element.innerHTML = new Array(amount + 1).join('<span style="background-size: 0.4rem 0.8rem;background-position: 0 0;"></span>') + '<b class="hide"></b>';
        }

        function setCurrent() {
            var curEl = element.querySelector('span.cur');
            if (curEl) {
                curEl.style.backgroundPosition = '0 0';
                curEl.className = '';    
            }
            var newEl = element.querySelector('span:nth-child(' + index + ')');
            newEl.className = 'cur';
            newEl.style.backgroundPosition = '0 -0.4rem';
        }

        function setPage() {
            var el = element.querySelector('b');
            if (showpage) {
                el.className = 'show';
            } else {
                el.className = 'hide';
            }
            el.innerHTML = index + ' / ' + amount;

        }

        var direction;
        Object.defineProperty(this, 'direction', {
            get: function() {
                return direction;
            },

            set: function(v) {
                if (typeof v === 'string' && v.match(/^v|vertical|h|horizontal$/)) {
                    direction = v.length > 1?v:(v === 'v'?'vertical':'horizontal');
                    setDirection();
                } else {
                    throw new Error('Non expected value');
                }
            }
        });
        this.direction = options.direction || 'horizontal';

        var amount;
        Object.defineProperty(this, 'amount', {
            get: function() {
                return amount;
            },

            set: function(v) {
                if (typeof v === 'number') {
                    amount = v;
                    render();
                    this.index = 1;
                } else {
                    throw new Error('Non expected value');
                }
            }
        });
        this.amount = options.amount;

        var index;
        Object.defineProperty(this, 'index', {
            get: function() {
                return index;
            },

            set: function(v) {
                if (typeof v === 'number' && v > 0 && v <= amount) {
                    index = v;
                    setCurrent();
                    setPage();
                } else {
                    throw new Error('Non expected value');
                }
            }
        });
        this.index = options.index || 1;

        var showpage;
        Object.defineProperty(this, 'showpage', {
            get: function() {
                return index;
            },

            set: function(v) {
                if (typeof v === 'boolean') {
                    showpage = v;
                    setPage();
                } else {
                    throw new Error('Non expected value');
                }
            }
        });
        this.showpage = options.showpage || false;

        this.addEventListener = function() {
            element.addEventListener.apply(element, arguments);
        }

        this.removeEventListener = function() {
            element.removeEventListener.apply(element, arguments);
        }

        this.remove = function() {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }

        this.element = element;
        this.root = root;
    }

    ctrl.indicator = Indicator;

})(window, window['ctrl'] || (window['ctrl'] = {}));