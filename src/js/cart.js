$(function(){

    if(window.sessionStorage.getItem("login")==null){
        //没登录取cookie
        const cookList=JSON.parse($.cookie("cartInfo")||"[]");
        cookList.forEach((el,index)=>{
            const tmpStr=`<ul class="ul" data-info='${JSON.stringify(el)}'>
       <img src="${el.lImg}">
        <li class="name">
            ${el.lName}
        </li>   
        <li class="price">
            ${el.lPrice}
        </li>
        <li class="num">
            <button class="jian">-</button>
            <input type="txt" class="input" value="${el.num}"/>
            <button class="jia">+</button> 
        </li>
        <li class="allmo">
            ${el.lPrice*el.num}
        </li>
        <li class="delete">
            <a class="deleteID" href="JavaScript:void(0)">删除</a>
        </li>
    </ul>`
            $("body").append(tmpStr);
        })

    }else {
        // 登录取数据库
        $.ajax({
            url:"./../server/getList.php",
        }).then(function (res) {
            res.forEach((el,index)=>{
                const tmpStr=`<ul class="ul" data-info='${JSON.stringify(el)}'>
       <img src="${el.lImg}">
        <li class="name">
            ${el.lName}
        </li>   
        <li class="price">
            ${el.lPrice}
        </li>
        <li class="num">
            <button class="jian">-</button>
            <input type="txt" class="input" value="${el.num}"/>
            <button class="jia">+</button> 
        </li>
        <li class="allmo">
            ${el.lPrice*el.num}
        </li>
        <li class="delete">
            <a class="deleteID" href="JavaScript:void(0)" >删除</a>
        </li>
    </ul>`
                $("body").append(tmpStr);
            })
        })
    }


    $(document).on("click",".jia",function(){
        var num=$(this).prev("input").val()-0+1;
           $(this).prev("input").val(num);
           let LID=$(this).parents(".ul").data("info").lId;
        //没有登录保存cookie
            if(window.sessionStorage.getItem("login")==null){
                const cookList=JSON.parse($.cookie("cartInfo")||"[]");
                console.log(cookList);
                cookList.forEach((el,index)=>{
                    if(el.lId==LID){
                        cookList[index].num=num;
                    }
                })
                $.cookie("cartInfo",JSON.stringify(cookList),{expires:1000});
           }else {
                //如果登录 保存数据
                $.ajax({
                    url:"./../server/changnum.php",
                    type:"post",
                    data:{
                        "lId":LID,
                        "num":num,

                    },
                }).then(function(res){
                    console.log(res);

                })
                console.log(num);
            }

        });

        $(document).on("click",".jian",function(){
            var num=$(this).next("input").val()-0-1;
            if(num<=1){
                num=1
            }
            $(this).next("input").val(num);
            let LID=$(this).parents(".ul").data("info").lId;
            if(window.sessionStorage.getItem("login")==null){
                const cookList=JSON.parse($.cookie("cartInfo")||"[]");
                cookList.forEach((el,index)=>{
                    if(el.lId==LID){
                        cookList[index].num=num;
                    }
                })
                $.cookie("cartInfo",JSON.stringify(cookList),{expires:1000});
            }else {
                //如果登录 保存数据
                $.ajax({
                    url:"./../server/changnum.php",
                    type:"post",
                    data:{
                        "lId":LID,
                        "num":num
                    },
                }).then(function(res){
                    console.log(res);
                })
            }
        });

        $(document).on("blur","input[type=txt]",function(){
        if(!(/^\d+$/.test(this.value))){
            this.value=1
        }


    });

        $(document).on("click",".deleteID",function () {
            let LID=$(this).parents(".ul").data("info").lId;
            if(window.sessionStorage.getItem("login")==null){
                const cookList=JSON.parse($.cookie("cartInfo")||"[]");
                cookList.forEach((el,index)=>{
                    if(el.lId==LID){
                        cookList.splice(index,1);
                        $(this).parents(".ul").remove();
                    }
                });
                $.cookie("cartInfo",JSON.stringify(cookList),{expires:1000});
            }else {
                //如果登录 删除数据
                $.ajax({
                    url:"./../server/remove.php",
                    data:{
                        "lId":LID
                    },
                    type:"post",
                    dataType:"json"
                }).then( (res) =>{
                    console.log(res);
                    if (res.status==1){
                        $(this).parents(".ul").remove();
                    }
                })
            }

        })

});