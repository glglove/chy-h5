export default  {
    // 判断字符串是否为空
    isEmpty(str) {
      return str == '' || str == null || str == 'null';
    },
    // 判断字符串是否不为空
    isNotEmpty(str) {
      return !this.isEmpty(str);
    },
    // 浮点求和
    sum(numbers, toFixed = 2) {
      let sum = 0;
      for (const str of numbers) {
        if (!this.isNumber(str)) {
          return NaN;
        }
        const num = parseFloat(str);
        if (isNaN(num)) {
          return NaN;
        }
        sum += num;
      }
      return sum.toFixed(toFixed);
    },
    // 数字判断
    isNumber(value) {
      const patrn = /^[-+]?\d+(\.\d+)?$/;
      return patrn.test(value);
    },
    // 数字判断
    isPositiveNumber(value) {
      const patrn = /^[1-9]\d*$|^\.\d*$|^0\.\d*$|^[1-9]\d*\.\d*$|^0$/;
      return patrn.test(value);
    },
    // 数组判断
    isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    },
    // 时间转日期
    convertTimestapeToDay(timestape) {
      return timestape.substring(0, timestape.indexOf(' ')).replace(/-/g, '.');
    },
  
    // 格式化日期
    dateFormate (date, fmt) {
      const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
      return fmt;
    },
    moment (date) {
      let time = new Date(date);
      let y = time.getFullYear();
      let m = time.getMonth()+1;
      let d = time.getDate();
      return y+'/'+m+'/'+d;
    }  
  }