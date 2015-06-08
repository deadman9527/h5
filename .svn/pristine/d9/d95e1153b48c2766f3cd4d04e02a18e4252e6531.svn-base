;(function(win, ctrl) {

    var incId = 0;
    function Waterfall(element, options) {
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

        element.setAttribute('data-ctrl-name', 'waterfall');
        element.setAttribute('data-ctrl-id', id);

        var columnWrap = document.createElement('div');
        columnWrap.className = 'column-wrap';
        element.appendChild(columnWrap);
        var isNeedRefresh = true;

        var mode;
        Object.defineProperty(this, 'mode', {
            get: function() {
                return mode;
            },
            set: function(v) {
                if (['column', 'adaptive', 'fix'].indexOf(v) < 0) {
                    throw new Error('Non expected value');
                } else {
                    if (mode !== v) {
                        isNeedRefresh = true;
                        mode = v;
                    }
                }
            }
        });
        this.mode = options.mode || 'column';

        var columnWidth;
        Object.defineProperty(this, 'columnWidth', {
            get: function() {
                var column = columnWrap.querySelector('.column');
                if (column) {
                    return column.getBoundingClientRect().width;
                } else {
                    return columnWidth || 0;
                }
            },
            set: function(v) {
                if (typeof v === 'string') {
                    var vv = parseInt(v);
                    if (vv) {
                        columnWidth = vv;
                    } else {
                        throw new Error('Non expected value');
                    }
                } else if (typeof v === 'number') {
                    columnWidth = v;
                } else {
                    throw new Error('Non expected value');
                }
            }
        });
        if (options.columnWidth) {
            this.columnWidth = options.columnWidth;
        }


        var columnAmount;
        Object.defineProperty(this, 'columnAmount', {
            get: function() {
                var columns = columnWrap.querySelectorAll('.column');
                if (columns && columns.length) {
                    return columns.length;
                } else {
                    return columnAmount || 0;
                }
            },
            set: function(v) {
                if (typeof v === 'string') {
                    var vv = parseInt(v);
                    if (vv) {
                        columnAmount = vv;
                    } else {
                        throw new Error('Non expected value');
                    }
                } else if (typeof v === 'number') {
                    columnAmount = v;
                } else {
                    throw new Error('Non expected value');
                }
            }
        });
        if (options.columnAmount) {
            this.columnAmount = options.columnAmount;
        }

        var columnPadding;
        Object.defineProperty(this, 'columnPadding', {
            get: function() {
                return columnPadding;
            },
            set: function(v) {
                if (typeof v === 'string') {
                    var vv = parseInt(v);
                    if (vv) {
                        columnPadding = vv;
                    } else {
                        throw new Error('Non expected value');
                    }
                } else if (typeof v === 'number') {
                    columnPadding = v;
                } else {
                    throw new Error('Non expected value');
                }
            }
        });
        if (options.columnPadding) {
            this.columnPadding = options.columnPadding;
        }

        var linePadding;
        Object.defineProperty(this, 'linePadding', {
            get: function() {
                return linePadding;
            },
            set: function(v) {
                if (typeof v === 'string') {
                    var vv = parseInt(v);
                    if (vv) {
                        linePadding = vv;
                    } else {
                        throw new Error('Non expected value');
                    }
                } else if (typeof v === 'number') {
                    linePadding = v;
                } else {
                    throw new Error('Non expected value');
                }
            }
        });
        if (options.linePadding) {
            this.linePadding = options.linePadding || 0;
        }

        var syncIndex = 0;
        var viewModel = [];
        Object.defineProperty(this, 'viewModel', {
            get: function() {
                return viewModel;
            },
            set: function(v) {
                if (!(v instanceof Array)) {
                    throw new Error('Non expected value');
                } else {
                    viewModel = v;
                    that.syncViewModel('refresh');
                }
            }
        });

        var columns;
        function renderColumes() {
            var html;
            switch (mode) {
                case 'column':
                    html = new Array(columnAmount + 1).join('<div class="column" style="margin-right:' + columnPadding + 'px;-webkit-box-flex:1;"></div>');
                    break;
                case 'adaptive':
                    var amount = Math.floor((element.getBoundingClientRect().width + columnPadding) / (columnWidth + columnPadding));
                    html = new Array(amount + 1).join('<div class="column" style="width:' + columnWidth + 'px;margin-right:' + columnPadding + 'px;"></div>');
                    break;
                case 'fix':
                    html = new Array(columnAmount + 1).join('<div class="column" style="width:' + columnWidth + 'px;margin-right:' + columnPadding + 'px;"></div>');
                    break;
                default:
                    break;
            }

            columnWrap.innerHTML = html;
            columnWrap.style.height = '';
            columns = Array.prototype.slice.call(columnWrap.querySelectorAll('.column'))
                .map(function(c) {
                    c.height = 0;
                    c.items = {};
                    c.fragment = document.createDocumentFragment();
                    return c;
                });
        }

        function insert2Colume(item) {
            var column = columns[0];
            var maxHeight = column.height;
            for (var i = 1; i < columns.length; i++) {
                var newHeight = columns[i].height || 0;
                if (newHeight < maxHeight) {
                    column = columns[i];
                    maxHeight = newHeight;
                }
            }

            var fragment = column.fragment;
            item.style.webkitTransform = 'translateY(' + column.height + 'px)';
            fragment.appendChild(item);
            
            if (!item.height) {
                column.appendChild(fragment);
            }
            
            column.height = (column.height || 0) + (item.height || item.getBoundingClientRect().height) + linePadding;
        }

        function renderData() {
            for (;syncIndex < viewModel.length; syncIndex++) {
                var data = viewModel[syncIndex];
                var item = document.createElement('div');
                item.className = 'item';
                if (data.width) {
                    item.width = data.width;
                    item.style.width = data.width + 'px';
                }
                if (data.height) {
                    item.height = data.height;
                    item.style.height = data.height + 'px';
                }
                item.innerHTML = data.html;
                insert2Colume(item);
            }

            var maxHeight = 0;
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].fragment && columns[i].fragment.childElementCount) {
                    columns[i].appendChild(columns[i].fragment);
                }
                maxHeight = Math.max(maxHeight, columns[i].height);
            }

            columnWrap.style.height = maxHeight + 'px';
        }

        this.syncViewModel = function(type) {
            type = type || 'padding';
            if (type === 'refresh' || isNeedRefresh) {
                refresh = false;
                syncIndex = 0;
                renderColumes();
                renderData();
            } else if (type === 'padding') {
                renderData();
            }
        }

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

        renderColumes();
    }

    ctrl.waterfall = Waterfall

})(window, window['ctrl'] || (window['ctrl'] = {}));