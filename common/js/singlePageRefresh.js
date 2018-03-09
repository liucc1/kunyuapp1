/*
 * 单页面下拉刷新上拉加载组件
 * */
var _page = {
	pageSize : 10,//页面条数
	pageNo : 0,//当前页数
	scroller : {},
	init: function(scrollConfig) {
		var _this = this;
		if(!scrollConfig.pageSize){
			scrollConfig.pageSize = _this.pageSize;
		}
		if(!scrollConfig.pageNo){
			scrollConfig.pageNo = _this.pageNo;
		}
		_this.scroller = scrollConfig;
		mui.init({
			pullRefresh: {
				container: scrollConfig.container,
				down: {
					style:'circle',
					callback: function(){
						setTimeout(function() {
							_this.scroller.loadData(true);
							mui(scrollConfig.container).pullRefresh().endPulldownToRefresh();
							mui(scrollConfig.container).pullRefresh().refresh(true);
						}, 500);
					}
				},
				up: {
					auto:true,
					contentinit: '',
					contentdown: '',
					contentrefresh: '正在加载...',
					callback: function(){
						setTimeout(function() {
							_this.scroller.loadData(false);
						}, 500);
					}
				}
			}
		});
		
		_this.scroller.loadData = function(flag) {
			var parameters;
			if(flag){
				this.pageNo = 1;
			}else{
				this.pageNo++;
				if(this.totalPage && this.pageNo*this.pageSize >= this.totalPage){
					mui(scrollConfig.container).pullRefresh().endPullup(true);
				}else{
					mui(scrollConfig.container).pullRefresh().endPullup(false);
				}
			}
			parameters = this.params;
			parameters.page = this.pageNo;
			parameters.limit = this.pageSize;
			plus.nativeUI.showWaiting();
			eg.postAjax(scrollConfig.url, parameters, function(data) {
				plus.nativeUI.closeWaiting();
				_this.scroller.totalPage = data.total;
				if(flag){
					scrollConfig.downSuccess(data);
				}else{
					scrollConfig.upSuccess(data);
				}
				if(_this.scroller.totalPage <= _this.scroller.pageSize){
					mui(scrollConfig.container).pullRefresh().endPullup(true);
				}
			})
		}
	}
	
};
