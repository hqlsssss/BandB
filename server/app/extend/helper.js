const dayjs = require('dayjs')
module.exports = {
  base64Encoder(str=""){
    return Buffer.from(str).toString("base64")
  },
  time(){
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  timestamp(){
    return new Date().getTime()
  },
  unPick(source,arr){
    if(Array.isArray(arr)){
      let obj = {}
      for(let i in source){
        if(!arr.includes(i)){
          obj[i] = source[i]
        }
      }
      return obj
    }
  }

}