const vFilter = {
//	spreadCount(bid,ask,SymbolCode){
//		let dif = parseInt(bid*10000-ask*10000);
//		dif<0?dif*=-1:dif*=1;
//		let difStr = dif.toString();
//		let result = 0;
//		if(difStr.length<=2){
//			result = (dif*0.1).toFixed(1)
//		}else{
//			result = (difStr.substring(0,2)*0.1).toFixed(1)
//		}
//		
//		if(SymbolCode && SymbolCode.indexOf('XAUUSD')>=0){
//			result*=10
//		}
//		return result
//	},
	spreadCount(bid,ask,SymbolCode){
		var arr =[];
		let len = 0;
		if(typeof(bid)=='string'){
			arr = bid.split('.');
		}else{
			arr = (bid+'').split('.');
		}
		if(arr.length>1){
			len = arr[1].length;
		}
		let dif = Math.abs(bid-ask).toFixed(len*1);
		let result = parseInt(dif * Math.pow(10,len*1));
		return result
	},
	numCount(data,num){//data：返回数据 num：需要长度
		var arr =[];
		let len = 0;
		if(typeof(num)=='string'){
			arr = num.split('.');
		}else{
			arr = (num+'').split('.');
		}
		if(arr.length>1){
			len = arr[1].length;
		}
		return (data*1).toFixed(len*1)
	},
	trim(s){//去掉左右空格
	    return s.replace(/(^\s*)|(\s*$)/g, "");
	}
}
export default vFilter