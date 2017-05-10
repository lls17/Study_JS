function ajax(options){
				var defaults = {
					url:"",        //请求地址
					method:"get",  //请求方式
					data:'',       //请求的数据
					isAsyn:true,   //是否为异步
					success:function(){}, //成功执行的回掉函数
					error:function(){}    //失败执行的回掉函数
				};

				$.extend(defaults,options);
				//如果地址没有填写，抛出错误
				if( defaults.url.trim() === "" ){
					throw new Error("请求地址不能为空");
				}

				var xhr = new XMLHttpRequest();

				if( defaults.method === "get" ){
					defaults.url += "?"+defaults.data;
				}

				xhr.open(defaults.method,defaults.url,defaults.isAsyn);


				xhr.onload = function (){
					if( xhr.status === 200 ){  //成功
						defaults.success(xhr.responseText)
					}else{//失败
						defaults.error(xhr.status,xhr.statusText);
					}
				};


				if( defaults.method === "get" ){
					xhr.send();
				}else if(defaults.method === "post"){
					xhr.setRequestHeader("Content-Type",'application/x-www-form-urlencoded');
					xhr.send(defaults.data);
				}


			}