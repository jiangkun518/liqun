$(function(){

    $("form").on('submit',function(){
        const data=$("form").serialize();
        $.ajax({
            url:"./../server/login.php",
            type:"post",
            data:data,
        }).then(function(res){
            console.log(res);
            if(res.status==1){
                sessionStorage.setItem("login",JSON.stringify(res.data));
                var ajaxList=[];
                const cookieData=JSON.parse($.cookie("cartInfo")||'[]');
                console.log(cookieData);
                cookieData.forEach((el,index)=>{
                    el.uId=res.data.uId;
                    console.log(res.data.uId);
                    ajaxList.push(
                        $.ajax({
                            url :"./../server/cart.php",
                            data:el,
                            type:"post"
                        })
                    );
                });

                Promise.all(ajaxList).then(function(){
                    $.cookie("cartInfo","",{expires:-1000});
                    alert("登录成功");
                        location="index.html";

                })
            }
        });
        return false;
    })






});