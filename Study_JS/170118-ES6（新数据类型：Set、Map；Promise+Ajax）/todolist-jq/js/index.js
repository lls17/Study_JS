$(function(){
//===================事件绑定=============
	//新增todo内容
	$(".new-todo").on("keydown", function(ev){
		if(ev.which == 13){ //回车的时候新建
			var cont = $(".new-todo").val().trim();
			if(cont == ""){
				alert("请输入内容！");
			}else{
				var dtime = new Date().getTime();
				var $li = $("<li></li>");
				$li.html(`<div class="view">
                            <input class="toggle" type="checkbox" id="toggle_${dtime}"/> 
                            <label for="toggle_${dtime}">${cont}</label>
                            <button class="destroy"></button>
                        </div><input class="edit" value="${cont}">`);
				
				addEvLi($li);
				$(".todo-list").append($li);
                $(".new-todo").val("");
			}
		}
	});
	
	//全选/全不选
	$(".toggle-all").on("click", function(ev){
		console.log("全选框"+this.checked);
		$(".toggle").attr("checked", this.checked);
		ev.cancelBubble = true;
	});
//===================公用方法=============
	//给li绑定处理函数 —— 事件代理
	function addEvLi($item){
		$item.on("click", ".view", function(ev){
			if(ev.target.nodeName == "BUTTON"){
				console.log("准备删除~");
			}
			console.log(ev.target);
			checkSelAll();
			ev.cancelBubble = true;
		});
	}
	
	//检查是否全选
	function checkSelAll(){
		//可检查checked长度与li长度是否相等
		//或用arr.every
		var bl = [...$(".toggle")].every(function(item){
			return item.checked;
		});
		console.log("toAll是否全选:" + bl);
		$(".toggle-all").attr("checked", bl);
	}
	
});
