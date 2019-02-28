/**
 * Created by 程家杰 on 2017/8/8.
 */
$(function (){
    //全选和反全选:计算所有表格中的商品数量和总价
    $("#allCb").change(function (){
        $("input[name='item']").prop("checked",this.checked);
        if ($(this).prop("checked")){
            var proNum = 0;
            var priceNum = 0;
            $(".txt").each(function (){
                proNum += parseInt($(this).val());
            });
            $(".cal span:eq(0)").text(proNum);
            $("td[title='price']").each(function (){
                priceNum += parseFloat($(this).text().substr(1));
            });
            $("#spanTotal").text("¥" + priceNum);
        } else {
            $(".cal span:eq(0)").text(0);
            $("#spanTotal").text(0);
        }

    });
    //专用于计算两个从页面获取到的金钱数的td,相加
    function add(td1,td2){
        return "¥" + (parseFloat(td1.text().substr(1)) + parseFloat(td2.text().substr(1))).toFixed(1);
    }
    //相减,第一个数大
    function sub(td1,td2){
        return "¥" + (parseFloat(td1.text().substr(1)) - parseFloat(td2.text().substr(1))).toFixed(1);
    }
    //添加商品:判断商品是否存在购物车内，存在就直接加1
    $(".add a:contains('加入购物车')").click(function (){
        var itemContent = $(this).parents("dl").find("dd:eq(0)").text();
        var flag = 0;
        $("tr .item a").each(function (){
           if ($(this).text() == itemContent){
               var v = parseInt($(this).parents("tr").find("td:eq(3) .txt").val()) + 1;
               $(this).parents("tr").find("td:eq(3) .txt").val(v);
               $(this).parents("tr").find("td[title='price']").text(add($(this).parents("tr").find("td[title='price']"),$(this).parents("tr").find("td:eq(4)")));
               if($(this).parents("tr").find("input").prop("checked")) {
                   $(".cal span:eq(0)").text(parseInt($(".cal span:eq(0)").text()) + 1);
                   $("#spanTotal").text(add($("#spanTotal"),$(this).parents("tr").find("td:eq(4)")));
               }
                flag++;
               return;
           }
        });
        if (flag == 0){
            var $tr = $("<tr></tr>");
            var $td1 = $("<td><input type='checkbox' name='item' checked /></td>");
            var $td2 = $("<td class='item'><a href='detail.html'><img width='75' height='46' src='" + $(this).parents("dl").find("img").attr("src") + "' align='left'/>" + $(this).parents("dl").find("dd:eq(0)").text() + "</a></td>");
            var $td3 = $("<td>可购买</td>");
            var $td4 = $("<td><input type='button' value='-' class='btn btnMinus' /> <input class='txt' type='text'  value='1' disabled='disabled'/> <input  type='button' value='+' class='btn btnAdd' /></td>");
            var $td5 = $("<td>" + $(this).parents("dl").find("dd[class='price'] span").text() + "</td>");
            var $td6 = $("<td title='price'>" + $(this).parents("dl").find("dd[class='price'] span").text() + "</td>");
            var $td7 = $("<td><a href='#'>删除</a></td>");
            $tr.append($td1);
            $tr.append($td2);
            $tr.append($td3);
            $tr.append($td4);
            $tr.append($td5);
            $tr.append($td6);
            $tr.append($td7);
            var trLen = $("#tabOrder tr").length-2;
            var exp = "#tabOrder tr:eq(" + trLen +")";
            $(exp).after($tr);
            $(".cal span:eq(0)").text(parseInt($(".cal span:eq(0)").text()) + 1);
            $("#spanTotal").text(   add($("#spanTotal"),$(this).parents("dl").find("dd[class='price'] span")));
        }
    });
    //商品数量增减
    $("body").on("click",".btnAdd",function (){
        $(this).prev().val(parseInt($(this).prev().val())+1);
        $(this).parents("tr").find("td[title='price']").text(add($(this).parents("tr").find("td[title='price']"),$(this).parents("tr").find("td:eq(4)")));
        if($(this).parents("tr").find("input").prop("checked")) {
            $(".cal span:eq(0)").text(parseInt($(".cal span:eq(0)").text()) + 1);
            $("#spanTotal").text(add($("#spanTotal"),$(this).parents("tr").find("td:eq(4)")));
        }
    });
    $("body").on("click",".btnMinus",function (){
        if ($(this).next().val() != "1"){
            $(this).next().val(parseInt($(this).next().val())-1);
            $(this).parents("tr").find("td[title='price']").text(sub($(this).parents("tr").find("td[title='price']"),$(this).parents("tr").find("td:eq(4)")));
            if($(this).parents("tr").find("input").prop("checked")) {
                $(".cal span:eq(0)").text(parseInt($(".cal span:eq(0)").text()) - 1);
                $("#spanTotal").text(sub($("#spanTotal"),$(this).parents("tr").find("td:eq(4)")));
            }
        }
    });
    //点击单选框选中商品时修改商品数和总价格
    $("body").on("click","input[name='item']",function (){
        if ($(this).prop("checked")){
            $(".cal span:eq(0)").text(parseInt($(".cal span:eq(0)").text()) + parseInt($(this).parents("tr").find(".txt").val()));
            $("#spanTotal").text(add($("#spanTotal"),$(this).parents("tr").find("td[title='price']")));
        } else {
            $(".cal span:eq(0)").text(parseInt($(".cal span:eq(0)").text()) - parseInt($(this).parents("tr").find(".txt").val()));
            $("#spanTotal").text(sub($("#spanTotal"),$(this).parents("tr").find("td[title='price']")));
        }
    });
    //删除商品
    $("body").on("click","td a:contains('删除')",function (){
        $(this).parents("tr").remove();
        $(".cal span:eq(0)").text(parseInt($(".cal span:eq(0)").text()) - parseInt($(this).parents("tr").find(".txt").val()));
        $("#spanTotal").text(sub($("#spanTotal"),$(this).parents("tr").find("td[title='price']")));
    });
});