import Vue from 'vue'
import App from './App'
import uView from "uview-ui" // 引入 uview-ui
Vue.use(uView)
import store from './store' // vuex状态管理
// import './icons' // 引入 svg 字体图标 注意：uni-app中不支持 svg图标

//#ifdef H5
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
NProgress.configure({showSpinner: false })
Vue.prototype.$NProgress = NProgress
//#endif

import MescrollBody from "@/components/mescroll-uni/components/mescroll-uni/mescroll-body.vue" // 引入mescroll-body 组件 
import MescrollUni from "@/components/mescroll-uni/components/mescroll-uni/mescroll-uni.vue"  // 引入mescorll-uni 组件
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

import EmptyPage from '@/components/empty-page/emptyPage' 
Vue.component('empty-page', EmptyPage)

import popupCmp from '@/components/popup/popup' 
Vue.component('popup-cmp', popupCmp)


import configs from '@/api/configs.js'

// import BMap from 'vue-baidu-map'
// Vue.use(BMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'aIpivEs7hmHI2eMpyGDi7FIgeRmMibl8'
// })



// // 引入 socket.js 文件
// import SocketObj from './utils/socket.js'
// // 建立socket 连接
// //#ifndef MP-WEIXIN
// SocketObj.connect(Vue)
// //#endif
// 
// //#ifdef MP-WEIXIN
// SocketObj.connectMiniPro(Vue)
// //#endif



// 将container 组件注册为全局组件
import container from './components/container/container'
Vue.component('container', container)

// 引入 uni.request()
import http from '@/utils/http.js'

import findPageUrl from '@/utils/findPageUrl'

Vue.config.productionTip = false;

// 挂载在 Vue实例的原型上
Vue.prototype.$configs = configs
Vue.prototype.$http = http
Vue.prototype.$store = store
Vue.prototype.$bus = new Vue()
Vue.prototype.$findPageUrl = findPageUrl
// 原型上面 添加一个 监测登陆的方法
Vue.prototype.$checkLogin = function(toPageUrl, jumpType){
	// debugger
	// toPageUrl 为 需要跳转的地址   jumpType 为跳转的方式： 1:switch   2:redirect  3:relanch 4:navigate
	let token = uni.getStorageSync("userToken")
	return new Promise((resolve, reject) => {
		if(token){
			// 已登陆
			// 可以返回 token等
			resolve(
				{
					isLogin: true,
					token
				}						
			) 
		}else {
			// 未登录
			const whiteList = ['/pages/login/login']// 白名单
			// 在免登录白名单，直接进入
			if (whiteList.indexOf(toPageUrl) > 0) { 
				resolve(
					{
						isLogin: false,
						token,
						isWhiteList: true
					}					
				) 
			}else {
				// uni.redirectTo({
				// 	url:'/pages/amos-login/login?toPageUrl=' + toPageUrl + '?jumpType=' + jumpType
				// })	
				// 未登录且不是免登录白名单页面		
				resolve(
					{
						isLogin: false,
						token,
						isWhiteList: false
					}					
				) 
			}		
		}
	})
}

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
