import Vue from 'vue'
import App from './App'
import uView from "uview-ui" // 引入 uview-ui
Vue.use(uView)
import store from './store' // vuex状态管理
// import './icons' // 引入 svg 字体图标 注意：uni-app中不支持 svg图标

import MescrollBody from "@/components/mescroll-uni/components/mescroll-uni/mescroll-body.vue" // 引入mescroll-body 组件 
import MescrollUni from "@/components/mescroll-uni/components/mescroll-uni/mescroll-uni.vue"  // 引入mescorll-uni 组件
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

import EmptyPage from '@/components/empty-page/emptyPage' 
Vue.component('empty-page', EmptyPage)

import popupCmp from '@/components/popup/popup' 
Vue.component('popup-cmp', popupCmp)


import configs from '@/api/configs.js'



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
Vue.prototype.checkLogin = function(toPageUrl, jumpType){
	// toPageUrl 为 需要跳转的地址   jumpType 为跳转的方式： 1:switch   2:redirect  3:relanch 4:navigate
	let token = uni.getStorageSync("userToken")
	if(token){
		// 已登陆
	}else {
		// 未登陆 直接调到 登录页面
		uni.redirectTo({
			url:'/pages/login/login?toPageUrl=' + toPageUrl + '?jumpType=' + jumpType
		})
			
		return false
	}
	// 最终可以返回 token等
	return {
		token
	}
}

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
