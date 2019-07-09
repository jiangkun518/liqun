window.onload=function(){
    // 轮播图
    var Banner=document.querySelector('.banner');
    var oLeft=document.querySelector('.btn_left');
    var oRight=document.querySelector('.btn_right');
    oLeft.onclick=function(){
        next_img();
    }
    oRight.onclick=function(){
        previous_img();
    }
    function next_img(){
        index++;
        if(index>3){
            index=0;
        }
        showBtn();
        var newLeft;
        if(Banner.style.left==="-2960px"){
            newLeft=-740;
        }else {
            newLeft=parseInt(Banner.style.left)-740;
        }
        Banner.style.left=newLeft+"px";
    }
    function previous_img(){
        index--;
        if(index<0){
            index=3;
        }
        showBtn();
        var newLeft;
        if(Banner.style.left==="0px"){
            newLeft=-2220;
        }else{
            newLeft=parseInt(Banner.style.left)+740;
        }
        Banner.style.left=newLeft+"px";
    }
    var timer = null;
    function autoPlay(){
        timer=setInterval(function(){
            next_img();
        },2000);
    }
    autoPlay();
    var oBanWrap=document.querySelector('.banner_wrap');
    oBanWrap.onmouseenter=function(){
        clearInterval(timer);
    }
    oBanWrap.onmouseleave=function(){
        autoPlay();
    }
    var index=0;
    var oSpan=document.querySelectorAll('.btn span')

    function showBtn(){
        for(var i=0,len=oSpan.length; i<len; i++){
            oSpan[i].className="";
        }
        oSpan[index].className="current";
    }

    for(var i = 0, len = oSpan.length; i < len; i++){
        (function(i){
            oSpan[i].onclick = function(){
                var X = index - i;
                if(index == 3 && parseInt(Banner.style.left) !== -2960){
                    X = X - 4;
                }
                if(index == 0 && parseInt(Banner.style.left) !== -740){
                    X = 4 + X;
                }
                Banner.style.left = (parseInt(Banner.style.left) + X * 740) + "px";
                index = i;
                showBtn();
            }
        })(i);
    }


    // 倒计时
    showTime();
    function showTime() {
        var currenttime = new Date();
        var endtime = new Date("2019/7/25");
        var middleTime =parseInt((endtime.getTime()  - currenttime.getTime())/1000);
        var d  =parseInt(middleTime/(24*60*60));
        var h = parseInt(middleTime/(60*60)%24);
        var m = parseInt(middleTime/60%60);
        var s = parseInt(middleTime%60);
        document.getElementById('time_day').innerText = d;
        document.getElementById('time_hour').innerText = h;
        document.getElementById('time_minute').innerText = m;
        document.getElementById('time_second').innerText = s;
        setTimeout(showTime,500);
    }



}