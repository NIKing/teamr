var $api = (function(){

	var exports = {};

	// 参数配置
	var configs = {

		// 自动隐藏错误信息的时间间隔
		errorMsg_hideTime : 3000,

		// 設置ajax超時
		timeout : 3000,
	}

	// 错误信息功能
	var tips = {
		el : $('#errorMsg'),
		show : function( msg, bHide ){
			this.el.html( msg ).show();

			bHide && this.autoHide();
		},
		autoHide : function(){
			var that = this;

			clearTimeout( timer );
			timer = null;

			var timer = setTimeout(function(){
				that.hide();
			}, configs.errorMsg_hideTime);
		},
		hide : function(){
			this.el.hide();
		}
	}

	// 工具
	var tool = function(){

		var obj = {};

		obj.isNull = function( arg ){
			return arg === null || arg === "" || arg === undefined;
		};

		obj.disabled_true = function(){
			disabled(this, true);
		};

		obj.disabled_false = function(){
			disabled(this, false);
		};

		function disabled (obj, b) {
			obj.attr('disabled', b || false );
		}

		return obj;
	};

	

	var ajax = (function(){

		var baseUrl = "http://182.92.216.154/api/match/";

		var ajaxConfigs = {
			type : 'POST',
			data : {},
			dataType : 'json',
			timeout : configs.timeout,
			error : function(){
				// tips.el && tips.show('请求超时，请检查网络', true);
			}	
		};		

		return function( url, configsData, callbackFn ){

			var baseConfigsData = {
				header : {token: '', authKey: '', clientType: '', deviceId: ''}
			}

			if( typeof configsData === "string" ) {
				baseConfigsData = $.param( baseConfigsData )+"&"+ configsData;
			} else{
				$.extend( baseConfigsData, configsData);
				baseConfigsData = JSON.stringify( baseConfigsData );
			}
			

			ajaxConfigs.url = baseUrl + url;
			ajaxConfigs.data = baseConfigsData;

			ajaxConfigs.success = function( res ){
				callbackFn && callbackFn( res )
			};

			$.ajax( ajaxConfigs );
		}
	})()

	exports.tool = tool();
	exports.ajax = ajax;
	exports.tips = tips;

	return exports;

})()