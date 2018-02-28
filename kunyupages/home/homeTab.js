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
	if(targetTab != "../customerInfo/myAcont.html"){
		var wv = plus.webview.getWebviewById("../customerInfo/myAcont.html");
		if(wv){
			wv.close();
		}
	}
	//需要判断该界面是否创建			
	var tempview = plus.webview.getWebviewById(targetTab);
//	alert(JSON.stringify(tempview.getStyle()));
	
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
//模拟底部选项卡切换事件
mui.trigger(defaultTab, 'tap');