var eg = {};
var network;//获取手机网络状况
//eg.jrURL = localStorage.getItem("ccpcurl");//为方便打包
eg.jrURL ="https://192.168.3.196:8443/report/";//本地环境
eg.isEmpty = function(obj){
    for (var name in obj){
        return false;
    }
    return true;
};
/***
 * @param {请求地址} url	
 * @param {上送参数} params
 * @param {请求类型} method
 * @param {成功回调} success
 * @param {是否异步} isasync
 * PS ： 是否异步为非必传项
 */
eg.ajax = function(url, params, method, successFun,errorFun, isasync) {
	plus.nativeUI.showWaiting();
	//params.channelId = "kunyuapp";//渠道来源
	//params = JSON.stringify(params);
	isasync = isasync || false;
	$.ajax({
		url: eg.jrURL + "68720a30",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		type: 'get',
		timeout : 60000,
		data: {},
		dataType: "HTML",
		asyn: false,
		success: function(data){
//			plus.nativeUI.closeWaiting(); //关闭等待框
			var s=data.split('"');
			var csrf=s[s.length-2];
			params._csrf = csrf;
			console.log("获得csrf:"+csrf);
			console.log("请求url："+url + ";上送参数为："+JSON.stringify(params));
			$.ajax({
				url: url,
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				type: method,
				timeout : 60000,
				data: params,
				dataType: "JSON",
				async: isasync,
				success: function(data){
					plus.nativeUI.closeWaiting();
					if(typeof(data) == "string"){
						if(data.indexOf('登陆系统')!='-1'){//session超时处理
							var login = plus.webview.getWebviewById("login");
							if(login){
								login.reload();
								login.show();
							}else{
								mui.openWindow({
									url:"../login/login.html",
									id:"login"
								})
							}
						}
						data = JSON.parse(data);
					}
					console.log("返回参数为："+JSON.stringify(data));
					successFun(data);
				},
				error: function(jqXHR, textStatus, errorThrown){
					plus.nativeUI.closeWaiting();			
					if(jqXHR.status =="0" &&jqXHR.readyState =="0"){
						return;
					}
					if(network == 0 || network == 1){
						mui.toast("无网络");
					}else{
		//				alert("jqXHR"+JSON.stringify(jqXHR));
						//alert("textStatus"+JSON.stringify(textStatus));
						//alert("errorThrown"+JSON.stringify(errorThrown));
						mui.toast("系统维护中，请稍后重试");
					}
					//var jsonRep=JSON.parse(jqXHR)
		//			for (var i in jqXHR) {console.log(i+"==="+jqXHR[i]);}
//					errorFun(jqXHR.status);
				}
			});
		},
		error: function(jqXHR, textStatus, errorThrown){
			plus.nativeUI.closeWaiting(); //关闭等待框
			console.log("jqXHR"+JSON.stringify(jqXHR));
		}
	});
};
eg.ajax2 = function(url, params, method, successFun,errorFun, isasync) {
	plus.nativeUI.showWaiting();
	//params.channelId = "kunyuapp";//渠道来源
	//params = JSON.stringify(params);
	isasync = isasync || false;
	$.ajax({
		url: eg.jrURL + "68720a30",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		type: 'get',
		timeout : 60000,
		data: {},
		dataType: "HTML",
		asyn: false,
		success: function(data){
//			plus.nativeUI.closeWaiting(); //关闭等待框
			var s=data.split('"');
			var csrf=s[s.length-2];
//			params._csrf = csrf;
			console.log("获得csrf:"+csrf);
			console.log("请求url："+url + ";上送参数为："+JSON.stringify(params));
			params = JSON.stringify(params);
			$.ajax({
				url: url,
				contentType: "application/json",
				type: method,
				timeout : 60000,
				beforeSend: function (request) {
				    request.setRequestHeader("X-CSRF-TOKEN",csrf);
				},
				data: params,
				dataType: "JSON",
				async: isasync,
				success: function(data){
					plus.nativeUI.closeWaiting();
					if (data.indexOf('html')=='-1') {//返回的不是页面信息
						if(typeof data =='string'){data = JSON.parse(data);}
						console.log("返回参数为："+JSON.stringify(data));	
					}
					successFun(data);
				},
				error: function(jqXHR, textStatus, errorThrown){
					plus.nativeUI.closeWaiting();			
					if(jqXHR.status =="0" &&jqXHR.readyState =="0"){
						return;
					}
					if(network == 0 || network == 1){
						mui.toast("无网络");
					}else{
		//				alert("jqXHR"+JSON.stringify(jqXHR));
		//				alert("textStatus"+JSON.stringify(textStatus));
		//				alert("errorThrown"+JSON.stringify(errorThrown));
						mui.toast("系统维护中，请稍后重试");
					}
					//var jsonRep=JSON.parse(jqXHR)
		//			for (var i in jqXHR) {console.log(i+"==="+jqXHR[i]);}
//						errorFun(jqXHR.status);
				}
			});
		},
		error: function(jqXHR, textStatus, errorThrown){
			plus.nativeUI.closeWaiting(); //关闭等待框
			console.log("jqXHR"+JSON.stringify(jqXHR));
		}
	});
	
};
/***
 * @param {请求.do} url
 * @param {上送参数} params
 * @param {成功回调} fun
 * @param {是否异步} isasync
 * PS ： 是否异步为非必传项
 */
eg.postAjax = function(url, params, sussessFun,errorFun, isasync) {
	if(typeof(isasync) =="undefined"){
		isasync = true;
  	}	
	eg.ajax(eg.jrURL + url, params, "POST", sussessFun,errorFun, isasync);
};
eg.postAjax2 = function(url, params, sussessFun,errorFun, isasync) {
	if(typeof(isasync) =="undefined"){
		isasync = true;
  	}	
	eg.ajax2(eg.jrURL + url, params, "POST", sussessFun,errorFun, isasync);
};
/**
 * http post请求前先获取token
 * @param {Object} url
 * @param {Object} success
 */
eg.getToken = function(url,success){
	plus.nativeUI.showWaiting(); //增加等待框
	$.ajax({
		url: eg.jrURL + "68720a30",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		type: 'get',
		timeout : 60000,
		data: {},
		dataType: "HTML",
		asyn: false,
		success: function(data){
			plus.nativeUI.closeWaiting(); //关闭等待框
			//console.log("getToken——HTML==="+data);
			success(data);
//			var s=data.split('"');
//			var csrf=s[s.length-2];
		},
		error: function(jqXHR, textStatus, errorThrown){
			plus.nativeUI.closeWaiting(); //关闭等待框
			console.log("jqXHR"+JSON.stringify(jqXHR));
		}
	});
}

/***
 * @param {请求地址} url	
 * @param {上送参数} params
 * @param {请求类型} method
 * @param {成功回调} success
 * @param {是否异步} isasync
 * PS ： 是否异步为非必传项
 */
eg.generalAjax = function(url, params, method, sucfun, errfun,isasync) {
	plus.nativeUI.showWaiting();
	isasync = isasync || false;
	console.log("请求url："+url + ";上送参数为："+JSON.stringify(params));
	$.ajax({
		url: eg.jrURL + url,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		type: method,
		timeout : 60000,
		data: params,
		dataType: "JSON",
		async: isasync,
		success: function(data){
			plus.nativeUI.closeWaiting();
			if(typeof data == "string"){
				data = JSON.parse(data)
			}
			console.log("返回参数为："+JSON.stringify(data));
			if(data.status != "-13"){
				sucfun();
			}else{
				errfun();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			plus.nativeUI.closeWaiting();			
			if(jqXHR.status =="0" &&jqXHR.readyState =="0"){
				return;
			}
			if(network == 0 || network == 1){
				mui.toast("无网络");
			}else{
				//alert("jqXHR"+JSON.stringify(jqXHR));
				//alert("textStatus"+JSON.stringify(textStatus));
				//alert("errorThrown"+JSON.stringify(errorThrown));
				mui.toast("系统维护中，请稍后重试");
			}
			//var jsonRep=JSON.parse(jqXHR)
			for (var i in jqXHR) {console.log(i+"==="+jqXHR[i]);}
		}
	});

};

/**页面跳转**/
/**进入首页**/
eg.tohomeindex = function() {
	goHomeIndexPage("index");
};
function goHomeIndexPage(pageID){
	var allPage = plus.webview.all();//获取所有打开的webview
	var homePage = plus.webview.getWebviewById("home");//plus.webview.getLaunchWebview();
	if (!homePage) {
		plus.webview.create("../home/home.html","home");
		homePage = plus.webview.getWebviewById("home");
	} 
	var thisPage = plus.webview.getWebviewById(pageID);
	if(!thisPage){
		plus.webview.create("../home/index.html","index");
		thisPage = plus.webview.getWebviewById(pageID);
	}
	console.log("homePage=="+homePage+"----thisPage=="+thisPage);
	if(thisPage ==null){
		 thisPage = plus.webview.getWebviewById("index");
	}
	for(var i = 0;i < allPage.length;i++){
		if(allPage[i] == homePage  || allPage[i] == thisPage){	
				continue;	
		}else{												
			allPage[i].close();//关闭
		}
	}				
}

/**正则表达式**/
eg.phone = /^1[3|4|5|6|7|8]\d{9}$/;
eg.passwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
eg.name =  /^[\u4E00-\u9FA5]{2,10}$/;
eg.identity = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//身份证号
eg.money = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
eg.address = /^[\u4E00-\u9FA5A-Za-z\d\-\_]{5,60}$/;//住址
/***
 * 判断GPS是否打开（仅限于安卓系统） 
 */
eg.getGEO_status = function() {
	if(Device_model == "iPhone") {
		return true;
	} else {
		var context = plus.android.importClass("android.content.Context");
		var locationManager = plus.android.importClass("android.location.LocationManager");
		var main = plus.android.runtimeMainActivity();
		var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
		return mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);
	}
};
/**
 * dicName 码值数组
 * cnName  val
 */
eg.getcnNamebyenName = function(dicName, enName) {
	var cnName = "";
	for(var i = 0; i < dicName.length; i++) {
		if(dicName[i].value == enName) {
			cnName = dicName[i].text;
		};
	};
	if(!enName) {
		cnName = "";
	};
	return cnName;
};
/**
 * 根据码表的text取value
 * dicName 码值数组
 * cnName  text
 */
eg.getenNamebycnName = function(dicName, cnName) {
	var enName = "";
	for(var i = 0; i < dicName.length; i++) {
		if(dicName[i].text == cnName) {
			enName = dicName[i].value;
		};
	};
	if(!cnName) {
		enName = "";
	};
	return enName;
};
/**
 * 身份证号码验证
 *
 */
eg.userIdCode = function(code) {
	var city = {
		"11": "北京",
		"12": "天津",
		"13": "河北",
		"14": "山西",
		"15": "内蒙古",
		"21": "辽宁",
		"22": "吉林",
		"23": "黑龙江 ",
		"31": "上海",
		"32": "江苏",
		"33": "浙江",
		"34": "安徽",
		"35": "福建",
		"36": "江西",
		"37": "山东",
		"41": "河南",
		"42": "湖北 ",
		"43": "湖南",
		"44": "广东",
		"45": "广西",
		"46": "海南",
		"50": "重庆",
		"51": "四川",
		"52": "贵州",
		"53": "云南",
		"54": "西藏 ",
		"61": "陕西",
		"62": "甘肃",
		"63": "青海",
		"64": "宁夏",
		"65": "新疆",
		"71": "台湾",
		"81": "香港",
		"82": "澳门",
		"91": "国外 "
	};
	var tip = "";
	var pass = true;
	if(!code || !/^[1-9]\d{5}((1[89]|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dx]$/i.test(code)) {
		pass = false;
	} else if(!city[code.substr(0, 2)]) {
		pass = false;
	} else {
		//18位身份证需要验证最后一位校验位
		if(code.length == 18) {
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for(var i = 0; i < 17; i++) {
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if(parity[sum % 11] != code[17].toUpperCase()) {
				pass = false;
			};
		};
	};
	return pass;
};
/***
 * @param {城市ID} cityCode
 * 根据城市的ID回去城市信息
 */
eg.getCityNamebyCityCode = function(cityCode) {
	var province = cityCode.substr(0, 2) + "0000";
	var city = cityCode.substr(0, 4) + "00";
	var cityName;
	for(var i = 0; i < cityData3.length; i++) {
		if(cityData3[i].value == province) {
			cityName = cityData3[i].text;
			for(var j = 0; j < cityData3[i].children.length; j++) {
				if(cityData3[i].children[j].value == city) {
					cityName = cityName + cityData3[i].children[j].text;
					for(var m = 0; m < cityData3[i].children[j].children.length; m++) {
						if(cityData3[i].children[j].children[m].value == cityCode) {
							cityName = cityName + cityData3[i].children[j].children[m].text;
							return cityName;
						}
					}

				}
			}
		}
	}
	if(!cityCode) {
		cityName = "";
	}
	return cityName;
};
/******************判断是否为空***************************/
function isNullVal(val) {
	if(typeof(val)=="undefined" || val == null){
		return true;
	}else{
		var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格
	    if (str == '') {
	        return true;
	//      console.log('空')
	    } else {
	        return false;
	//      console.log('非空');
	    }
	}
	
}
/******************60秒倒计时***************************/
/**
 * Countdown
 * @param {string} ID  当前按钮ID
 * @param {string} Time   时间
 */
function Countdown(ID, Time) {
	if(!Time) {
		Time = 60;
	}
	down();
	function down() {
		if(Time == 0) {
			$("#" + ID).removeAttr("disabled").text("重新获取验证码");
			return false;
		} else {
			$("#" + ID).attr({
				"disabled": "disabled"
			}).text(Time + "秒后再发送");
			Time--;
		}
		setTimeout(function() {
			down();
		}, 1000);
	}
}
/******************表单错误提示***************************/
//调用方法
/**
 * Countdown
 * @param {string} name  名称
 * @param {string} errortype   错误类型
 */
function console_error(name,errortype){
	if(!errortype){
		errortype = "不能为空"
	}else{
		errortype = "格式错误"
	}
	plus.nativeUI.toast( name + errortype ,{'duration' : "long",align:"center",verticalAlign:"bottom"})
}

/******************千分位转换***************************/
//调用方法
/**
 * isThousand
 * @param {string} val  值
 */
function isThousand(val)
{
	if(!val){
		return "0.00"
	}
	if(!isNaN(val)){
		val = val+"";
	}
	var vallength= val.length;
	var indexoff = val.indexOf(".");
	if(indexoff == -1){
		return val.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')+".00";
	}else{
		var dianfirst = val.substr(0,indexoff);
		var dianlost = val.substr(indexoff,vallength);
		if(dianlost.length<3){
			dianlost=dianlost+"0"
		}else{
			dianlost = dianlost.substr(0,3);
		}
		return dianfirst.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')+dianlost;
	}
}



/**
 * 获取随机数
 */
eg.getRandomNum = function() {
	var enName = "";
	var data = {
		"serviceId": "02009005"
	}
	eg.postAjax("safe/getRandomNum.do", data, function(e) {
		enName =e.randomNum;
	},false);
	return enName;
};
/*回到登录页*/
eg.toLoginPage = function(){
	var all = plus.webview.all();
	var curr = plus.webview.getLaunchWebview();
	var login = plus.webview.getWebviewById("login");
	for(var i = 0; i < all.length; i++) {
		if(all[i] != curr && all[i] != login){
			all[i].close();
		}
	}
	login.reload();	
}
/*回到首页*/
eg.toHome = function(){
	var all = plus.webview.all();
	var home = plus.webview.getLaunchWebview();
	for(var i = 0; i < all.length; i++) {
		if(all[i] != home){
			all[i].close();
		}else{
			home.reload();
		}
	}
}

/***
 * 回到账户首页 
 */
eg.toMyAccountPage = function() {	
	var details = plus.webview.getLaunchWebview();
	mui.fire(details,"trige",{});
};
/***
 * 回到首页 
 */
eg.toHomePage = function() {
	toHomeIndexPage("../home/index.html");
};
/***
 * 回到个人中心首页 
 */
eg.toPersonalInformationHome = function() {
	toHomeIndexPage("../customerInfo/personalInformationHome.html");
};
/***
 * 回到发现首页 
 */
eg.toFindIndex = function() {
	toHomeIndexPage("../customerInfo/findIndex.html");
};
function toHomeIndexPage(pageID){
	//获取所有打开的webview
	var allPage = plus.webview.all();
	//首页
	var homePage = plus.webview.getWebviewById("../home/home.html");//plus.webview.getLaunchWebview();
	//获取首页页面	
	var thisPage = plus.webview.getWebviewById(pageID);	
	if(thisPage ==null){
		 thisPage = plus.webview.getWebviewById("../customerInfo/indexEE.html");
	}
	for(var i = 0;i < allPage.length;i++){
		if(allPage[i] == homePage   || allPage[i] == thisPage){	
				continue;	
		}else{												
			allPage[i].close();//关闭
		}
	}				
	homePage.show();				
	thisPage.reload();
}
/***
 *竖屏 
 */
mui.plusReady(function(){
	plus.screen.lockOrientation("portrait-primary");
	network = plus.networkinfo.getCurrentType();
});

/****
 * 把图片转换为base64
 * @param {图片ID对象} img
 */

eg.getBase64Image = function(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL ;// return dataURL.replace("data:image/png;base64,", ""); 
}
 
/****
 * 把图片转换为base64
 * @param {图片ID对象} img
 */

//eg.getBase64Image = function(img,width,height) {
//          var canvas = document.createElement("canvas");
//        	canvas.width = width ? width : img.width;
//       	canvas.height = height ? height : img.height;
//          var ctx = canvas.getContext("2d");
//          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//          var dataURL = canvas.toDataURL("image/png");
//          return dataURL // return dataURL.replace("data:image/png;base64,", ""); 
//}




/**
 * 判断当前用户是否登录
 * 参数：lineFun：登录状态的回调函数
 *      OffLineFun:未登录状态的回调函数
 */
eg.loginAjax = function(lineFun,OffLineFun) {
	if(!OffLineFun){
		OffLineFun = function(){
			mui.openWindow({
				url:"../login/login.html",
				id:"login"
			})
		};
	}
	eg.generalAjax("app/logstatus", {}, 'get', lineFun, OffLineFun);
};

/**
 * 去登录
 * @param {Object} destinationPage   目标页面路径
 * @param {Object} pageId            目标页面ID
 */
 eg.toLogin =  function(destinationPage,pageId){
 	
 	var  commonMobile = localStorage.getItem("mobileAccount");	
 	var  errorCount =localStorage.getItem("gesturePasswordErrorCount");
 	
	if(commonMobile !=null&&parseInt(errorCount)<3){
		 var url = "user/judgeGesturePassword.do";
      	 var parameters = {
                 "serviceId":"02001008",
                 "mobile":commonMobile
             };
        eg.postAjax(url,parameters,function(data){  
           	//跳转到手势密码登录页面           	
           if(data.result){
           		 mui.openWindow({
                 	url:"../customerInfo/gesturePasswordLogin.html",
                		id:"gesturePasswordLogin",
                	extras:{
                		destinationPage:destinationPage,
                		pageId:pageId
                	}
           	 });          		
           	}else{
           		//跳转到账号登录页面 
           		mui.openWindow({
					url : "../customerInfo/login.html",
					id: "login",
                	extras:{
                		destinationPage:destinationPage,
                		pageId:pageId
                	}
				});	
           	}	
     });	
	}else{
		mui.openWindow({
			url : "../customerInfo/login.html",
			id: "login",
        	 	extras:{
                		destinationPage:destinationPage,
                		pageId:pageId
                	}
		});	
	}
}

