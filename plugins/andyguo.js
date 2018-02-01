(function() {
	var index = {};

	/**
	 * ajax请求
	 * @param {string} _url  请求地址   默认return
	 * @param {string} _type 请求类型   默认get
	 * @param {string} _data 上送消息   默认为空
	 * @param {string} _dataType 预计返回类型    默认为json
	 * @param {string} _cache   是否缓存   默认为 true
	 */
	index.ajax = function(_url, _type, back, _data, _error, _dataType, sync, _cache) {
		if(!_url) return;
		if(!_data) {
			_data = ""
		} else {
			_data = JSON.stringify(_data);
		}
		if(!_cache) _cache = true;
		if(!_dataType) _dataType = "json";
		if(!_type) _type = "post";
		if(!sync) sync = false;
		$.ajax({
			url: _url,
			type: _type,
			data: _data,
			contentType: "application/json",
			dataType: _dataType,
			async: sync,
			cache: _cache,
			success: back,
			error: _error
		})
	}
	index.select = function(name) {
		var thisselect = {};
		index.ajax("../js/select.json", "get", selectok)

		function selectok(e) {
			var result = eval(e);
			var selectid = $("#" + name);
			selectid.html("");
			thisselect = e[name];
		}
		return thisselect;
	}

	index.index = function() {
			/***
			 * * 未读消息
			 * **/
			var notReadMessage_data = {
				"serviceId": "02000007",
				"type": "0"
			};
			$("#notReadMessage").html("");
			eg.postAjax("local/queryNotReadNum.do", notReadMessage_data, notReadMessage)

			function notReadMessage(e) {
				if(e.count > 1) {
					$(".flow_mail_nub").show();
				} else {
					$(".flow_mail_nub").hide();
				}
			}

			/***
			 * * banner
			 * **/
			var queryAd_data = {
				"serviceId": "02000005"
			};
			$("#queryAd").html("");
			eg.postAjax("local/queryAd.do", queryAd_data, queryAd)

			function queryAd(e) {
				if(e.adList == "") {
					return
				}
				var html = '	<img src="' + e.adList[0].imageUrl + '" width="100%" alt="' + e.adList[0].content + '" />';
				$("#queryAd").append(html);
			}
			/***
			 * * 首页公告
			 * **/
			var queryNotice_data = {
				"serviceId": "02000003"
			};
			eg.postAjax("local/queryNotice.do", queryNotice_data, queryNotice)

			function queryNotice(e) {
				if(e.noticeList == "") {
					return
				}
				if($("#queryNotice").length > 0) {
					$(e.noticeList).each(function(key, val) {
						var html = '<li><a href="" class="color_333">' + val.noticeName + '</a></li>';
						$("#queryNotice").append(html)
					})
				}
			}

			/***
			 * * 产品
			 * **/
			var prd_data = {
				"serviceId": "02000006"
			};
			eg.postAjax("local/queryPrd.do", prd_data, function(e) {
				if(e.prdList == "") {
					return
				}
				$(e.prdList).each(function(key, val) {
					var html = '<div class="prdlist" data-prdSeq="' + val.prdSeq + '"><div class="mt10" style="padding-left:0.7rem;">'
					html += '<h6 class="title_h6 font14 pl0">' + val.prdName + '</h6>'
					html += '			<span class="button_span_back ml5 font11">' + val.feature + '</span>'
					html += '		</div>'
					html += '		<div class="cent_cont mt10">'
					html += '			<span class="title_h2">' + val.prdRate + '<span class="font15"> % </span></span>'
					html += '			<span class="title_h2">' + val.prdLoadDays + '<span class="font15"> 天 </span></span>'
					html += '		</div>'
					html += '		<div class="cent_cont font12">'
					html += '			<span class="title_xi color_666">年利率</span>'
					html += '			<span class="title_xi color_666">放款时间</span>'
					html += '		</div>'
					html += '		<div class="cent_cont">'
					html += '			<p class="title_xi color_666"><img src="../images/chart1.png" class="tip_img" alt="" /><span>比央行贷款利率低</span><span class="color_4aa"> ' + (val.pbocRate - val.prdRate) + ' </span>%</p>'
					html += '			<p class="title_xi color_666 text_l"><img src="../images/icon1.png" class="tip_img" alt="" />比央行放款时间快<span class="color_4aa"> ' + (val.pbocLoanDays - val.prdLoadDays) + ' </span>天</p>'

					html += '		</div>'
					html += '		<div class="mui-content-padded" style="margin-top:10px;margin-bottom:2rem;">'
					html += '			<button type="button" class="mui-btn mui-btn-primary mui-btn-block" id="oBtn" data-prdSeq="' + val.prdSeq + '">立即申请</button>'
					html += '		</div></div>'
					$("#prodlist").append(html);
					html = "";
					var prdSeq = $(this).attr("data-prdSeq");
					localStorage.setItem("prdSeq", prdSeq);
				})
			})
		}
		/*$(function(){
			$("#oBtn").click(function(){
				mui.openWindow({
					"url":"../customerInfo/certification.html",
					"id":"certification"
				})
			})
		});*/

	

	/**
	 * 公告列表
	 *
	 */
	index.qNotice = function() {
		var queryNotice_data = {
			"serviceId": "02000003"
		};
		eg.postAjax("local/queryNotice.do", queryNotice_data, Notice)

		function Notice(e) {
			if(e.noticeList == "") {
				return
			}
			$(e.noticeList).each(function(key, val) {
				var thisval = '<div class="informationDate mt10">' + val.publishDate + '</div>'
				thisval += '<div class="informationContent">'
				thisval += '<h5>' + val.noticeName + '</h5>'
				thisval += '<p>' + val.content + '</p>'
				thisval += '</div>';
				$("#noticeList").append(thisval);
			})

		}
	}
	window.index = index;
})()