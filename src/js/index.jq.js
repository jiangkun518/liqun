// 左侧导航栏滑出效果(jq)
$(function(){
    // 移入
    $(".nav_list li").mouseenter(function(){
        $(this).css({
            backgroundColor : "#fff", color : "#333",
        }).siblings(".nav_list li").css({
            backgroundColor : "#014099", color : "#fff",
        });
        $(this).children("b").hide();
        $(this).children("div").css({
            display:"block",
            zIndex:55
        })
    });

    // 移出
    $(".nav_list li").mouseleave(function(){
        $(this).css({
            backgroundColor : "#014099", color : "#fff",
        })
        $(this).children("b").show();
        $(this).children("div").css({
            display:"none",
            zIndex:55
        })
    });

    // 滚轮
    var topDistance=500;
    var showDistance=1;
    var goTopBtn=$('<div id="goTop"><a href="#">Top <span>∧</span></a></div>');
    var thisTop=$(window).scrollTop()+topDistance;
    $("body").append(goTopBtn);
    $("#goTop").css("top",thisTop);
    if ($(window).scrollTop() < showDistance) {
        $('#goTop').hide();
    }
    $(window).scroll(function () {
        thisTop = $(this).scrollTop() + topDistance;
        $('#goTop').css('top', thisTop);

   if ($(this).scrollTop() > showDistance) {
            $('#goTop').fadeIn();
        } else {
            $('#goTop').fadeOut();
        }
    });

    // 欢迎用户
        var jsonStr=sessionStorage.getItem("login");
        var userInfo=JSON.parse(jsonStr||'{}');
        $("#userinfo").text(userInfo.uName);


    // 页面加载读取数据
    $.ajax({
        url:"./../server/listinfo.php",
        dataType:"json"
    }).done(function(res){

        res.forEach((el,index)=>{
            const strHtml=`<li>
                <a href="content.html?id=${el.lId}"><img src="${el.lImg}" alt=""></a>
                <h4>${el.lName}</h4>
                <b>￥ ${el.lPrice}</b>
                <span data-info='${JSON.stringify(el)}' class="addCar">加入购物车</span>
            </li>`;
            $(".food_list ul").append(strHtml)
            })
    })



    $(".food_list").on("click",".addCar",function(){
        console.log($(this).data("info"));

        var jsonStr=sessionStorage.getItem("login");
        var userInfo=JSON.parse(jsonStr||'{}');
        const currentData=$(this).data("info");

        currentData.uId=userInfo.uId;
        currentData.num=1;

        if(window.sessionStorage.getItem("login")!=null){
            $.ajax({
                        url :"./../server/cart.php",
                        data:currentData,
                        type:"post"
                    }).then(function(res){
                        alert(res.msg);
                    })
                  }
        else {
            // 没登录保存到cookie
            const dataCookie=JSON.parse($.cookie("cartInfo")||'[]');
            var flag=false;
            dataCookie.forEach((el,index)=>{
                if(el.lId==currentData.lId){
                    el.num=parseInt(el.num)+1;
                    flag=true;
                }
            });
            if(!flag){
                currentData.num=1;
                dataCookie.push(currentData);
            }
            $.cookie("cartInfo",JSON.stringify(dataCookie),{expires:20});

        }
        return false

    })

});
