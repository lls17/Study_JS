var tools = {
	$:function(selector,content){
		var firstChar = selector.charAt(0);
		content = content || document;
		if( firstChar === '#' ){
			return document.getElementById(selector.slice(1));
		}else if(  firstChar === '.'  ){							// 通过 class  来获取 元素
			var allElement = document.getElementsByTagName('*');   	//首先获取所有元素
			var arr =[];											// 定义一个数组 用来储存获取到的 元素
			for( var i = 0; i < allElement.length ; i++ ){          
				 var classname = allElement[i].className;           //循环所有的元素 并获取其的className
				 var classArr = classname.split(' ');				// 把该元素的 className 解析为数组 用空格分开
				 for( var j = 0; j < classArr.length ; j++ ){       // 循环该元素的className 每一项 如果有一项与传入的 selector.slice(1) 相同 
				 	if( classArr[j] == selector.slice(1) ){			// 则表示该元素 有其 class 并把它放入 数组( arr ) 中 
				 		arr.push( allElement[i] );          
				 		break;                                      // 同事停止该循环
				 	}
				 }
			};
			return arr;                                             //最后输出 该数组中的所有 元素;
		}else{
			return content.getElementsByTagName(selector);
		}
	},
	getStyle:function (obj,attr){
		if( obj.currentStyle ){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj)[attr];s
		}	
	},
	hasClass:function (element,classNames) {
		var classAll = 	element.className.split(" ");  //"blue red"
		for( var i = 0; i < classAll.length; i++ ){
			if( classAll[i] === classNames ){
				return true;
			}
		}
		return false;
	},
	removeClass:function (element,classNames){
		if( tools.hasClass(element,classNames) ){  //如果有这个class，就删除
			var classAll = element.className.split(" "); // ["blue","red"]
			for( var i = 0; i < classAll.length; i++ ){
				if( classAll[i] === classNames ){
					classAll.splice(i,1);
					i--;
				}
			}
			//如果这个数组为kong，那么就删除标签上的class这个属性
			if( classAll.length === 0 ){
				element.removeAttribute("class");
			}else{
				element.className = classAll.join(" ");
			}
			

		}
	},
	addClass:function (element,classNames){
		var classAll = element.className;  // ""    "blue"
		if( !tools.hasClass(element,classNames) ){
			classAll += " " + classNames;
		}
		element.className = classAll.trim();

	},
	toggleClass:function (element,classNames){
		if( tools.hasClass(element,classNames) ){
			tools.removeClass(element,classNames);
			return false;
		}else{
			tools.addClass(element,classNames);
			return true;
		}	
	}
}