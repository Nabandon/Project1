/**
 * 切换表单
 * @param to 切换的表单，设置为显示
 * @param from 源表单，设置为隐藏
 */
function toggle(to, from) {
    $(to).removeClass("d-none");
    $(from).addClass("d-none");
    return false;
}

/**
 * 重新设置确认密码的校验
 */
function resetConfirmPassword(){
    $("#register_form input[type=password]").keyup(function () {
        console.log($("#register_password").val());
        $("#register_confirm_password").attr("pattern", $("#register_password").val());
    });
}

let dev = true;
let devLoginData = {
    username: "abc",
    password: "123"
};

$(function () {
    //$("#btn_to_register").hide();//如果要开放注册功能，打开注册按钮
    resetConfirmPassword();
    $("#login_form").submit(function (e) {
        let form = this;
        if(dev === true || validateForm(form, e)){
            $.ajax({
                type: 'post',
                url: "user/login",
                contentType: "application/json",
                data: dev === true ? JSON.stringify(devLoginData) : $(form).serializeJsonString(),
                success: function () {
                    showSuccessModal("登录成功", function () {
                        window.location.href = "public/page/main.html";
                    });

                },
                error: function (error) {
                    $(form).removeClass("was-validated");
                    $("#login_error").html(error.message);
                    $("#login_error").show();
                }
            });
        }
        return false;
    });
    $("#register_form").submit(function (e) {
        let form = this;
        if(validateForm(form, e)){
            $.ajax({
                type: 'post',
                url: "user/register",
                contentType: "application/json",
                data: $(form).serializeJsonString(),
                success: function () {
                    $(form).removeClass("was-validated");
                    form.reset();
                    showSuccessModal("注册成功", function () {
                        toggle('#login_container', '#register_container');
                    });
                },
                error: function (error) {
                    $(form).removeClass("was-validated");
                    $("#login_error").html(error.message);
                    $("#login_error").show();
                }
            });
        }
        return false;
    });
});