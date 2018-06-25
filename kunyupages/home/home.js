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
	
	//设备唯一标识
	var uuid = plus.device.uuid;
    localStorage.setItem("uuid",uuid);//存储UUID
    //判断是否为假页面
    $.get( eg.jrURL + "sys/test/KYAPP",function(data){
    	if(data.data == "F"){
    		$("#defaultTab").attr("href","./indexDemo.html")
    	}
    	//模拟底部选项卡切换事件
		mui.trigger(defaultTab, 'tap');
    })
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