var locStorage = {  //用localStorage模拟数据库
	set(key, val){
		localStorage.setItem(key, val);
	},
	get(key){
		return localStorage.getItem(key);
	}
}
let data = locStorage.get("list") || [];
//[
//	{
//		id:1,
//		title:"海尔兄弟~",
//		isSel:false   //数据是否被选中
//	},
//	{
//		id:2,
//		title:"舒克贝塔~",
//		isSel:true
//	}
//];

var v = new Vue({
	el:".todoapp",  //目标钩子
	data:{ //数据集
		list:data,
		addVal:""  //记录要新增的值
	},
	methods:{ //方法集
		addTodo(){  //新增
			this.list.push({
				id:Math.random(),
				title:this.addVal,
				isSel:false
			});
			this.addVal="";
		},
		delTodo(todo){
			this.list = this.list.filter(item => item.id!=todo.id);
		},
		editTodo(){
			console.log("IN");
		}
	},
	computed:{ //计算属性（可设置get与set）
		//以'c_'开头，清晰表示为“计算属性”
		c_isSelAll(){ //默认为get
			return this.list.every(item => item.isSel);
		},
		c_unSelNum(){
			return this.list.filter(item => !item.isSel).length;
		}
	},
	watch:{//监控指定数据变化
		list:{ //更新local Storage
			handler(){
				locStorage.set("list", this.list);
			},
			deep:true  //深度监控（往子级下监控）
		}
		
	}
});
