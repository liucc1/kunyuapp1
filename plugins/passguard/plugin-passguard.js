
/**
 * 使用第三方密码键盘；
 * 
 * 
 * <p>插件名称：</p>
 * 
 * <b>pluginPGKeyboard</b>
 * 
 * <p>API>/p>
 * 
 * md5加密
 * openMD5Keyboard ： function
 * @param showId 密码键盘输入框的ID值
 * @param isNumber 是否仅使用数字键盘；true为仅使用数字键盘，false为使用字母和数字全键盘（默认）。
 * @param confuse 设置键盘是否乱序。0——默认不乱序、1——初始化后只乱一次、2——每次点击键盘时乱序一次
 * @param maxLength 设置键盘可输入的最大长度
 * @param showEditText 键盘是否显示edittext
 * @param watchOutside 点击空白区域关闭密码键盘
 * @param buttonPress 键盘按下效果
 * @param regex 密码设置的正则表达式--可以设置为"",表示不设置密码正则表达式--demo仅提供测试，具体的设置方式根据业务规则去走
 * @param inputregex设置键盘输入正则规则--可以设置为""无限制--demo仅提供测试，具体的设置方式根据业务规则去走
 * 
 * aes加密
 * openAESKeyboard ： function
 * @param showId 密码键盘输入框的ID值
 * @param isNumber 是否仅使用数字键盘；true为仅使用数字键盘，false为使用字母和数字全键盘（默认）。
 * @param confuse 设置键盘是否乱序。
 * @param maxLength 设置键盘可输入的最大长度
 * @param showEditText 键盘是否显示edittext
 * @param watchOutside 点击空白区域关闭密码键盘
 * @param buttonPress 键盘按下效果
 * @param regex 密码设置的正则表达式--可以设置为"",表示不设置密码正则表达式--demo仅提供测试，具体的设置方式根据业务规则去走
 * @param inputregex设置键盘输入正则规则--可以设置为""无限制--demo仅提供测试，具体的设置方式根据业务规则去走
 * @param random 随机因子，在AES加密方式时生效，用于获取AES加密秘钥
 * @param successCallback 成功回调函数
 * @param errorCallback 失败回调函数
 *
 * rsa+aes加密
 * openRSAAESKeyboard ： function
 * @param showId 密码键盘输入框的ID值
 * @param isNumber 是否仅使用数字键盘；true为仅使用数字键盘，false为使用字母和数字全键盘（默认）。
 * @param confuse 设置键盘是否乱序。
 * @param maxLength 设置键盘可输入的最大长度
 * @param showEditText 键盘是否显示edittext
 * @param watchOutside 点击空白区域关闭密码键盘
 * @param buttonPress 键盘按下效果
 * @param regex 密码设置的正则表达式--可以设置为"",表示不设置密码正则表达式--demo仅提供测试，具体的设置方式根据业务规则去走
 * @param inputregex设置键盘输入正则规则--可以设置为""无限制--demo仅提供测试，具体的设置方式根据业务规则去走
 * @param random 随机因子，在AES加密方式时生效，用于获取AES加密秘钥
 * @param publicKey rsa公钥
 * @param successCallback 成功回调函数
 * @param errorCallback 失败回调函数
 * 
 * sm2加密
 * openSM2Keyboard ： function
 * openRSAAESKeyboard ： function
 * @param showId 密码键盘输入框的ID值
 * @param isNumber 是否仅使用数字键盘；true为仅使用数字键盘，false为使用字母和数字全键盘（默认）。
 * @param confuse 设置键盘是否乱序。
 * @param maxLength 设置键盘可输入的最大长度
 * @param showEditText 键盘是否显示edittext
 * @param watchOutside 点击空白区域关闭密码键盘
 * @param buttonPress 键盘按下效果
 * @param regex 密码设置的正则表达式--可以设置为"",表示不设置密码正则表达式--demo仅提供测试，具体的设置方式根据业务规则去走
 * @param inputregex设置键盘输入正则规则--可以设置为""无限制--demo仅提供测试，具体的设置方式根据业务规则去走
 * @param random 随机因子，在AES加密方式时生效，用于获取AES加密秘钥
 * @param eccKey sm2国密key
 * @param successCallback 成功回调函数
 * @param errorCallback 失败回调函数
 * 
 * sm4加密
 * openSM4Keyboard ： function
 * @param showId 密码键盘输入框的ID值
 * @param isNumber 是否仅使用数字键盘；true为仅使用数字键盘，false为使用字母和数字全键盘（默认）。
 * @param confuse 设置键盘是否乱序。
 * @param maxLength 设置键盘可输入的最大长度
 * @param showEditText 键盘是否显示edittext
 * @param watchOutside 点击空白区域关闭密码键盘
 * @param buttonPress 键盘按下效果
 * @param regex 密码设置的正则表达式--可以设置为"",表示不设置密码正则表达式--demo仅提供测试，具体的设置方式根据业务规则去走
 * @param inputregex设置键盘输入正则规则--可以设置为""无限制--demo仅提供测试，具体的设置方式根据业务规则去走
 * @param random 随机因子，在AES加密方式时生效，用于获取AES加密秘钥
 * @param successCallback 成功回调函数
 * @param errorCallback 失败回调函数
 * 
 * 收起键盘
 * hideKeyboard : function() 
 *
 * 校验是否符合设置的正则表达式
 * checkMatch : function()
 * @param id 密码键盘的id--需要跟初始化的时候设置的id保持一致，详见demo 
 *
 *
 * 清空键盘
 * clearKeyboard ： function(id)
 * @param id 密码键盘的id--需要跟初始化的时候设置的id保持一致，详见demo
 */
document.addEventListener("plusready", function() {
	var _BARCODE = 'pluginPGKeyboard', B = window.plus.bridge;
	var pluginPGKeyboard = {
		openMD5Keyboard : function(showId, isNumber, confuse, maxLength,showEditText,watchOutside,buttonPress,regex,inputregex, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null
					: function(args) {
						successCallback(args);
					}, fail = typeof errorCallback !== 'function' ? null
					: function(args) {
						errorCallback(args);
					};
			callbackID = B.callbackId(success, fail);
			return B.exec(_BARCODE, "openMD5Keyboard", [ callbackID, showId, isNumber, confuse, maxLength,showEditText,watchOutside,buttonPress,regex,inputregex]);
		},
		openAESKeyboard : function(showId, isNumber, confuse, maxLength,showEditText,watchOutside,buttonPress,regex,inputregex,random, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null
					: function(args) {
						successCallback(args);
					}, fail = typeof errorCallback !== 'function' ? null
					: function(args) {
						errorCallback(args);
					};
			callbackID = B.callbackId(success, fail);
			return B.exec(_BARCODE, "openAESKeyboard", [ callbackID, showId, isNumber, confuse, maxLength,showEditText,watchOutside,buttonPress,regex,inputregex,random]);
		},
		openRSAAESKeyboard : function(showId, isNumber, confuse, maxLength,showEditText,watchOutside,buttonPress,regex,inputregex,random,publicKey, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null
					: function(args) {
						successCallback(args);
					}, fail = typeof errorCallback !== 'function' ? null
					: function(args) {
						errorCallback(args);
					};
			callbackID = B.callbackId(success, fail);
			return B.exec(_BARCODE, "openRSAAESKeyboard", [ callbackID, showId, isNumber, confuse, maxLength,showEditText,watchOutside,buttonPress,regex,inputregex,random,publicKey]);
		},
		openSM2Keyboard : function(showId, isNumber, confuse, maxLength,showEditText,watchOutside,buttonPress,regex,inputregex,random,eccKey, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null
					: function(args) {
						successCallback(args);
					}, fail = typeof errorCallback !== 'function' ? null
					: function(args) {
						errorCallback(args);
					};
			callbackID = B.callbackId(success, fail);
			return B.exec(_BARCODE, "openSM2Keyboard", [callbackID, showId, isNumber, confuse, maxLength,showEditText,watchOutside,buttonPress,regex,inputregex,random,eccKey]);
		},
		openSM4Keyboard : function(showId, isNumber, confuse, maxLength,showEditText,watchOutside,buttonPress,regex,inputregex,random, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null
					: function(args) {
						successCallback(args);
					}, fail = typeof errorCallback !== 'function' ? null
					: function(args) {
						errorCallback(args);
					};
			callbackID = B.callbackId(success, fail);
			return B.exec(_BARCODE, "openSM4Keyboard", [ callbackID, showId, isNumber, confuse, maxLength,showEditText,watchOutside,buttonPress,regex,inputregex,random]);
		},
		checkMatch : function(showId){
			return B.execSync(_BARCODE, "checkMatch", [showId]);
		},
		clearKeyboard : function(showId) {
			return B.execSync(_BARCODE, "clearKeyboard", [showId]);
		},
          hideKeyboard : function(successCallback, errorCallback) {
          var success = typeof successCallback !== 'function' ? null
          : function(args) {
          successCallback(args);
          }, fail = typeof errorCallback !== 'function' ? null
          : function(args) {
          errorCallback(args);
          };
          callbackID = B.callbackId(success, fail);
          return B.exec(_BARCODE, "hideKeyboard", [callbackID]);
          }
	};
	window.plus.pluginPGKeyboard = pluginPGKeyboard;
}, true);


