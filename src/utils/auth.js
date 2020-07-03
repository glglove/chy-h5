// import Cookies from 'js-cookie'
import store from '../store'

// 因开发环境和生产环境所用 需要用
let TokenKey = ''
if( process.env) {
  if( process.env.NODE_ENV ==='development') {
    // 开发环境
    TokenKey = 'Admin-Token'
  }else if( process.env.NODE_ENV === 'production') {
    // 生产环境 
    TokenKey = 'AT_User' 
  }
}else {
  console.log("---------process.env未配置-auth.js中process.env获取失败---------")
}

// export function getToken () {
//   if( process.env ){
//     if( process.env.NODE_ENV ==='development'){
//       // 开发环境
//       return Cookies.get(TokenKey)
//     }else if( process.env.NODE_ENV === 'production'){
//       // 生产环境 
//       let t = Cookies.get(TokenKey)
//       if ( typeof t === 'object') {
//         t = t['AT_User']
//       }
//       let arr = t.split('&')
//       let hasToken = arr.find((item) => {
//         return item.toString().indexOf('TokenId') !== -1
//       })
//       let token = hasToken.toString().split('=')[1]
//       return token      
//     }
//   }else {
//     console.log("---------process.env未配置-auth.js中getToken获取失败---------")
//   }
// }

// export function setToken (token) {
//   debugger
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken () {
//   return Cookies.remove(TokenKey)
// }

// export function getCreatorName () {
//   return store.getters.name
// }

// export function getCreator () {
//   return store.getters.userCode
// }

// 设置localstorage
export function setStorage ( key , val , type = 2) {
  debugger
  switch (type){
    // type 1 表示 异步设置
    case 1:
      uni.setStorage({
        key: key,
        data: val ,
        success: function(res){
          // success
          console.log(`---localStorage已成功存入 ${key}---值为：`,val)          
        },
        fail: function() {
          // fail
          console.log("localStorage存入数据失败！")          
        },
        complete: function() {
          // complete
        }
      }) 
    break
    case 2:
      // type 2 表示 同步设置
      if( key ) {
        try {
          // 同步设置 storage
          uni.setStorageSync( key,val ) 
        } catch (error) {
          
        }
      }       
    break
  }  
}
// 提取localstorage (同步)
export function getStorageSync( key ) {
  return new Promise((resolve,reject)=>{
    try{
      // 同步取 storage
      let res = uni.getStorageSync(key);
      resolve( res )
    }catch(e){
      //TODO handle the exception
    }
  })
}
// 删除localstorage
export function	removeStorage( key, type = 1 ) {
  switch (type){
    // type 1 表示 异步删除
    case 1:
      uni.removeStorage({
        key: key,
        success: function(res){
          // success
          console.log(`localStorage删除${key}成功`)          
        },
        fail: function() {
          // fail
          console.log(`localStorage删除[${key}]失败`)          
        },
        complete: function() {
          // complete
        }
      })    				
    break;
    // type 2 表示 同步删除
    case 2:
      try {
        uni.removeStorageSync(key)
      } catch (error) {
        
      }
      break;
    default:
    break;
  }
}