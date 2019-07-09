$(function(){
    $.ajax({
        url:"./../server/listinfo.php",
        dataType:"json"
    }).done(function(res){
        console.log(res);

        var Id=location.search.split("?")[1].split("=")[1];
        // console.log(Id);


    $(".main_right").on("click","button,.jia",function(){

        var jsonStr=sessionStorage.getItem("login");
        var userInfo=JSON.parse(jsonStr||'{}');
        var idIndex=$(res).eq(Id-1)[0];
        idIndex.uId=userInfo.uId;
        idIndex.num=1;


        if(window.sessionStorage.getItem("login")!=null){
            // 登录保存到数据库
            $.ajax({
                url :"./../server/cart.php",
                data:idIndex,
                type:"post"
            }).then(function(res){
                alert(res.msg);
            })

        }else {
            // 没登录保存到cookie
            const dataCookie=JSON.parse($.cookie("cartInfo")||'[]');
            var flag=false;
            dataCookie.forEach((el,index)=>{
                if(el.lId==idIndex.lId){
                    el.num=parseInt(el.num)+1;
                    flag=true;
                }
            });
            if(!flag){
                idIndex.num=1;
                dataCookie.push(idIndex);
            }
            console.log(dataCookie);
            $.cookie("cartInfo",JSON.stringify(dataCookie),{expires:10})
        }
        return false
    });

        $(".main_right").on("click",".jian",function(){

            var jsonStr=sessionStorage.getItem("login");
            var userInfo=JSON.parse(jsonStr||'{}');
            var idIndex=$(res).eq(Id-1)[0];
            console.log((idIndex).lId);
            idIndex.num=1;

            if(window.sessionStorage.getItem("login")!=null){
                // 登录保存到数据库
                $.ajax({
                    url :"./../server/cart.php",
                    data:idIndex,
                    type:"post"
                }).then(function(res){
                })

            }else {
                // 没登录保存到cookie
                const dataCookie=JSON.parse($.cookie("cartInfo")||'[]');
                var flag=false;
                dataCookie.forEach((el,index)=>{
                    if(el.lId==idIndex.lId){
                        el.num=parseInt(el.num)-1;
                        flag=true;
                    }
                });
                if(!flag){
                    idIndex.num=1;
                    dataCookie.push(idIndex);
                }
                console.log(dataCookie);
                $.cookie("cartInfo",JSON.stringify(dataCookie),{expires:10})
            }


            return false

        });



    })

});