$(function () {
    //添加数量按钮功能
    $(".btnAdd").click(function () {
        add($(this));
    });
    //减少数量按钮功能
    $(".btnMinus").click(function () {
        minus($(this));
    });
    //单击全选按钮的功能
    $("#allCb").click(function () {
        var objCb = document.getElementById("allCb");
        var objItems = document.getElementsByName("item");
        for (var i = 0; i < objItems.length; i++) {
            objItems[i].checked = objCb.checked;
        }
        if (objCb.checked) {
            calTotal();
        } else {
            calTotal();
        }
    });

    //单击复选按钮选中商品
    $("input[name='item']").click(function () {
        choose(this);
    });
    //利用遮罩层，提示框进行删除操作
    $("td[title='price']").next().find("a").click(function () {
        delRow = $(this).parent("td").parent("tr");//全局变量(亮点可有领悟)
        showMask();
        $("#dialog").show();
    });
    $("#title p").click(function () {//关闭
        $("#mask,#dialog").hide();
    });
    $("#btnSure").click(function () {//确认删除
        delRow.remove();
        calTotal();
        $("#mask,#dialog").hide();
    });
    //添加购物车
    $("#lastview a").click(function () {
        addShopCar($(this));
        $(".btnAdd").click(function () {//数量增加
            add($(this));
        });
        $(".btnMinus").click(function () {//数量减少
            minus($(this));
        });
        $("input[name='item']").click(function () {//单击选择按钮
            choose(this);
        });
        $("td[title='price']").next().find("a").click(function () {//单击删除
            delRow = $(this).parent("td").parent("tr");//全局变量(亮点可有领悟)
            showMask();
            $("#dialog").show();
        });
        $("#title p").click(function () {//关闭
            $("#mask,#dialog").hide();
        });
        $("#btnSure").click(function () {//确认删除
            delRow.remove();
            calTotal();
            $("#mask,#dialog").hide();
        });
    });
});

//按添加数量按钮，计算一种商品的总价格的方法
function calPrice($BtnObj, number) {
    var $tdObj = $BtnObj.parent().next();//获取其所在单元格的下一个单价单元格
    var price = parseFloat($tdObj.text().substr(1));
    var total = price * number;
    var $tdObjTotal = $tdObj.next();
    $tdObjTotal.html("&yen;" + total.toFixed(2));//商品小计小数点保留二位后显示
}

//计算总数量和总价格的方法
function calTotal() {
    var num = 0;
    var sum = 0;
    var $checkedBox = $("input[name='item']:checked");
    var $allBox = $("input[name='item']");
    if ($checkedBox.length != $allBox.length) {
        $checkedBox.each(function () {
            var $num = $(this).parent().siblings(":eq(2)").children(":eq(1)").val();
            var $sum = $(this).parent().siblings(":eq(4)").text().substr(1);
            num = num + parseInt($num);
            sum = sum + parseFloat($sum);
        });
        $("span#spanTotal").prev().html(num);
        $("#spanTotal").html("&yen;" + sum);
    } else {//显示全选的总数量
        $(".txt").each(function () {
            num = num + parseInt($(this).val());
        });
        $("span#spanTotal").prev().html(num);
        //显示全选的总价格
        $("#tabOrder td[title='price']").each(function () {
            sum = sum + parseFloat($(this).text().substr(1));
        });
        $("#spanTotal").html("&yen;" + sum);
    }
}

//加入购物车的方法
function addShopCar($addObj) {
    var $dl = $addObj.parents("dl");
    var $tr = $("<tr></tr>");
    var $tds = new Array();
    $tds[0] = $("<td><input type='checkbox' name='item'/></td>");
    $tds[1] = $("<td class='item'><a href='detail.html'><img src='" + $dl.find('img').attr('src') + "' align='left'/>" +
        $dl.children("dd:first").text() + "</a></td>");
    $tds[2] = $(" <td>可购买</td>");
    $tds[3] = $("<td><input type='button' value='-' class='btn btnMinus'/> <input class='txt' type='text' value='1' disabled='disabled'/> <input type='button' value='+' class='btn btnAdd'/></td>")
    $tds[4] = $("<td>" + $dl.find('dd.price').children('span').text() + "</td>");
    $tds[5] = $(" <td title='price'>" + $dl.find('dd.price').children('span').text() + "</td>");
    $tds[6] = $("<td><a href='#'>删除</a></td>");
    $tr.append($tds[0]).append($tds[1]).append($tds[2]).append($tds[3]).append($tds[4]).append($tds[5]).append($tds[6]).insertBefore($("#tabOrder tr:last"));
}

//与数量增加按钮绑定的方法
function add($addBtn) {
    var number = parseInt($addBtn.prev().val()) + 1;
    $addBtn.prev().val(number);
    calPrice($addBtn, number);
    calTotal();
}

//与数量减少按钮绑定的方法
function minus($minusBtn) {
    var i = parseInt($minusBtn.next().val());
    if (i != 0) {
        var number = parseInt($minusBtn.next().val()) - 1;
        $minusBtn.next().val(number);
        calPrice($minusBtn, number);
        calTotal();
    } else {
        $minusBtn.next().val(0);
    }
}

//与单选按钮绑定的方法
function choose(chooseBtn) {
    if (chooseBtn.checked) {
        calTotal();
    } else {
        calTotal();
    }
    var objItems = document.getElementsByName("item");
    var objCb = document.getElementById("allCb");
    for (var i = 0; i < objItems.length; i++) {
        if (!objItems[i].checked) {
            objCb.checked = objItems[i].checked;
            return;
        }
    }
    objCb.checked = true;
}

//设置遮罩层的方法
function showMask() {
    var bh = $("body").height();
    var bw = $("body").width();
    $("div#mask").css({
        height: bh + "px",
        width: bw + "px",
        display: "block"
    })
}