$(function(){
    //自己定义的校验
    $.validator.addMethod("checkedPwd",function(val,input,param){
        let reg=/^[a-z]+\w+$/i;
        return reg.test(val);
    },"密码必须字母开头");
    $.validator.addMethod("checkedTel",function(val,input,param){
        let reg=/^1[34578]\d{9}$/;
        return reg.test(val);
    },"手机号码格式不正确");

    $("form").validate({
        //rules
       rules:{
           uName:{
               required:true,
               rangelength:[6,15],
           },
           uPwd:{
               required:true,
               rangelength:[6,15],
               checkedPwd:true
           },
           uPwd2:{
               equalTo:"#uPwd"
           },
           uTel:{
               checkedTel:true,
           },
       },
        messages:{
           uName : {
               required : "用户名不能为空",
               rangelength : "用户名长度必须是{0}-{1}"
           },
            uPwd : {
                required : "密码不能为空",
                rangelength : "密码长度必须是{0}-{1}",
            },
            uPwd2:{
                equalTo:"两次密码不一致"
            },
        },
        submitHandler:function(){

           $.ajax({
               url:"./../server/register.php",
               data:$("form").serialize(),
               type:"post",
               dataType:"json"
           }).then(function(res){
              alert(res.msg);
              if(res.status==1){
                  if(confirm("是否要立即登录")){
                      location.href="login.html"
                  }
              }
           });

            return false
        }
    })
});


