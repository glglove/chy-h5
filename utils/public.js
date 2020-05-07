import store from '../store'
import route from '../router/index.js'
export const publicObj = {
    hasLogin: (option, toPath) => {
        if(store.getters.isLogin) {
            return {
                isLogin: true,
                token: store.getters.token,
                userInfo: store.getters.userInfo
            }
        }else {
            // 跳转到 登陆页面
            route.push({
                path: '/login'
            })            
            return {
                isLogin: false
            }
        }  
    },
    // 监测网络（移动端）
    _checkNetWork_mobile(){
        let netStatus = ''
        // 扩展API加载完毕后调用onPlusReady回调函数 
        function onNetChange(){
            var nt = plus.networkinfo.getCurrentType();
            console.log("+++++++网络状态++", nt)
            switch (nt){
                case plus.networkinfo.CONNECTION_ETHERNET:
                case plus.networkinfo.CONNECTION_WIFI:
                    alert("Switch to Wifi networks!"); 
                    netStatus = true
                    break; 
                case plus.networkinfo.CONNECTION_CELL2G:
                case plus.networkinfo.CONNECTION_CELL3G:
                case plus.networkinfo.CONNECTION_CELL4G:
                    alert("Switch to Cellular networks!");  
                    netStatus = true
                    break; 
                default:
                    alert("Not networks!"); 
                    netStatus = false
                    break;
            }
        }            
        function onPlusReady(){
          document.addEventListener("netchange", onNetChange, false);  
        }
        document.addEventListener("plusready", onPlusReady, false);
    },    
}