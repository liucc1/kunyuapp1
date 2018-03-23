mui.init();
mui('.mui-scroll-wrapper').scroll();
mui.plusReady(function(){
	eg.ajax( eg.jrURL + "commission/statistics",{},"get",function(data){
		if(data.status == "1"){
			$("#thisMonthCommission").text(data.data.thisMonthCommission);
			$("#cumulativeCommission").text(data.data.cumulativeCommission);
			$("#totalMoney").text(data.data.canWithdrawalsCommission);
		}
	})
	var param = {
		"days":"30"
	}
	eg.postAjax2("commission/list",param,function(data){
		if(data.code == "1"){
			var html = '<tr><th>客户姓名</th><th>激活额度</th><th>佣金计算</th><th>佣金金额</th></tr>';
			var arr = data.rows;
			for(var index in arr){
				var recordList = arr[index];
				$(recordList).each(function(key,val){
					html += '<tr><td>'+val.name+'</td>'
					html += '<td>'+val.activeAmount+'</td>'
					html += '<td>'+val.activeAmount+'*'+val.rebate+'%'+'</td>'
					html += '<td class="table-charge-td">'+val.rebateAmount+'</td></tr>'
				})
			}
			$("#monthBrokerage").html(html);
			eg.postAjax2("commission/list",{"days":""},function(data){
				if(data.code == "1"){
					var html = '<tr><th>客户姓名</th><th>激活额度</th><th>佣金计算</th><th>佣金金额</th></tr>';
					var arr = data.rows;
					for(var index in arr){
						var recordList = arr[index];
						$(recordList).each(function(key,val){
							html += '<tr><td>'+val.name+'</td>'
							html += '<td>'+val.activeAmount+'</td>'
							html += '<td>'+val.activeAmount+'*'+val.rebate+'%'+'</td>'
							html += '<td class="table-charge-td">'+val.rebateAmount+'</td></tr>'
						})
					}
					$("#totalBrokerage").html(html);
				}
			})
		}
	})
})
$("#Item1").on('tap',function(){
	Commission("30","monthBrokerage");
})
$("#Item2").on('tap',function(){
	Commission("","totalBrokerage");
})
//document.addEventListener("swipeleft",function(){
//  Commission("","totalBrokerage");
//});
//document.addEventListener("dragstart",function(){
//  Commission("","totalBrokerage");
//});
function Commission(num,id){
	var param = {
		"days":num
	}
	eg.postAjax2("commission/list",param,function(data){
		if(data.code == "1"){
			var html = '<tr><th>客户姓名</th><th>激活额度</th><th>佣金计算</th><th>佣金金额</th></tr>';
			var arr = data.rows;
			for(var index in arr){
				var recordList = arr[index];
				$(recordList).each(function(key,val){
					html += '<tr><td>'+val.name+'</td>'
					html += '<td>'+val.activeAmount+'</td>'
					html += '<td>'+val.activeAmount+'*'+val.rebate+'%'+'</td>'
					html += '<td class="table-charge-td">'+val.rebateAmount+'</td></tr>'
				})
			}
			$("#"+id).html(html);
		}
	})
}
$("#oBtn").on('tap',function(){
	if($("#totalMoney").text() == "0"){
		mui.toast("无可提取金额",{duration: 'short',type: 'div'});
		return false;
	}
	eg.loginAjax(function(){
		eg.ajax(eg.jrURL + "user/logininfo", {}, 'get', function(data){
			if(data.status == 1){
				if(data.data.userType == 0){
					mui.toast("请先完成实名认证再申请提现",{duration: 'short',type: 'div'});
					mui.openWindow({
				        url:"../my/informance.html",
				        id:"informance"
				   	});
				}else{
					mui.openWindow({
				        url:"../my/withdraw.html",
				        id:"withdraw",
				        extras:{
				        	"totalMoney":$("#totalMoney").text()
				        }
				   });
				}
			}else{
				mui.toast(data.message,{duration: 'short',type: 'div'});
			}
		},function(){
			
		})
	})
})

$("#record").on('tap',function(){
	mui.openWindow({
		url:"withdrawDetail.html",
		id:"withdrawDetail"
	})
})
