// @require AMap `高德地图js api`
;(function (win, lib) {
	if (!lib) window.lib = {};
	lib = window.lib;

	function extend (target, source, isOverWrite) {
		if (isOverWrite == undefined) isOverWrite = true;
		for (var k in source) {
			if (!(k in target) || isOverWrite) {
				target[k] = source[k];
			}
		}
		return target;
	}

	var _getUid = function () {
		var id = 0;
		return function () {
			return id ++;
		}
	}();
	

	/**
	 * 基本参数 lon,lat,container
	 * 默认加载工具条和比例尺，不加载鹰眼。默认自动定位到当前位置
	 * 
	 * @param {Object} params
	 */
	lib.AMap = function (params) {
		var _config = {
			lon: 116.404,
			lat: 39.915,
			autoPosition: true
		};

		this._cfg = extend(_config, params);

		this.mapObj = new AMap.Map(this._cfg.container, {
			center:new AMap.LngLat(this._cfg.lon, this._cfg.lat)
		});

		this._initDefaultPlugins();

	};

	lib.AMap.prototype = {
		// 默认加载工具条和比例尺
		_initDefaultPlugins: function () {
			var mapObj = this.mapObj;
			var me = this;
			var _cfg = this._cfg;

			this.markers = [];

		  	mapObj.plugin(["AMap.ToolBar","AMap.Scale"],function(){  
			  //加载工具条  
			  tool=new AMap.ToolBar({  
			    direction:true,//隐藏方向导航  
			    ruler:true,//隐藏视野级别控制尺  
			    autoPosition: _cfg.autoPosition //禁止自动定位  
			  });  
			  mapObj.addControl(tool);  
 
			  //加载比例尺  
			  scale=new AMap.Scale();  
			  mapObj.addControl(scale);  
			}); 
		},
		getCenter: function () {
			var o = this.mapObj.getCenter();
			return {
				lon: o.getLng(),
				lat: o.getLat()
			};
		},
		setCenter: function (lon, lat) {
			var pos = new AMap.LngLat(lon, lat);
			this.mapObj.setCenter(pos);
			return this;
		},
		getZoom: function () {
			return this.mapObj.getZoom();
		},
		setZoom: function (lv) {
			lv = Math.max(Math.min(18, parseInt(lv)), 3);
			this.mapObj.setZoom(lv);
			return this;
		},
		getScale: function () {
			return this.mapObj.getScale();
		},
		moveTo: function (lon, lat) {
			var pos = new AMap.LngLat(lon, lat);
			this.mapObj.panTo(pos);
			return this;
		},
		/**
		 * 添加浮层
		 * id, lon, lat, content, offset[optional]
		 */
		addLayer: function (params) {
			if (params.id == undefined) {
				params.id = _getUid();
			} 
			if (!params.offset) {
				params.offset = [0, 0];
			}
			var marker = new AMap.Marker({
				map: this.mapObj,
				position: new AMap.LngLat(params.lon, params.lat),
				offset: new AMap.Pixel(params.offset[0], params.offset[1]),
				content: params.content
			});

			marker.id = params.id;
			this.markers.push(marker);

			return this;
		},
		getLayer: function (id) {
			for (var i = 0; i < this.markers.length; i ++) {
				if (id === this.markers[i].id) {
					return this.markers[i];
				}
			}
			return null;
		},
		removeLayer: function (id) {
			for (var i = 0; i < this.markers.length; i ++) {
				if (id === this.markers[i].id) {
					this.markers[i].hide();
					this.markers[i] = null;
					return this.markers.splice(i, 1);
				}
			}
		},
		destory: function () {
			return this.mapObj.destory();
		}
	};

	
})(window, window.lib);