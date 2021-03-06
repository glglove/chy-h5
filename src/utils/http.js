/*******************以下为axios配置（不适合uniapp的多端请求）*************************************************************************** */
// import axios from 'axios'
// // 创建axios实例
// const http = axios.create({
// //   baseURL: process.env.BASE_API,
//   baseURL: 'http://localhost:5000',
//   timeout: 50000 ,// 请求超时时间
  
// })
 
// // request拦截器
// http.interceptors.request.use(
//   config => {
//     config.headers['Content-Type'] = 'application/x-www-form-urlencoded' // 关键所在
//     return config
//   },
//   error => {
//     console.log(error) // for debug
//     Promise.reject(error)
//   }
// )

// export {http}

/*******************以上为axios配置（不适合uniapp的多端请求）*************************************************************************** */


import qs from 'qs'
import store from '@/store/index.js'
let configs = require('@/api/configs')
// debugger
/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */

/*
// 开放的接口
import http from './interface' 

http.config.baseUrl = "http://localhost:8080/api/"

http.request(url:'user/list',method:'GET').then((res)=>{
	console.log(JSON.stringify(res))
})
http.get('user/list').then((res)=>{
	console.log(JSON.stringify(res))
})
http.get('user/list', {status: 1}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.post('user', {id:1, status: 1}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.put('user/1', {status: 2}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.delete('user/1').then((res)=>{
	console.log(JSON.stringify(res))
}) 
*/



// 设置一个 计数器, 当请求次数为0 时 才去 触发 allloading 的显示，当请求的数量 超过1时，也只触发 一次显示allloading，当请求都完成时，才触发结束 allloading 的显示
let allloadingNum = 0

export default {
	config: {
		baseUrl: configs.baseUrl,
		header: {
			// 'Content-Type':'application/json;charset=UTF-8',  // 默认请求的content-Type 为 application/json
			'Content-Type':'application/x-www-form-urlencoded',
		},  
		timeout: 30000,
		data: {},
		loading: false,
		loadingText: '加载中',
		method: "POST",  // 默认的 method
		dataType: "json",  /* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	// 拦截器对象
	interceptor: {
		// 默认统一的请求拦截函数
		request: (configs) => {
			// 将请求的参数中 默认增加 token
			debugger
			let data = configs.data || {}
			// 主要控制是否loading
			let loading = configs.loading 
			if( configs.url === `${configs.baseUrl}/API/Account` ){
				// 登陆接口
				// 本地的登录接口logon  此时只需要传 商户码、用户名、密码 
				configs.data = qs.stringify(data)
				// debugger
				// console.log(configs)				
			}else {
				// 非登录接口时 需要接口中 统一加上 token 属性（根据业务需求来定）
				// let token = store.getters.userToken 
				let token = '3DF72A5D-9522-41B9-8E16-FD7476A6A03F' 
				if(token){
					// token 存在 则 统一添加 token属性
					configs.data = qs.stringify(
						Object.assign(configs.data, {
							// 'token': store.getters.userToken  // 从store 中 获取userToken 
							'token': '3DF72A5D-9522-41B9-8E16-FD7476A6A03F',  // 从store 中 获取userToken 
							'CompanyCode': 80000000,
							'UserId': 5328
						})  						
					)
				}else {
					// 没有token 页面跳转到 到登陆页面
					//#ifdef H5 || APP-PLUS
					uni.showModal({
						title: '提示',
						content: '您暂未登陆,请先登陆',
						showCancel: true,
						cancelText: '取消',
						confirmText: '登陆',
						success: res => {
							uni.navigateTo({
								// url: '../amos-login/login',
								url: '/pages/amos-login/login',
								success: res => {
									console.log("跳转到了登陆页面")
								},
								fail: () => {},
								complete: () => {}
							});
						},
						fail: () => {},
						complete: () => {}
					});
					//#endif
				}
				// debugger
				// console.log(configs)
		  	}
			// 请求时传入的 loading 为真，则需要显示
			// debugger
			if(loading){
				let title = configs.loadingText
				console.log(title)
				// 加载loading
				try {
					uni.hideLoading()
				} catch (error) {
					
				}
				uni.showLoading({
					title: title,
					mask: true,
					duration: 9000,
					success: () => {},
					fail: () => {},
					complete: () => {

					}
				})			
				// window.alert(23444)
				// 显示全屏的allLoading
				// ++allloadingNum
				// if( allloadingNum <=1 ){
				// 	store.dispatch("setContainerAllloadingFlag", true)
				// 	console.log("https-----------【++allloadingNum】后的数量-触发了setContainerAllloadingFlag--", allloadingNum)
				// }
			}		
		},
		// 默认统一的响应拦截函数
		response: (configs) => {
			// debugger
			// 隐藏加载loading
			// configs.config.loading && uni.hideLoading()
			if( allloadingNum>1){
				--allloadingNum
				console.log("https-----------【--allloadingNum】后的数量-没有触发setContainerAllloadingFlag------", allloadingNum)
			}else if( allloadingNum == 1){
				configs.config.loading && store.dispatch("setContainerAllloadingFlag", false)
				--allloadingNum
				console.log("https-----------【--allloadingNum】后的数量- 触发了setContainerAllloadingFlag------", allloadingNum)
			}
			return configs
		}
	},
	request(options) {
		// debugger
		if (!options) {
			options = {}
		}
		options.header = options.header || this.config.header
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.timeout = options.timeout || this.config.timeout
		options.url = options.baseUrl + options.url  // 将baseUrl 和 url 凭借成完整的请求地址
		options.data = options.data || {}
		options.loading = options.loading || this.config.loading
		options.loadingText = options.loadingText || this.config.loadingTextloadingText
		options.method = options.method || this.config.method
		
		//TODO 加密数据
		
		//TODO 数据签名
		/* 
		_token = {'token': getStorage(STOREKEY_LOGIN).token || 'undefined'},
		_sign = {'sign': sign(JSON.stringify(options.data))}
		options.header = Object.assign({}, options.header, _token,_sign) 
		*/
	   
		return new Promise((resolve, reject) => {
			// debugger
			let _config = null
			// debugger
			// 将传入的配置参数与默认的参数进行合并 后赋值给 _config
			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			//注意：options.complete 这个回调函数会在 uni.request() 调用结束后自动执行 complete方法 
			// uni.requst({
			// 	url:baseURL + options.url,
			// 	method:options.method || 'GET',
			// 	data:options.data,
			// 	header:headers,
			// 	complete(response){
			// 		res(response)
			// 	},
			// 	success(response) {
			// 		res(response)
			// 	},
			// 	fail(response) {
			// 		rej(response)
			// 	}
			// })
			//且uni.request()执行后的返回的数据response会自动传给 options.complate方法
			_config.complete = (response) => {
				// uni.require() 请求无论是失败还是成功后都会自动走这个 complete 的回调函数方法
				console.log("请求时间" + new Date().getTime() + ":这是uni.require() 请求完成complete的回调")
				// debugger
				// uni.require() 后返回的 状态码  statusCode 
				let statusCode = response.statusCode
				
				response.config = _config
				
				
				// 如果有响应的回调 再执行响应的回调， 相当于请求结束后的 相应拦截
				if (this.interceptor.response) {
					// debugger
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				// 统一的响应日志记录
				_reslog(response)
				
				console.log("打印请求完成后的相应状态statusCode", statusCode)
				
				// debugger
				if (process.env.NODE_ENV === 'development') {
					// debugger
					// 开发环境
					if (statusCode === 200) {
						console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
						resolve(response)
					}else {
						// 失败
						// uni.showToast({
						// 	title: '网络请求失败，请检查网络(未启动本地服务器)',
						// 	image: require('@/static/imgs/icon/error.png'),
						// 	mask: true,
						// 	duration: 5000
						// });
						reject(response)
					}
				}else if(process.env.NODE_ENV === 'production'){
					// 生产环境
					
					if (statusCode === 200) {
						console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
						resolve(response)
					}else {
						// 失败
						// uni.showToast({
						// 	title: '网络请求失败，请检查服务器或者网络',
						// 	image: '@/static/imgs/icon/error.png',
						// 	mask: true,
						// 	duration: 5000
						// });
						reject(response)
					}					
				}						
			}
			
			_config.fail = (error) => {
				// uni.require() 请求失败后会自动走这个 fail 的回调函数方法
				console.log("请求时间" + new Date().getTime() + ":这是uni.require() 请求完成fail的回调")
			}
			
			_config.success = (response) => {
				// uni.request() 请求成功后会自动走这个 success 的回调函数方法
				console.log("请求时间" + new Date().getTime() + ":这是uni.require() 请求完成success的回调")
			}			
			
			// 如果有请求的回调函数,先执行请求回调，相当于 请求拦截
			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			
			// 调取统一的请求日志的方法
			_reqlog(_config)
			
			if (process.env.NODE_ENV === 'development') {
				// 开发环境下 
				console.log("【" + _config.requestId + "】 地址：" + _config.url)
				if (_config.data) {
					console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
				}
			}else {
				// 非开发环境
				console.log("【" + _config.requestId + "】 地址：" + _config.url)
				if (_config.data) {
					// console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
				}				
			}

			// 调用 uni.request 发起请求，
			// debugger
			console.log("--------------------------------",_config)
			let a  = uni.request(_config)
			// debugger
						
		});
	},
	// get 请求
	get(url, data, options) {
		// debugger
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'  
		return this.request(options)
	},
	// post 请求
	post(url, data, options) {
		// debugger
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	// put请求
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	// delete 请求
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}


/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		console.log("【" + req.requestId + "】 地址：" + req.url)
		if (req.data) {
			// debugger
			console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
			// debugger
		}
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
		if (res.config.data) {
			console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
		}
		console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	}
	//TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	switch(_statusCode){
		case 200:
			break;
		case 401:
			break;
		case 404:
			break;
		default:
			break;
	}
}


