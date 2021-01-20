export function modify(list){
  var arr = new Array()
  if(typeof(list) === 'string'){
      return list
  }
  if(list == undefined || list == null){
      return null
  }
  for( const key in  list){
      var temp = Object.keys(list[key])
      var npm = list[key]
      // debugger
    if(temp[0] !== "0"){
      temp = temp[0]
      npm = list[key][temp]
    }else{
        temp = npm
    }
      arr[temp] = modify(npm)
      // console.log("key="+key,))    
  }
  return arr
}