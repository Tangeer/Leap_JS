// JavaScript Document


function initate(){
	var $menu=$("div#menu>ul").find("li:has(ul:not(:empty))");//获取有下级菜单的li  find() 方法获得当前元素集合中每个元素的后代，通过选择器、jQuery 对象或元素来筛选
	 $menu.each(function() {
      //添加可以展开的”+"符号
	var $spanMenuIcon=$("<span class='symbols'></span>"); 
	 $spanMenuIcon.addClass("bgplus").removeClass("bgminus");
	   $spanMenuIcon.prependTo($(this));
	 var  $subMenuUl=$(this).find("ul").eq(0); //获取下级菜单,不管下下级 find:查找下辈元素
	   //绑定”+"符号的单击方法实现下级菜单的滑入和滑出
	   $spanMenuIcon.click(function(){
		  if($(this).hasClass("bgplus")){
			  $subMenuUl.slideDown("slow");//如果单击的是“+”则展开
			  $(this).addClass("bgminus").removeClass("bgplus");
		  }else{
			  $subMenuUl.slideUp("slow");//如果单击的是“+”则展开
			  $(this).addClass("bgplus").removeClass("bgminus");
		  }
	   });
    });
	// alert($menu.length);
var	$noMenu=$("div#menu>ul").find("li:not(li:has(ul))");
	//alert($noMenu.length);
	$noMenu.each(function() {
		$spanMenuIcon=$("<span class='symbols'></span>"); 
		$spanMenuIcon.css({"background-image":"url(images/page.png)"});
	   $spanMenuIcon.prependTo($(this));
    });
	
}















window.onload=initate;