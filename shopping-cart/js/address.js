var result={
  "status":0,
  "message":"",
  "result":[
    {
      "addressId":"100001",
      "userName":"JackBean",
      "streetName":"北京市朝阳区朝阳公园1",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":true
    },
    {
      "addressId":"100002",
      "userName":"Lucky",
      "streetName":"北京市朝阳区朝阳公园2",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":false
    },
    {
      "addressId":"100003",
      "userName":"Tim",
      "streetName":"北京市朝阳区朝阳公园3",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":false
    },
    {
      "addressId":"100004",
      "userName":"Aero",
      "streetName":"北京市朝阳区朝阳公园4",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":false
    },
    {
      "addressId":"100005",
      "userName":"Sub",
      "streetName":"北京市朝阳区朝阳公园5",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":false
    }
  ]
}

new Vue({
	el:'.container',
	data:{
		addressList:[],
		limitNum:3,
		curItem:0,
		shippingMethod:0,
		deleteFlag:false,
		editFlag:false,
		addFlag:false,
		name:'',
		address:'',
		telephone:''
	},
	mounted:function(){
		var self=this;
		this.$nextTick(function(){
			self.getAddressList()
		})
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum)
		}
	},
	methods:{
		getAddressList:function(){
			if(result.status===0){
				this.addressList=result.result
			}
		},
		loadNumChange:function(){//点击->more
			if(this.limitNum===3){
				this.limitNum=this.addressList.length;
			}else{
				this.limitNum=3;
			} 
		},
		selectItem:function(index){
			this.curItem=index;
		},
		setDefault:function(){
			var self=this;
			this.addressList.forEach(function(val,index){
				
				self.addressList[index].isDefault=false;
				if(index===self.curItem){
					self.addressList[index].isDefault=true;
				}
			})
		},
		deleteItem:function(){
			this.deleteFlag=false;
			this.addressList.splice(this.curItem,1)
		},
		editItem:function(type){
			//type=0为取消 为1为修改或添加
			if(this.addFlag===true){
				if(type===0) this.addFlag=false;
				if(type===1){
					var itemObj={
				      "addressId":"100007",
				      "userName":this.name,
				      "streetName":this.address,
				      "postCode":"100001",
				      "tel":this.telephone,
				      "isDefault":false
				    }
				    this.addressList.push(itemObj)
					this.addFlag=false;
				}
			}

			if(this.editFlag===true){
				if(type===0) this.editFlag=false;
				if(type===1){
					if(this.name!==''){
						this.addressList[this.curItem].userName=this.name
					}
					if(this.address!==''){
						this.addressList[this.curItem].streetName=this.address
					}	
					if(this.telephone!==''){
						this.addressList[this.curItem].tel=this.telephone
					}
					this.name=''
					this.address=''
					this.telephone=''
					this.editFlag=false;		
				}
				
			}
			

		}	
	}
})