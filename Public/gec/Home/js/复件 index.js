function buy(){
	$.showLoading();
               var tt=0;//0为买涨，1为买跌
			   var yy=0;//1为使用现金，0为使用代金券
			   if($("#mybtn .bz").attr("data-zz")==1){
				   tt=0;
			   }else{
				   tt=1;
			   }
			   if($("#buy_box .syxj").hasClass("active")){
				   yy=1;
			   }else{
				   yy=0;
			   }
    		$.ajax({
    			url: "/index.php/Home/Business/addorder.html",
    			type: 'POST',
    			dataType: 'json',
    			data: {uid:$('#uid').val(),pid:$("#item1").attr("data-value"),gmtime:$("#item2").attr("data-value"),gmprice:$("#buyPrice").val(),ostyle:tt,buyprice:parseFloat($("#buy_box .q1 .Zprice").html()),dq:yy,djq:$("#myquan>span").attr("data-eid")},
    		})
    		.done(function(data) {	
				$.hideLoading();
       			if(data.status==1){
                  $.alert(data.msg,"提示",function(){
				  window.location.href="/index.php/Home/User/holdentrepot.html"});
              }else{
			      $.alert(data.msg,"提示");	
				}			
    		})
    		.fail(function() {
    			console.log("error");
    		})	
}
//不同产品 开关盘的控制
function mytiem(index){
	//数据对象格式
	var item={
		2:["14:00-18:00","14:00-18:00","14:00-18:00","14:00-18:00","14:00-18:00","14:00-18:00","14:00-18:00"],
		3:["14:00-18:00","14:00-18:00","14:00-18:00","14:00-18:00","14:00-18:00","14:00-18:00","14:00-18:00"],
		4:["14:00-18:00","14:00-18:00","14:00-18:00","14:00-18:00","14:00-18:00","14:00-18:00","14:00-18:00"]
	};
}
$(function(){
	// 验证二级密码的正确性
    $("#mymodal>button").click(function(){
		$.showLoading();
        $.ajax({
            url: '/index.php/Home/User/login.html',
            type: 'POST',
            dataType: 'json',
            data: {uid:$("input[name='uid']").val(),pwd:$("input[name='pwd']").val()},
        })
        .done(function(data) {
				$.hideLoading();
            if(data.status==1){
                $("#mymodal").hide(0.5);
				$("#modal-box").hide(0.5);
            }else{
                $.alert(data.msg,"提示");
            }
        })
    })
	//控制图表的高度
	 $("#main").height($(window).height()-300);
    // 产品下拉菜单的控制和隐藏
    $("#head .bot>div").click(function(){
        if($(this).find("ul").height()==0){
            $(this).find("ul").animate({"height":$(this).find('ul>li').height() * $(this).find('ul>li').length+"px"}, 500);
        }else{
            $(this).find("ul").animate({"height":"0px"}, 500);
        }
    })
    //页面加载完成控制高度
    $("#mybox").height($(window).height()-50);
    // 看涨看跌 控制
	if(open==0){
    $("#mybtn .btn").click(function(){
		if($(this).hasClass("bz")){
			 $(".zhangdie").css({"background":"red"}).html("涨");
		}else{
			 $(".zhangdie").css({"background":"green"}).html("跌");
		}
		//判断余额
		if($("#buy_box .sydjq").hasClass("active")){
             $("#buy_box .bottom .fr").css({"background":"#e4393c","color":"#fff"}).html("立即建仓").unbind("click").bind("click",buy);
        }else{
        if(parseFloat($("#buyPrice").val())>parseFloat($("#mymoney").html())){
          $("#buy_box .bottom .fr").css({"background":"#ddd","color":"#444"}).html("余额不足请充值").unbind("click");
        }else{
          $("#buy_box .bottom .fr").css({"background":"#e4393c","color":"#fff"}).html("立即建仓").unbind("click").bind("click",buy);
        }
        }
		$("#mybtn .btn").attr("data-zz",0);
		$(this).attr("data-zz",1);
    	if($("#buy_box").height()>0){
         $("#buy_box").animate({"height":"0"}, 200);
    	}else{
    	$("#buy_box").animate({"height":"250px"}, 200);
         }
        $("#buy_box .price .fr").html("预计收益："+parseFloat($("#buyPrice").val())*parseFloat($("#item2").attr("data-hbl"))/100+"元");
    })
    $("#buy_box .close").click(function(){
    	 $("#buy_box").animate({"height":"0"}, 500);
    })
    // 价格加减的控制	
    $(".add").click(function(){
		if($("#buyPrice").val()<100){
			$("#buyPrice").val(parseInt($("#buyPrice").val())+20);
		}else{
          $("#buyPrice").val(parseInt($("#buyPrice").val())+100);
		}
		  $("#buy_box .bottom .fl").html("应付:"+$("#buyPrice").val());
		 if(parseFloat($("#buyPrice").val())>parseFloat($("#mymoney").html())){
          $("#buy_box .bottom .fr").css({"background":"#ddd","color":"#444"}).html("余额不足请充值").unbind("click");
		}else{
          $("#buy_box .bottom .fr").css({"background":"#e4393c","color":"#fff"}).html("立即建仓").unbind("click").bind("click",buy);
		}
		$("#buy_box .price .fr").html("预计收益："+parseFloat($("#buyPrice").val())*parseFloat($("#item2").attr("data-hbl"))/100+"元");
    })
    $(".min").click(function(){
		if($("#buyPrice").val()<100||$("#buyPrice").val()==100){
          $("#buyPrice").val((parseInt($("#buyPrice").val())-20)<20?20:parseInt($("#buyPrice").val())-20);
		}else{
          $("#buyPrice").val((parseInt($("#buyPrice").val())-100)<199?parseInt($("#buyPrice").val())-20:parseInt($("#buyPrice").val())-100)
		}
		  $("#buy_box .bottom .fl").html("应付:"+$("#buyPrice").val());
		if(parseFloat($("#buyPrice").val())>parseFloat($("#mymoney").html())){
          $("#buy_box .bottom .fr").css({"background":"#ddd","color":"#444"}).html("余额不足请充值").unbind("click");
		}else{
          $("#buy_box .bottom .fr").css({"background":"#e4393c","color":"#fff"}).html("立即建仓").unbind("click").bind("click",buy);
		}
		$("#buy_box .price .fr").html("预计收益："+parseFloat($("#buyPrice").val())*parseFloat($("#item2").attr("data-hbl"))/100+"元");
    })
	$("#buyPrice").keyup(function(){
         $("#buy_box .bottom .fl").html("应付:"+$("#buyPrice").val());
		if(parseFloat($("#buyPrice").val())>parseFloat($("#mymoney").html())){
          $("#buy_box .bottom .fr").css({"background":"#ddd","color":"#444"}).html("余额不足请充值").unbind("click");
		}else{
          $("#buy_box .bottom .fr").css({"background":"#e4393c","color":"#fff"}).html("立即建仓").unbind("click").bind("click",buy);
		}
		$("#buy_box .price .fr").html("预计收益："+parseFloat($("#buyPrice").val())*parseFloat($("#item2").attr("data-hbl"))/100+"元");
	})
    // 使用现金和代金券的控制
    $("#buy_box .payment").click(function(){
		if($(this).hasClass("syxj")){
         if(parseFloat($("#buyPrice").val())>parseFloat($("#mymoney").html())){
          $("#buy_box .bottom .fr").css({"background":"#ddd","color":"#444"}).html("余额不足请充值").unbind("click");
		}else{
          $("#buy_box .bottom .fr").css({"background":"#e4393c","color":"#fff"}).html("立即建仓").unbind("click").bind("click",buy);
		}
		}
        $("#buy_box .payment").removeClass('active');
        $(this).addClass('active');
        if($(this).hasClass('syxj')){
            $("#buy_box .content").show(500);
            $("#buy_box .content2").hide();
			$("#buy_box .bottom .fl").html("应付:"+$("#buyPrice").val());
        }else{
            $("#buy_box .content").hide();
            $("#buy_box .content2").show(500);
			$("#buy_box .bottom .fl").html("应付:0元");
			$("#buy_box .bottom .fr").css({"background":"#e4393c","color":"#fff"}).html("立即建仓").unbind("click").bind("click",buy);
        }
    })
	}
    // 代金券点击弹出
    $("#myquan").click(function(){
        if($("#myquanbox>li").length==0){
             $.alert("您没有代金券","好伤心");
        }else{
            if($("#myquanbox").height()>0){
               $("#myquanbox").animate({"height":"0"}, 500);
             }else{
               $("#myquanbox").animate({"height":"111px"}, 500); 
             }
        }
    })
     //控制代金券的
    $("#myquanbox>li").click(function(){
        $("#myquan>span").css({"background":"#e4393c","color":"#fff"}).html($(this).html()).attr("data-eid",$(this).attr("data-eid"));
    })
    //代金券的数量控制
    $("#quanSize").html($("#myquanbox>li").length);
	//价格失去焦点价格判断
	$("#buyPrice").blur(function(){
		if($(this).val()<20){
			$(this).val("20");
          $.alert("购买价格不能小于"+$(this).val()+"元","提示");
		}
	})
})