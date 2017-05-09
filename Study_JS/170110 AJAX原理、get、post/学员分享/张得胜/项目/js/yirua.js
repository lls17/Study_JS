//-------------------获取标签---------------------
var toggle = document.getElementsByClassName("toggle");
var neir = document.getElementById("neir");
var tun = document.getElementById("tun");
var social = document.getElementById("social");
var Z_a = social.getElementsByTagName("a");
var Zhuanyi = document.getElementById("Zhuanyi");
var Zpaobu = document.getElementById("Zpaobu");
var Zpao = document.getElementById("Zpao")

//   ---------------  针对 toggle 元素的开关  ----------------------------
var Zonoff = true;

//-------------------任务边的 a 标签的定位坐标------------------------------
var Z_LfTo = [
	[-123,33],
	[-101,80],
	[-56,118],
	[-1,132],
	[56,118],
	[96,80],
	[120,28],
	[]
]
toggle[0].onclick = function(){   //  点击后的效果
	if(Zonoff){
		toggle[0].style.background = "#000";
		toggle[0].style.color = "#fff";
		toggle[0].style.transform = "rotate(380deg)";
		neir.style.transform =  "rotateY(0deg)";
		tun.style = "width:180px;height:180px;margin:0;";
		social.style["z-index"] = "5";
		
 		for(var i = 0;i<Z_a.length;i++){
			Z_a[i].Zdianl = true;    
			Z_a[i].style = "top:"+Z_LfTo[i][0]+"px; left:"+Z_LfTo[i][1]+"px";
			Z_a[i].onclick = function(ev){
				var ev=ev||window.event;
		        ev.preventDefault();
			}
			Z_a[i].onmousemove = function(){
				if(this.Zdianl==true){
					Zdiv = document.createElement("div");
					this.appendChild(Zdiv);
					this.Zdianl = false;
					return false;
				}
			}
			Z_a[i].onmouseout = function(){
				var ZdDiv = this.getElementsByTagName("div")[0];
				this.removeChild(ZdDiv);
				this.Zdianl = true;
				return false;
			}
		}
	}else{
		toggle[0].style.background = "#fff";
		toggle[0].style.color = "#000";
		toggle[0].style.transform = "rotate(0deg)";
		neir.style.transform =  "rotateY(180deg)";
		tun.style = "width:108px;height:108px;margin:35px;";
		social.style["z-index"] = "1";
		for(var i = 0;i<Z_a.length;i++){
			Z_a[i].style = "top:"+0+"px; left:"+0+"px";
		}
		this.Zdianl = true;
	}
	Zonoff = !Zonoff;
}
var Znum = 0;
var ZzYou = 16;
var ZpaobuD = -150;
var Zsjeus = 532;


//---------------------------------  定时器加在  动态图边  -------------------------------------
setInterval(function(){
	if(ZpaobuD==532){
		ZpaobuD = -150
	}
	if(Zsjeus==-150){
		Zsjeus = 532
	}
	ZpaobuD++;
	Zsjeus--;
	if(Zonoff){
		Znum++
		Zhuanyi.style.top = Znum+"px"
		if(Znum==235){
			Znum = 0;
		}
		Zpaobu.style.left = Zsjeus+"px";
		Zpao.style.left = ZpaobuD+"px";
		Zpaobu.style.transform =  "rotateY(180deg)";
		Zpao.style.transform =  "rotateY(0deg)";
	}else{
		ZzYou++
		Zhuanyi.style.top = 240+"px"
		Zhuanyi.style.left = ZzYou+"px"
		if(ZzYou==225){
			ZzYou = 16;
		}
		Zpaobu.style.left = ZpaobuD+"px";
		Zpao.style.left = Zsjeus+"px";
		Zpaobu.style.transform =  "rotateY(0deg)";
		Zpao.style.transform =  "rotateY(180deg)";
	}
},33)
