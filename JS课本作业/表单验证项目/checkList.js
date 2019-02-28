function getId(id) {
    return document.getElementById(id);
}
function checkUserName() {
    var userName = getId("txtUserName").value;
    var userNameSpan = getId("spanUserName");
    var userNameReg = /^[a-z0-9][a-z0-9\._]{2,16}[a-z0-9]$/i;
    if (!userNameReg.test(userName)){
        userNameSpan.innerHTML = " 错误<li>由字母a~z(不区分大小写)、数字0~9、点、减号或下划线组成</li>\n" +
            "<li>只能以数字或字母开头和结尾，长度为4~18</li>";
        return false;
    }
    userNameSpan.innerHTML = "格式正确";
    return true;

}
function checkPwd() {
    var pwd = getId("txtPwd").value;
    var pwdSpan = getId("spanPwd");
    var pwdReg = /^\w{6,16}$/;
    if (!pwdReg.test(pwd)) {
        pwdSpan.innerHTML = "错误，密码长度6-16位，字母区分大小写";
        return false;
    }
    pwdSpan.innerHTML = "格式正确";
    return true;
}
function checkConfirmPwd() {
    var confirmPwd = getId("txtConfirmPwd").value;
    var confirmSpan = getId("spanConfirmPwd");
    var pwd = getId("txtPwd").value;
    if (confirmPwd != pwd){
        confirmSpan.innerHTML = "密码不一致";
        return false;
    }
    confirmSpan.innerHTML = "正确";
    return true;
}
function checkAnswer() {
    var ans = getId("txtAnswer").value;
    var ansSpan = getId("spanAnswer");
    var ansReg = /^([\u4e00-\u9fa5]|\w)+$/;
    if (!ansReg.test(ans)){
        ansSpan.innerHTML = "错误，请输入数字，字母，下划线或汉字";
        return false;
    }
    var chReg = /[\u4e00-\u9fa5]/g;
    var len = ans.replace(chReg,"ab").length;
    if (len < 6 || len >30){
        ansSpan.innerHTML = "错误，长度为6-30位";
    }
    ansSpan.innerHTML = "格式正确";
    return true;
}
 function checkYear() {
    var year = getId("txtYear").value;
    var yearSpan = getId("spanBornDate");
    var yearReg = /^\d{4}$/;
    if (year == ""){
        yearSpan.innerHTML = "请输入年份";
        return false;
    }
    if (!yearReg.test(year)){
        yearSpan.innerHTML = "错误，年份的长度为4位数字";
        return false;
    }
     yearSpan.innerHTML = "年份格式正确，请选择月份";
    return true;
}
function checkSex() {
    var sexs = document.getElementsByName("sex");
    var sexSpan = getId("spanSex");
    for (var i = 0;i<sexs.length;i++){
        if (sexs[i].checked){
            return true;
        }
    }
    sexSpan.innerHTML = "请选择选择性别";
    return false;
 }
function checkName() {
    var name = getId("txtName").value;
    var nameSpan = getId("spanName");
    if (name==""){
        nameSpan.innerHTML = "请输入真实姓名";
        return false;
    }
    return true;
}
function checkNick() {
    var nick = getId("txtNick").value;
    var nickSpan = getId("spanNick");
    var nickReg = /^([\u4e00-\u9fa5]|\w)+$/;
    if (nick == ""){
        nickSpan.innerHTML = "请输入昵称";
        return false;
    }
    if (!nickReg.test(nick)) {
        nickSpan.innerHTML = "错误，请输入数字，字母，下划线或者汉字，不要输入特殊字符";
        return false;
    }
    var chReg = /[\u4e00-\u9fa5]/g;
    var len = nick.replace(chReg,"ab").length;
    if (len >20){
        nickSpan.innerHTML = "错误，长度不能超过20个字符";
        return false;
    }
    nickSpan.innerHTML = "格式正确";
    return true;
}
function checkPhone() {
    var phone = getId("txtPhone").value;
    var phoneSpan = getId("spanPhone");
    var phoneReg = /^(13|15|18)\d{9}$/;
    if (phone == ""){
        phoneSpan.innerHTML = "请输入手机号";
        return false;
    }
    if (!phoneReg.test(phone)){
        phoneSpan.innerHTML = "错误，手机号由11位数组成，且以13,15,18开头";
        return false;
    }
    phoneSpan.innerHTML = "格式正确";
    return true;
}
function checkEmail() {
    var email = getId("txtEmail").value;
    var emailSpan = getId("spanEmail");
    var emailReg = /^\w+@\w+.[a-zA-Z]{2,3}(.[a-zA-Z]{2,3})?$/;
    // var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (email == ""){
        emailSpan.innerHTML = "请输入邮箱";
        return false;
    }
    if (!emailReg.test(email)){
        emailSpan.innerHTML = "邮箱格式不正确，如*****@**(***).**(***)";
        return false;
    }
    emailSpan.innerHTML = "格式正确";
    return true;
}
function checkForm() {
    return checkUserName() && checkPwd() && checkConfirmPwd() && checkAnswer() && checkYear() && checkSex() && checkName() && checkNick() && checkPhone() && checkEmail();
}