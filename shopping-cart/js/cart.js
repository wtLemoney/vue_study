var res={
  "status":1,
  "result":{
    "totalMoney":0,
    "list":[
      {
        "productId":"600100002115",
        "productName":"YSL方管口红-哑光",
        "productPrice":321,
        "productQuantity":1,
        "productImage":"img/goods-1.jpg",
        "parts":[
          {
            "partsId":"10001",
            "partsName":"无",
            "imgSrc":""
          }
        ]
      },
      {
        "productId":"600100002120",
        "productName":"加多宝",
        "productPrice":5,
        "productQuantity":5,
        "productImage":"img/goods-2.jpg",
        "parts":[
          {
            "partsId":"20001",
            "partsName":"吸管",
            "imgSrc":"img/part-2.jpg"
          }
        ]
      },
      {
        "productId":"600100002117",
        "productName":"小猪佩奇玩偶",
        "productPrice":29.9,
        "productQuantity":2,
        "productImage":"img/goods-3.jpg",
        "parts":[
          {
            "partsId":"10001",
            "partsName":"小猪佩奇贴纸",
            "imgSrc":""
          },
          {
            "partsId":"10002",
            "partsName":"小猪乔治贴纸",
            "imgSrc":""
          }
        ]
      }
    ]
  },
  "message":""
}


var vm=new Vue({
	el:'#app',
	data:{
    // 购物车中的数据
		productList:[],
    totalActMoney:0,
    checkAllFlag:false,//全选与否的标志
    zoomFlag:false,
    theDelItem:{}
  },
  //组件已经加载完毕，请求网络数据和业务处理
	mounted:function(){
		this.$nextTick(function(){
			vm.init()
		})
		
	},
	methods:{
		init:function(){
      var self=this;
			this.productList=res.result.list;
      this.productList.forEach(function(item){
        self.$set(item,'checked',false);//初始时，设置每个商品默认值：都不选择
      })
			this.totalMoney=res.result.totalMoney
		},
		computedSingle:function(item){//单个商品总额
				return item.productPrice*item.productQuantity
		},
		changeMoney:function(item,type){//加减时，商品数量改变
			if(type===1){
				item.productQuantity++;
			}else if(type===-1&&item.productQuantity>1){
				item.productQuantity--;
			}
      // this.computedPrice()
		},
    selectProduct:function(item){//商品选择/取消选择
     
      if(item.checked===undefined){//没有这个属性,则添加
        this.$set(item,"checked",true);
      }else {
          item.checked=!item.checked;
      }
      this.computedPrice();

      for(var i=0;i<this.productList.length;i++){
        if(this.productList[i].checked==undefined||this.productList[i].checked==false){
          this.checkAllFlag=false;
          return;
        }
        if(i===(this.productList.length-1)){
          this.checkAllFlag=true;//说明:已全选
        }
      }      
    },
    checkAll:function(type){
      var self=this;
      var price=0;
      if(type===true){//点击->全选
        this.checkAllFlag=true;
        this.productList.forEach(function(item,index){
            price+=item.productPrice*item.productQuantity;    
            if(item.checked===undefined){
              self.$set(item,"checked",true);
            }
            if(item.checked===false){
              item.checked=true;
            }
          })
      }else if(type===false){//点击->取消全选
        this.checkAllFlag=false;
        price=0;
        this.productList.forEach(function(item,index){
                if(item.checked===undefined){
                  self.$set(item,"checked",false);
                }
                if(item.checked===true){
                  item.checked=false;
                }
              })
      }
      this.totalActMoney=price;
    },
    computedPrice:function(){//计算价格
        var price=0;
        for(var i=0;i<this.productList.length;i++){
          if(this.productList[i].checked===true){
            price+=this.productList[i].productPrice*this.productList[i].productQuantity;
          }
        }
        this.totalActMoney=price;
    },
    delConfirm:function(item){//保存当前要删除的对象
      this.zoomFlag=true;//删除面板出现
      this.theDelItem=item;
    },
    deleteItem:function(){//删除
      this.zoomFlag=false;
      var index=this.productList.indexOf(this.theDelItem)
      this.productList.splice(index,1)
    }
	},
 
  //过滤
	filters:{
		format:function(val,type){
			return val.toFixed(2)+type
		}
	}


})



