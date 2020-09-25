export default class Kmoment {
  constructor(arg) {
    let _d = arg || new Date().getTime() // 避免传入空字符串
    this.date = new Date(_d)
  }
  format(fmt){
    if(!fmt || !this.date) return ''
    let date = this.date
    let o = {  
      'M+' : date.getMonth()+1, // 月份  
      'd+' : date.getDate(), // 日  
      'h+' : date.getHours()%12 === 0 ? 12 : date.getHours()%12, // 小时  
      'H+' : date.getHours(), // 小时  
      'm+' : date.getMinutes(), // 分  
      's+' : date.getSeconds(), // 秒  
      'q+' : Math.floor((date.getMonth()+3)/3), // 季度  
      'S' : date.getMilliseconds() // 毫秒  
    }
    let week = {  
      '0' : '/u65e5',  
      '1' : '/u4e00',
      '2' : '/u4e8c',  
      '3' : '/u4e09',  
      '4' : '/u56db',  
      '5' : '/u4e94',  
      '6' : '/u516d'
    }
    let format = ''
    if(/(y+)/.test(fmt)){  
      let _f = fmt.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length))
      format = _f
    }  
    if(/(E+)/.test(format)){  
      let _f = format.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? '/u661f/u671f' : '/u5468') : '')+week[String(date.getDay())])
      format = _f
    }  
    for(let k in o){  
      if(new RegExp('('+ k +')').test(format)){  
        let _f = format.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (('00'+ o[k]).substr((String(o[k])).length))) 
        format = _f
      }  
    }  
    return format
  }
}