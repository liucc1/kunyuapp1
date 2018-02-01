document.addEventListener("plusready", function() {
	var _BARCODE = 'pluginOpenIdcardScan', B = window.plus.bridge;
	var pluginOpenIdcardScan = {
			openIdcardScan : function(side, isVertical, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null
					: function(args) {
						successCallback(args);
					}, fail = typeof errorCallback !== 'function' ? null
					: function(code) {
						errorCallback(code);
					};
			callbackID = B.callbackId(success, fail);
			return B.exec(_BARCODE, "openIdcardScan", [ callbackID,side,isVertical]);
		}
	};
	window.plus.pluginOpenIdcardScan = pluginOpenIdcardScan;
}, true);