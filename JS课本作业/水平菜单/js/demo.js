// JavaScript Document
$(function(){
	$("#menu>ul>li").hover(function(){ //鼠标移入到顶级菜单项,对应的二级菜单滑入 
        $(this).children('ul').stop().slideDown('fast'); 
      },function(){ // 鼠标移出顶级菜单项，对应的二级菜单滑出 
        $(this).children('ul').stop().slideUp('fast'); 
   }); 
   $('#menu>ul>li>ul li').hover(function(){ // 鼠标移入到第二级菜单，对应的三级菜单滑入
        var subMenuWidth=$(this).parent().width();  //二级菜单的宽度，即是三级菜单水平偏移的距离
        $(this).children('ul').css({"width":"100px","top":"0px","left":subMenuWidth})
		                      .stop()
	                          .slideDown('fast'); //设置三级菜单的css属性和滑入效果
     },function(){ //鼠标移出二级菜单项，对应的三级级菜单滑出  
        $(this).children('ul').stop().slideUp('fast'); 
  }); 
});
