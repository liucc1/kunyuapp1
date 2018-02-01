
mui.init({
	swipeBack: false
});
$("#presquery").on('tap',function(){
	mui.openWindow({
		"url" : "../index/progressquery.html",
		"id": "progressquery"		
	});
});

var MyMar1;//定时器id
var speed = 40;//滚动时间间隔
var noticDataList;
$(".flow_mail_nub").hide();
document.addEventListener( "plusready", onPlusReady, false );
function onPlusReady() {                       
    queryAd();
    queryNotice();
    queryPrd();                
	
	if(eg.sessionCanUse()){
		noReadMsg();
	}
}
/**
 * 未读消息
 */
function noReadMsg() {
	eg.postAjax("local/queryNotReadNum.do", {
		"serviceId": "02000007",
		"type": "1"
	}, function(e) {
		if(e.count > 0) {
			$(".flow_mail_nub").show();
		} else {
			$(".flow_mail_nub").hide();
		}
	})
}


/***
 * 广告
 */
function  queryAd(){
    eg.postAjax("local/queryAd.do", {
                "serviceId": "02000005"
                }, function(e) {
                $(".pos_r").removeClass("wait");
                               
                var htmlOne  = '<div class="mui-slider-item mui-slider-item-duplicate"><a>';
                		htmlOne +=	'<img src="' + e.adList[e.adList.length - 1].imageUrl + '" /></a></div>';                		
                	var  htmlTwo = 	'<div class="mui-indicator mui-active"></div>';
                $(e.adList).each(function(key, val) {                	
                		htmlOne += '<div class="mui-slider-item"><a><img src="' + val.imageUrl + '" /></a></div>';   	
                		if(key != 0){
                			htmlTwo += '<div class="mui-indicator"></div>';
                		}
                 });
                 htmlOne += '<div class="mui-slider-item mui-slider-item-duplicate"><a><img src="' + e.adList[0].imageUrl + '" /></a></div>';
                $("#queryAdlist").append(htmlOne);
                $(".mui-slider-indicator").append(htmlTwo);
                mui('.mui-slider').slider({
                           interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
                                         });
                })
    
}

/***
 * 公告
 */
function queryNotice(){
    var queryNotice_data = {
        "serviceId": "02000003",
        "showAll":false
    };
    eg.postAjax("local/queryNotice.do", queryNotice_data, function(e) {
    	var noticeList = e.noticeList;
    	noticDataList = e.noticeList;
    	if(noticeList.length > 0) {
			$('#notices').show();
			if(noticeList.length == 1){
				var html = '<p theIndex = "0" style="margin-left:5px;color:#4AA8FF">'
					html += noticeList[0].noticeName
					html += '</p>';
				$("#colee1").append(html);
			}else{
				$(noticeList).each(function(key,val){
					var html = '<p theIndex = "' + key + '" style="margin-left:5px;color:#4AA8FF">'
						html += val.noticeName
						html += '</p>';
					$("#colee1").append(html);
				});				
				var colee2 = document.getElementById("colee2");
				var colee1 = document.getElementById("colee1");
				var colee = document.getElementById("colee");
				colee2.innerHTML = colee1.innerHTML; //克隆colee1为colee2
				MyMar1 = setInterval(Marquee1, speed) //设置定时器
			}
		}
    })
    mui("#colee").on("tap",'#colee1>p',function(){
		var theIndex = $(this).attr("theIndex");
		mui.openWindow({
			"url": "../announcement/announcementDetails.html",
			"id": "announcementDetails",
			extras: {
				"noticDataList": noticDataList[theIndex] 
			}			
		});	
	});
}

//滚动函数
function Marquee1() {
	//当滚动至colee1与colee2交界时
//				console.log(colee.scrollTop);
	if(colee2.offsetTop - colee.scrollTop <= 1) {
		colee.scrollTop = 0; //colee跳到最顶端
	} else if(colee.scrollTop % 40 == 0) {
		clearInterval(MyMar1);
		setTimeout(cc, 400);
		colee.scrollTop++
	} else {
		colee.scrollTop++
	}
}
function cc() {
	MyMar1 = setInterval(Marquee1, speed);
}

$("#notice").click(function() {
	mui.openWindow({
		"url": "../announcement/announcementInformation.html",
		"id": "announcementInformation"
	})
})
$("#queryNotice li a").click(function() {
		var publishDate = $(this).attr("data-publishDate");
		var noticeName = $(this).text();
		var content = $(this).attr("data-content");
		mui.openWindow({
			"url": "../announcement/announcementDetails.html",
			"id": "announcementDetails",
			extras: {
				"publishDate": publishDate,
				"noticeName": noticeName,
				"content": content
			}
		})
});
/***
 * 查询产品
 */
function  queryPrd(){	
	eg.postAjax("local/queryPrd.do", {
		"serviceId": "02000006"
	}, function(e) {
		if(e.prdList == "") {
			return
		}
		document.getElementById("btn").setAttribute("data-prdSeq",e.prdList[0].prdSeq);
	});	
}
		
//点击进入产品详情
//mui("#prodlist").on('tap',".prdlist",function(){
//	mui.openWindow({
//		url:"productInfo.html",
//		id:"productInfo"
//	})
//});

//点击进入产品详情	
$("#msgInfo").on("tap", function() {	
	eg.goMustLoginPage("../announcement/informationNotice.html","informationNotice");	
});

//点击立即申请按钮
$("#btn").on("tap", function() {
	
	
	 	var  commonMobile = localStorage.getItem("mobileAccount");	
		if(commonMobile != null){
			if(eg.sessionCanUse()){
				eg.postAjax("customer/queryAccountStatus.do", {
						"serviceId": "02005019"
				}, function(data) {
					if(data.status != 90) {
							var details = plus.webview.getLaunchWebview();
							mui.fire(details,"trige",{});
					}else{				
						mui.openWindow({
									url: "../customerInfo/certification.html",
									id: "certification"							
						})				
					}
				});
			}else{		
				eg.toLogin("../customerInfo/certification.html","certification");		
			}
		}else{
			mui.openWindow({
				url: "../customerInfo/certification.html",
				id: "certification"							
			})			
		}
});

window.addEventListener('refreshMsg',function(){	
	if(eg.sessionCanUse()){
		noReadMsg();
	}
});


