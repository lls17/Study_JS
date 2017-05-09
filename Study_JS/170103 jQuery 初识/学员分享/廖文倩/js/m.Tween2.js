var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
//用getcomputedStyle获取到的是个矩阵，并且矩阵是不可逆的，通过矩阵的数值不能逆向推导
function css(element, attr , val){
	//如果transform中的样式就跳转到cssTransform函数中去 
	if(attr === "scale"||attr === "scaleX"
	||attr === "scaleY"||attr === "scaleZ"
	||attr === "rotateX"||attr === "rotateY"
	||attr === "rotateZ"||attr === "rotate"
	||attr === "skewX"||attr === "skewY"
	||attr === "translateX"||attr === "translateY"
	||attr === "translateZ") {
		return cssTransform(element, attr, val);
	}
	if(arguments.length === 2){
		var val = getComputedStyle(element)[attr];
		if(attr==='opacity'){
			val = Math.round(val*100);
		}
		return parseFloat(val);
	} 
	if(attr === "opacity") {
		element.style.opacity= val/100;
	} else {
		element.style[attr]= val + "px";	
	}
}
//两个参数获取样式，三个参数设置样式
//弊端：如果通过CSS样式设置的则获取不到
function cssTransform(element, attr, val){
	//初始时没有这个属性，建立这个属性
	if(!element.transform){//元素的自定义属性transform，而不是元素的样式transform
		element.transform = {};
	}	
	if(typeof val === "undefined"){ 
		//判断transform属性是否为空，为空的时候，代表没有通过此方法设置transform就返回默认值
		//这时候就处理scale，scale的默认值是1，其他的是0
		if(typeof element.transform[attr] === "undefined"){
			switch(attr){//缩放的时候为了避免误差，所以乘以100，避免小数计算误差
				case "scale":
				case "scaleX":
				case "scaleY":
				case "scaleZ":
					element.transform[attr] = 100;
					break;
				default://当attr为斜切位移等时
					element.transform[attr] = 0;	
			}
		} 
		return element.transform[attr];
	} else {//设置同步属性
		element.transform[attr] = val;
		var transformVal  = "";
		for(var s in element.transform){
			switch(s){//根据是缩放还是斜切还是位移分别处理单位
				case "scale":
				case "scaleX":
				case "scaleY":
				case "scaleZ":
					transformVal += " " + s + "("+(element.transform[s]/100)+")";
					break;
				case "rotate":
				case "rotateX":
				case "rotateY":
				case "rotateZ":
				case "skewX":
				case "skewY":
				//多条样式设置的时候避免覆盖
					transformVal += " " + s + "("+element.transform[s]+"deg)";
					break;
				default:
					transformVal += " " + s + "("+element.transform[s]+"px)";				
			}
		}
		element.style.WebkitTransform = element.style.transform = transformVal;
	}
}
//动画函数
function MTween(init){
	var t = 0;
	var b = {};
	var c = {};
	var d = init.time / 20;
	for(var s in init.target){ 
		b[s] = css(init.el, s); 
		c[s] = init.target[s] - b[s];
	}
	clearInterval(init.el.timer); 
	init.el.timer = setInterval(
		function(){
			t++;
			if(t>d){
				clearInterval(init.el.timer);
				init.callBack&&init.callBack.call(init.el);
			} else {
				init.callIn&&init.callIn.call(init.el);
				for(var s in b){
					var val = Number((Tween[init.type](t,b[s],c[s],d)).toFixed(2));
					css(init.el, s, val);
				}
			}
		},
		20
	);
}