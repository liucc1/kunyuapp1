mui.init({ swipeBack:false });

function getDataBack(res){
	var response = res||pendingListData.json.data
	var el = document.getElementById('productlist')
	for(var i=0;i<response.length;i++){
		var uls = document.createElement('ul')
		uls.className = "mui-table-view mui-table-view-chevron ulTop"
		uls.innerHTML = `<li id="${response[i].id}" data-title="${response[i].status}" class="mui-table-view-cell mui-media">
							<a class="mui-navigate-right font20">
								<div class="mui-table">
					                <div class="mui-table-cell mui-col-xs-10 font14">
					                	<label>${response[i].custName}<span class="ml5">:</span><span class="ml10">${response[i].status}</span></label>
					                	<p>${response[i].time}</p>
					                </div>
					            </div>
							</a>
						</li>`
		el.appendChild(uls)
	}
	$('ul>li').click(function(){
		mui.openWindow({
			url : "./pendingListDetail.html",
			id: "pendingListDetail",
			extras:{
				ids:this.id,
				titleName:this.getAttribute('data-title')
			}
		});
	})
}
mui.plusReady(function() {
	//查询数据
	getDataBack()
	
})


