mui.init();
var defaultTab = document.getElementById("defaultTab");
var appType;
mui.plusReady(function() {
	//匹配iphoneX
	if(mui.os.ios && plus.screen.resolutionHeight=="812"){
	    $(".mui-bar").addClass("mui-iphone_x");
	    subpage_style = {
	        top: '0px',
	        bottom: '80px',
	        cachemode:'noCache'
	    }
	}
	//模拟底部选项卡切换事件
	mui.trigger(defaultTab, 'tap');
	//设备唯一标识
	var uuid = plus.device.uuid;
    localStorage.setItem("uuid",uuid);//存储UUID
/*---------------------------为方便打包--------------------------------*/
//	var arr = ["测试","富滇准生产","联调","乙丙融","生产？"];
//	mui.confirm("请选择网络环境？","提示",arr,function(e){
//		if( e.index === 0){
//			eg.jrURL ="http://172.16.40.173:8080/ssp-customer/";//测试环境
//		}else if(e.index === 1){
//			 eg.jrURL ="http://219.143.184.26:18080/ssp-customer/";//富滇准生产环境
//		}else if(e.index === 2){
//			 eg.jrURL ="http://219.143.184.27:12000/ssp-customer/";//富滇联调环境
//		}else if(e.index === 3){
//			 eg.jrURL ="http://219.143.184.27:10002/ssp-customer/";//乙丙融专用				 
//		}else{
//			 eg.jrURL ="http://36.110.101.68/ssp-customer/";//富滇				 
//		}
//	  	localStorage.setItem("ccpcurl",eg.jrURL);
//	  	//queryAppInfo();//检测最新版本信息
//	});
/*-------------------------------为方便打包---------------------------------------*/   
});

//选项卡点击事件
var activeTab =null;
var subpage_style = {
	top: '0px',
	bottom: '50px',
	cachemode:'noCache'
};
var aniShow = {};
mui('.mui-bar-tab').on('tap', 'a', function(e) {
	var targetTab = this.getAttribute('href');	
	var reloads = this.getAttribute("data-reload");
	if(targetTab == activeTab) { //目标已创建（存在）
		return;
	}
	//隐藏当前;
	plus.webview.hide(activeTab);
	var tempview = plus.webview.getWebviewById(targetTab);
	
	if(tempview) { //已经创建
		//显示目标选项卡 
		//若为iOS平台或非首次显示，则直接显示
		if(reloads == "reloads"){
			tempview.reload(true);
		}
		if(mui.os.ios || aniShow[targetTab]) {
			plus.webview.show(targetTab);
		} else {
			//否则，使用fade-in动画，且保存变量
			var temp = {};
			temp[targetTab] = "true";
			mui.extend(aniShow, temp);
			plus.webview.show(targetTab, "fade-in", 300);
		}
	} else {
		var sub = mui.createWindow({
			id: targetTab,
			url: targetTab,
			styles: subpage_style
		});
		sub.onloading = function() {
			plus.nativeUI.showWaiting("正在加载...");
		};
		sub.onloaded = function() {
			plus.nativeUI.closeWaiting();
		};
		plus.webview.currentWebview().append(sub);
	}
	//切换选项卡高亮
	if(this != defaultTab) {
		defaultTab.classList.remove('mui-active');
		this.classList.add('mui-active');
		defaultTab = this;
	}
	activeTab = sub;

});
window.addEventListener('myFirst',function(){
	mui.trigger(document.getElementById('defaultTab'),"tap");
});

/**
 * 仅限注销登录用，其它刷新个人中心建议用eg.toPersonalInformationHome();  
 */


/**版本检测**/
//function queryAppInfo() {
//	appType =  plus.os.name=="Android"? "apk":"ipa";
//	eg.postAjax("local/queryAppInfo.do", {
//		"appId":"customer",
//		"appVersion":plus.runtime.version,
//		"appType":appType,
//		"serviceId": "02000010"
//	}, function(data) {
//		if(data.forceUpdate =="1"){
//			mustUpdate(data.appUrl);			
//		}else if(data.forceUpdate =="2"){
//			canChooseUpdate(data.appUrl);			
//		}
//	});
//}
///**强制更新
// * @param {Object} appUrl
// */
//function mustUpdate(appUrl){
//	plus.nativeUI.alert("检测到新版本，请更新！",function(e){
//		var i=e.index;	
//		if(i == 0){	
//			localStorage.removeItem("ccpcurl");
//			plus.runtime.openURL(appUrl);
//		}
//	},"提醒","更新");
//}
///**选择性更新
// * @param {Object} appUrl
// */
//function canChooseUpdate(appUrl){
//	plus.nativeUI.confirm("检测到新版本，是否更新？", function(e){
//		if( e.index == 1){
////			localStorage.removeItem("ccpcurl");
//			plus.runtime.openURL(appUrl);
//		}
//	}, "提醒", ["否","是"]);
//}
