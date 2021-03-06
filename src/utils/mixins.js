
import base from '@/api/base.js'
import commApi from '@/api/comm.js'
// import { debug } from 'utils';
import { getDeviceApi } from '@/utils/deviceApi.js'
import getEnterType from '@/utils/miniProSceneType.js'
	// 引入mescroll-mixins.js
import MescrollMixin from "@/components/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
import {mapGetters} from 'vuex' 
import { REQ_OK } from '@/api/config'
import * as filters from '@/utils/filter' // 引入过滤器


// 页面共有mixin
export const miniProApi = {
	mixins: [MescrollMixin],  // 引入mescrollMixin
	components:{
		
	},
	data () {
		return {
			REQ_OK: REQ_OK,
			pHeight: 0, // container 组件的 高，从系统中获取
			showEmptyPage: false, // 是否显示empty页面		
			emptyType: 'data', //car 、page、search、address、wifi、order、coupon、favor、permission、history、news、message、list、data
			emptyText: '暂无数据', // empty页面显示的文字
			showEmptyPageBtn: true, // empty页面是否显示操作按钮
			showBtnType: 1, // 1 是返回按钮 2 是重新刷新按钮
			showBtnStyle: {'backgroundColor': 'rgba(41,121,255,1)','color':'rgb(255,255,255)' }, // empty页面操作按钮的样式（背景和样式）
			containerAllloading: false,  // 全屏的loading
			containerLoading: false,  // 加载的loading
			loadingMoreShow: false, // 控制 loadingMore 组件的显示/隐藏
			// total: 0, // 总页数
			// pageSize: 80, // 每页数目
			// pageNum: 1,  // 页码
			clientid: '', // 设备的 cid 用户 app-plus 登录成功后客户端获取到的cid 发送给 后台和用户账号进行绑定用户 给指定用户下发推送			
			mescroll: null, //mescroll实例对象 (此行可删,mixins已默认)		
		}
	},
	filters: {
        ...filters
    },
	computed: {
		...mapGetters(['userToken'])
	},
	watch:{
	  
	},
	async onLoad(options,data) {
		// debugger
		// console.log(this)
		
		//获取 系统的高后，由页面传给 container 组件
		this.pHeight = uni.getSystemInfoSync().windowHeight
		// this.pHeight = uni.getSystemInfoSync().screenHeight
		// 系统的高 存入 store中
		this.$store.dispatch('saveWindowHeight', this.pHeight)
		// debugger
		try {
			if(uni.canIUse('getSystemInfoSync.return.windowHeight')){
				const res = uni.getSystemInfoSync()
				console.log('mixins---------------系统信息',res)
				console.log('mixins---------------页面高度',res.screenHeight)
				console.log('mixins---------------机型',res.model)
				console.log('mixins---------------像素密度比',res.pixelRatio)
				console.log('mixins---------------设备宽',res.windowWidth)
				console.log('mixins---------------设备窗口高（除去tabbar高度后的）',res.windowHeight)
				console.log('mixins---------------设备语言',res.language)
				console.log('mixins---------------设备版本',res.version)
				console.log('mixins---------------设备型号',res.platform)
			}				
		} catch (error) {
			
		}
		// 将页面中 写入  methods 中写入 一个 onComLoad 的方法， 如果有此方法则在 页面 onload 生命周期时，先执行 onComLoad 的方法 
		if (typeof this.onComLoad!='undefined') await this.onComLoad(options,data);

		// this.pHeight= this.getDeviceApi().getSystemInfoSync().windowHeight;
		// console.log("---获取到的系统屏幕高度---------",this.pHeight)		
		console.log('mixin onLoad')
	},	
	onShow() {	
		console.log('mixin onShow')
	},
	// 页面初次渲染完成
	onReady(){
		console.log('mixin onReady')
	},
	onHide(){
		console.log('mixin onHide')
	},
	onUnload (){
		console.log('mixin onUnload')
	},
	onPullDownRefresh(){
		// 下拉刷新
		this.refreshPage()
		console.log('mixin onPullDownRefresh')
	},
	onReachBottom (){
		// 上拉加载
		uni.onNetworkStatusChange(function(res){
			// debugger
			console.log("网络类型:" + res.networkType + ",网络连接:" + res.isConnected);
			if(!res.isConnected){
				// 无网络
				uni.showToast({
					title:"网络未连接"
				});
				return;	
			}else {
				// 有网络
				// console.log("minxin 有网络")
				// if(this.pageSize*this.pageNum < this.total){
				// 	this.pageNum +=1
				// 	this.refreshPage()
				// }else {
				// 	this.toast("没有更多了~~~~")
				// }					
			}		
		})
			
		console.log('mixin onReachBottom')
	},
	onShareAppMessage(){
		console.log('mixin onShareAppMessage')
	},
	onPageScroll(){
		console.log('mixin onPageScroll')
	},
	onTabItemTap(){
		console.log('mixin onTabItemTap')	
	},
	methods: {
		// 页面中的刷新或者初始化方法，里面 调取页面中 统一自定义命名的 方法名称 叫做 refreshPage
		mixin_refreshPage() {
			// 调用页面中的统一的刷新方法  refreshPage()
			this.refreshPage()
		},
		mixin_down_refreshPage(page, mescroll){
			// 调用页面中的统一的下拉刷新方法  downRefreshPage()
			this.downRefreshPage(page, mescroll)
		},
		mixin_up_refreshPage(page, mescroll){
			// 调用页面中的统一的上拉刷新方法  upRefreshPage()
			this.upRefreshPage(page, this.mescroll)	
		},
		/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
		mescrollInit(mescroll) {
			// debugger
			this.mescroll = mescroll;
		},				
		/*mescroll下拉刷新的回调, 有三种处理方式:*/
		downCallback(page){
			// debugger
			// 第1种: 请求具体接口
			// uni.request({
			// 	url: 'xxxx',
			// 	success: () => {
			// 		// 请求成功,隐藏加载状态
			// 		this.mescroll.endSuccess()
			// 	},
			// 	fail: () => {
			// 		// 请求失败,隐藏加载状态
			// 		// this.mescroll.endErr()
			// 	}
			// })
			// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
			// this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
			// this.mescroll.endSuccess()
			// 若整个downCallback方法仅调用this.mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认,大部分都是这个情况~)

			this.mixin_down_refreshPage(page, this.mescroll)
		},		
		/*mesroll上拉加载的回调*/
		upCallback(page) {
			// debugger
			// console.log(this.upOption.page)
			// let pageNum = page.num; // 页码, 默认从1开始
			// let pageSize = page.size; // 页长, 默认每页10条
			// uni.request({
			// 	url: 'xxxx?pageNum='+pageNum+'&pageSize='+pageSize,
			// 	success: (data) => {
			// 		// 接口返回的当前页数据列表 (数组)
			// 		let curPageData = data.xxx; 
			// 		// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
			// 		let curPageLen = curPageData.length; 
			// 		// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
			// 		let totalPage = data.xxx; 
			// 		// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
			// 		let totalSize = data.xxx; 
			// 		// 接口返回的是否有下一页 (true/false)
			// 		let hasNext = data.xxx; 
					
			// 		//设置列表数据
			// 		if(page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
			// 		this.dataList = this.dataList.concat(curPageData); //追加新数据
					
			// 		// 请求成功,隐藏加载状态
			// 		//方法一(推荐): 后台接口有返回列表的总页数 totalPage
			// 		this.mescroll.endByPage(curPageLen, totalPage); 
					
			// 		//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
			// 		//this.mescroll.endBySize(curPageLen, totalSize); 
					
			// 		//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
			// 		//this.mescroll.endSuccess(curPageLen, hasNext); 
					
			// 		//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
			// 		//如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
			// 		//如果传了hasNext,则翻到第二页即可显示无更多数据.
			// 		//this.mescroll.endSuccess(curPageLen);
					
			// 		// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
			// 		// 建议使用setTimeout,因为this.$nextTick某些情况某些机型不触发
			// 		setTimeout(()=>{
			// 			this.mescroll.endSuccess(curPageLen)
			// 		},20)
					
			// 		//curPageLen必传的原因:
			// 		// 1. 使配置的noMoreSize 和 empty生效
			// 		// 2. 判断是否有下一页的首要依据: 
			// 			// 当传的值小于page.size时(说明不满页了),则一定会认为无更多数据;
			// 			// 比传入的totalPage, totalSize, hasNext具有更高的判断优先级;
			// 		// 3. 当传的值等于page.size时(满页),才取totalPage, totalSize, hasNext判断是否有下一页
			// 		// 传totalPage, totalSize, hasNext目的是避免方法四描述的小问题
					
			// 		// 提示: 您无需额外维护页码和判断显示空布局,mescroll已自动处理好.
			// 		// 当您发现结果和预期不一样时, 建议再认真检查以上参数是否传正确
			// 	},
			// 	fail: () => {
			// 		//  请求失败,隐藏加载状态
			// 		this.mescroll.endErr()
			// 	}
			// })


			this.mixin_up_refreshPage(page, this.mescroll)					
		},	
		// 返回上级页面 
		backPage(num = 1){
			this.getDeviceApi().navigateBack({
				delta: num
			})
		},			
		// 检查是否登录
		getLoginStatus () {
			return new Promise((resolve, reject) => {
				// 从store 中获取 用户
				let loginStatus = this.userToken
				if( loginStatus ) {
				  // 登陆成功
				  resolve(true);
				}else {
				  // 未登陆成功
				  resolve(false);
				}				
			})
		},
		// 当前页面的地址/上一个页面地址  注意：不要在 App.onLaunch 的时候调用 getCurrentPages()，此时page 还没有生成。
		getPageUrl(flag = "current"){
			if(flag === "current"){
				// 当前页面
				let pages = getCurrentPages()
				let currentPage = pages[pages.length - 1] // 当前页面路径
				return currentPage.route
			}else if(flag === "before"){
				// 上一个页面
				let beforePage = ''
				let pages = getCurrentPages()
				pages.length > 1 && pages[pages.length - 2] // 前一个页面路径
				return currentPage.route
			}
			
		},
		// 封装的页面跳转带参数的方法 	
		togoPage(toPageUrl, params = {}, togoType = 'navigate'){
			// toPageUrl 为不带参数的链接， togoType为跳转的方式：navigate,switch,redirect,relaunch
			// params 为 传递的参数对象
			// debugger
			return new Promise ((resolve, reject) => {
				var togo = (toPageUrl, params, togoType) => {
					// h5 端 使用 时 需要有页面顶部的进度条
					//#ifdef H5
					this.$NProgress.start()
					//#endif
	
					function param (data) {
						let urlParams = ''
						let keyArr = Object.keys(data)
						if(keyArr.length == 0){
							// data 为 {}
						}else {
							// data 非 空
							for (var k in data) {
								let value = data[k] !== undefined ? data[k] : ''
								// 地址栏中将 value进行了 编码处理，进而获取 此参数后需要 decodeURIComponent()进行解码
								// urlParams += '&' + k + '=' + encodeURIComponent(JSON.stringify(value))
								urlParams += '&' + k + '=' +  value
							}
						}
						return urlParams ? urlParams.substring(1) : ''
					}
	
					toPageUrl += (toPageUrl.indexOf('?') < 0 ? '?' : '&') + param(params)
			
					console.log("将要跳转的地址及参数信息----------", toPageUrl)
					switch(togoType){
						case 'navigate':
							uni.navigateTo({  
								url: toPageUrl
							}) 
							resolve()
							//#ifdef H5  
							this.$NProgress.done()
							//#endif					
						break
						case 'switch':
							uni.switchTab({  
								url: toPageUrl
							}) 
							resolve()
							//#ifdef H5  
							this.$NProgress.done()
							//#endif					
						break
						case 'redirect':
							uni.redirectTo({  
								url: toPageUrl
							}) 
							resolve()
							//#ifdef H5  
							this.$NProgress.done()
							//#endif					
						break
						case 'relaunch':
							uni.reLaunch({  
								url: toPageUrl
							}) 
							resolve()
							//#ifdef H5  
							this.$NProgress.done()
							//#endif					
						break	
						default: 
							uni.navigateTo({  
								url: toPageUrl
							}) 	
							resolve()
							//#ifdef H5  
							this.$NProgress.done()
							//#endif																				
					}		
				}
	
				if(toPageUrl.indexOf('/pages/amos-login/login') < 0 ){
					// 需要跳转到非登录页面
					console.log("跳转前的页面地址--------:", this.getPageUrl("current"))
					let currentPageUrl = '/' + this.getPageUrl("current")
					// 当前页不是 登录页面 此时跳转需要进行是否需要登录后才能进行
					this.$checkLogin(toPageUrl, togoType).then(res => {
						// debugger
						let res_checkLogin_isLogin = res.isLogin
						// 白名单
						let res_checkLogin_isWhiteList = res.isWhiteList
						if(res_checkLogin_isWhiteList){
							// 跳转的页面是免登录页面
							togo(toPageUrl, params, togoType)
						}else {
							// 跳转的页面是必须要登录的页面
							if(res_checkLogin_isLogin){
								// 已经登录，直接跳转
								togo(toPageUrl, params, togoType)
							}else {
								// 未登录
								if(currentPageUrl.indexOf('/pages/amos-login/login')< 0){
									// 当前页面为非登录页面
									// 不能跳转，弹出 未登录的提示框
									this.confirm('您未登录,请先登录').then(res => {
										if(res == 0){
											// 点击了确认按钮,跳转到 登录页面
											let res_page = this.$findPageUrl("login")
											togo(res_page, {}, 'navigate')
										}else if (res == 1){
											// 点击了取消按钮
										}
									})
								}else {
									// 当前页面为登录页面，此时不需要 登录（本来就还未登录）,直接跳转
									togo(toPageUrl, params, togoType)
								}						
							}	
						}
					})				
				}else {
					// 需要跳转到登录页面
					togo('/pages/amos-login/login', params, togoType)
				}
			})
		},		
		// 页面跳转
		navigatePage ( url ) {
			//#ifdef H5  
			this.$NProgress.start()
			//#endif			
			return new Promise((resolve , reject) => {
				uni.navigateTo({
				  url:url,
				  success: res => {
					//#ifdef H5  
					this.$NProgress.done()
					//#endif					  
					resolve(res)
				  },
				  fail: res => {
					reject(res)
				  }
				})
			})
		},
		switchPage ( url ) {
			//#ifdef H5  
			this.$NProgress.start()
			//#endif
			return new Promise((resolve , reject) => {
				uni.switchTab({
				  url:url,
				  success: res => {
					//#ifdef H5  
					this.$NProgress.done()
					//#endif					  
					resolve(res)
				  },
				  fail: res => {
					reject(res)
				  }
				})
			})
		},
		redirectPage ( url ) {
			//#ifdef H5  
			this.$NProgress.start()
			//#endif			
			return new Promise((resolve , reject) => {
				uni.redirectTo({
				  url:url,
				  success: res => {
					//#ifdef H5  
					this.$NProgress.done()
					//#endif
					resolve(res)
				  },
				  fail: res => {
					reject(res)
				  }
				})
			})
		},
		reLaunchPage ( url ) {
			//#ifdef H5  
			this.$NProgress.start()
			//#endif			
			return new Promise((resolve , reject) => {
				uni.reLaunch({
				  url:url,
				  success: res => {
					//#ifdef H5  
					this.$NProgress.done()
					//#endif						  
					resolve(res)
				  },
				  fail: res => {
					reject(res)
				  }
				})
			})			
		},
		// 获取登录场景值（小程序）
		getEnterType: getEnterType, 
		//小程序官方所有接口写在这里
		getDeviceApi: getDeviceApi,	
		
		// 开启loading
		showLoading(title, mask = false, duration ) {
			this.getDeviceApi().showLoading({
				title: title || '加载中',
				mask: mask,

			})
			if (duration > 0) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						uni.hideLoading()
						resolve();
					}, duration);
				});
			}
		},
		// 关闭 loading
		hideLoading(duration = 2000 ){
			this.getDeviceApi().hideLoading()
			if (duration > 0) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve();
					}, duration);
				});
			}			
		},
		// 成功的 showToast
		success(title, duration = 2000, mask) {
			this.getDeviceApi().showToast({
				title: title,
				icon: 'success',
				mask: mask ? false : true,
				duration: duration
			});
			if (duration > 0) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve();
					}, duration);
				});
			}
		},
		// modal弹框
		modal(text, title = '提示') {
			return new Promise((resolve, reject) => {
				this.getDeviceApi().showModal({
					title: title,
					content: text,
					showCancel: false,
					success: res => {
						resolve(res);
					},
					fail: res => {
						reject(res);
					}
				});
			});
		},
		// confirm弹框
		confirm(text, payload = {}, title = '提示', confirmText = '确定', cancelText = '取消') {
			return new Promise((resolve, reject) => {
				let params = {
					title: title,
					content: text,
					showCancel: true,
					cancelText: cancelText,
					confirmText: confirmText,
					success: res => {
						if (res.confirm) {
							resolve(0, payload);
						} else if (res.cancel) {
							reject(1, payload);
						}
					},
					fail: res => {
						reject(-1, payload);
					}
				};
				this.getDeviceApi().showModal(params);
			});
		},
		// toast 弹框
		toast(title, duration = 2000, onHide, icon = 'none') {
			this.getDeviceApi().showToast({
				title: title,
				mask: false,
				duration: duration,
				icon: icon
			});
			// 隐藏结束回调
			if (onHide) {
				setTimeout( () => {
					onHide();
				}, duration );
			}
		},
		// alert 弹框
		alert(title, duration = 2000, icon = true) {
			let _this = this;
			this.getDeviceApi().showToast({
				title: title,
				icon: icon? require('@/static/imgs/icon/alert.png'): 'none',
				mask: false,
				duration: duration
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve();
				}, duration);
			});
		},
		// error 弹框
		error(title, duration = 2000, onHide) {
			let _this = this;
			this.getDeviceApi().showToast({
				title: title,
				image: require('@/static/imgs/icon/error.png'),
				mask: true,
				duration: duration
			});
			// 隐藏结束回调
			if (onHide) {
				setTimeout(() => {
					onHide();
				}, duration);
			}
		},
		// 设置localstorage 
		setStorage ( key , val, type = 2 ) {
			debugger
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
		},
		// 提取localstorage
		getStorage( key ) {
			return new Promise((resolve,reject)=>{
				try{
					// 同步取 storage
					let res = uni.getStorageSync(key);
					resolve( res )
				}catch(e){
					//TODO handle the exception
				}
			})
		},
		// 删除localstorage 
		removeStorage( key, type = 1 ) {
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
    	},
		// 判断是否 isundefined
		isUndefined(item) {
		  return typeof item === 'undefined';
		},
		// 判断是否是 非 undefined
		isDefined(item) {
		  return !this.isUndefined(item);
		},
		// 判断是否是 string
		isString(item) {
		  return typeof item === 'string';
		},
		//判断是数字
		isNumber(item) {
		  return typeof item === 'number';
		},
		// 判断是数组
		isArray(item) {
		  return Object.prototype.toString.apply(item) === '[object Array]';
		},
		// 判断是对象
		isObject(item) {
		  return typeof item === 'object' && !this.isArray(item);
		},
		// 判断是函数
		isFunction(item) {
		  return typeof item === 'function';
		},     
		// #ifdef MP-WEIXIN
		chekWeixinLogin () {
			// 微信登录状态监测	
			return new Promise((resolve, reject) => {
				this.getDeviceApi().checkSession({
					success() {
						console.log('微信登录session_key未过期，ok');
						// session_key 未过期，并且在本生命周期一直有效
						resolve(true)
					},
					fail() {
						// 微信登录已过期
						// session_key 已经失效，需要重新执行登录流程
						//this.getDeviceApi().login() // 重新登录
						this.toast("微信登录已过期,请重新授权登陆!")
						reject("微信登录已过期")
						console.log('expire');
					}			
				})
			})
		},
		// #endif

		// #ifdef APP-PLUS
		getAppCid() {
			// app-plus 登录成功后 获取 设备的 clientid

			this.clientid = plus.push.getClientInfo().clientid
			console.log("获取到的应用clientid", this.clientid)
			if (!this.clientid) { //如果获取的clientid为空，说明客户端向推送服务器注册还未完成，可以使用setTimeout延时重试。
				setTimeout(() => {
					this.clientid = plus.push.getClientInfo().clientid
					console.log("setTimeOut后打印的clientid", this.clientid)
				}, 4000)
			}else {
				// 存入用户的clientid 到storage 中
				this.getDeviceApi().setStorage("clientid", this.clientid)
			}
		 
			// 首先是获取cid，cid是每个设备向个推服务器注册以后生成的设备id，获取到cid后要在登录的时候把cid传给服务端和用户绑定起来，就可以实现特定用户的推送。
			// 两个监听click很明显，就是点击时候出触发的。
			// receive有两种情况会触发
			// 1.ios应用已经打开的情况，这种情况通知栏不会有消息。可以自己写这种情况的处理逻辑，一般会弹出一个弹窗问需不需要跳转，我的方式是用plus.push.createMessage本地创建一条消息。
			// 2.android接收到不符合格式的推送（不符合{title:"xxxx",content:"xxxx",payload:"xxxxx"}），这个是服务端来控制的

			plus.push.addEventListener('click', (message) => {
				// 客户端注册点击事件
				this.pushCallBack("click事件", message)
			})
		 
			plus.push.addEventListener('receive', (message) => {
				// 客户端注册receive事件
				this.pushCallBack("reciive事件", message)
			})
		},
		// #endif
		
		// #ifdef APP-PLUS
		pushCallBack(str, message){
			// 收到推送注册的 click 或者 receive事件后的 回调函数
			debugger
			this.getDeviceApi().toast(`${str},消息内容：${message}`)
		},
		// #endif

		// #ifdef APP-PLUS
		// app-plus 上面 检测 手机是否安装有微信、qq、weibo 等
		appLogin: (type) => {
			// type 值为 'weixin'  'qq'  'sinaweibo' 'xiaomi'
			// 检测手机上是否安装微信、QQ、新浪微博等。
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					console.log(res.provider);
					//支持微信、qq和微博等
					if (~res.provider.indexOf(type)) {
						// 有装 微信 qq  新浪微博 
						uni.login({
							provider: type,
							success: function(loginRes) {
								console.log('-------获取openid(unionid)-----');
								console.log(JSON.stringify(loginRes));
								// 获取用户信息
								uni.getUserInfo({
									provider: type,
									success: function(infoRes) {
										console.log(`-------获取用户 ${type}] 所有信息-----`);
										console.log(JSON.stringify(infoRes.userInfo));
										
										
									},
									fail: function(err){
										console.log(`-------获取用户 ${type}] 所有信息报错了-----`)
										console.log(err);
									}
								})
							}
						})
					}else {
						//未装 微信  qq weibo  等
						// this.error(`手机未安装: [${type}]`)
						this.toast(`手机未安装: [${type}]`)
						console.log(`----------手机未安装: [${type}]----------`)
					}
				},
				fail: function(err){
					console.log("----------报错了------------")
				}
			})
		},
		// #endif
		
		// 授权成功后，进行登陆注册获取 token，并缓存 AuthorizeStatus ,token 等
		async authorizeAfter_login(){
			debugger
			let that = this;
			// debugger;
			// 登陆之前，首先将全局的授权状态notAuthrize改为 已授权(true)，并存入 localstorage中，后续判断是否授权都是看localstorage里面的这个字段
			// await that.setStorage( "AuthorizeStatus", true );    
			return new Promise(async (resolve,reject)=>{
			  	try{
					console.log('---调用login方法---')
					// let token = that.getDeviceApi().getStorageSync('token') || '';    
					// let userInfo = that.getDeviceApi().getStorageSync( 'userInfo' ) || '';
					// if( token )   await that.removeStorage("token" );
					// if( userInfo )  await that.removeStorage("userInfo" );      
					// debugger
					// 先登陆 uni.login();
					// let {code } = await uni.login();  //通过调用uni.login()获取code 判断是否开始登录
					let code = ''
					await that.getDeviceApi().login({
						success: async(res) => {
							// debugger
							console.log("-----打印uni.login()登录后返回的code------",res.code)
							code = res.code

							if(code){
								let userInfo= await uni.getUserInfo({
									lang: "zh_CN"
								})
								
								console.log("-----授权后通过uni.getUserInfo()获取用户信息返回的结果-----：", userInfo[1])
								// debugger
								let {
									iv,
									encryptedData,
									signature,
									rawData
									} = userInfo[1]

									// that.$store.dispatch("setUserName", userInfo[1].userInfo)  // 将返回的数据赋值 存入 store 的app中  
							
								let params = {
									params: {
										code: code,
										encryptedData: encryptedData,
										iv: iv,
										type: '' //0是扫码，1是点击分享图，2.微信上搜索的
									}
								}
								
								//  this.$parent.gloabalData.ret = userInfo;  //  将返回的数据赋值给 全局gloabalData 的ret 
								//   console.log('---获取信息,发送网络请求，将获取到的code 传给后台获取 用户信息（openid、token等信息）---');
						
								//   let ret = this.$parent.globalData.ret;
						
								//   let type = "";
						
								//   console.log("----打印global中的 optionObj对象信息---：", this.$parent.globalData.optionObj );
								//   if ( this.$parent.globalData.optionObj.scene ){
								// 	// 场景值
								// 	type = await that.getEnterType(this.$parent.globalData.optionObj.scene );
								//   }
						
								//   let params = {
								// 	params: {
								// 	  code: code,
								// 	  encryptedData: ret.encryptedData,
								// 	  iv: ret.iv,
								// 	  type: type,       //0是扫码，1是点击分享图，2.微信上搜索的
								// 	  userId: that.$parent.globalData.optionObj.query.scene ? that.$parent.globalData.optionObj.query.scene : "",    // 用户scene唯一标识 用于邀请人数的统计
								// 	}
								//   }
						
								// 调用 后台注册用户信息的login接口 getOenId 方法
								// console.log(commApi)
								commApi.getOpenId( params, true ).then((res)=>{
									// debugger
									console.log("------------------",res)
									if(res && res.statusCode == 200){
										let resData = res.data
										if( resData && resData.code == 1){
											// debugger
											console.log('---网络请求返回成功---')
											console.log("-----调取后台login接口注册用户信息成功后获取openid成功------：", resData)          

											that.setStorage( "userToken", resData.data.token )
											// 将token 存入 store - app中
											that.$store.dispatch("setUserToken", resData.data.token)

											// id 存入缓存中
											this.setStorage("userId", resData.data.customer.id)
											// 将userId 存入 store-app 中
											that.$store.dispatch("setUserId", resData.data.customer.id)

											// 缓存 用户信息 userInfo
											that.setStorage( "userInfo", JSON.stringify(resData.data.customer) )          
											resolve(true);  
										}else if( resData.code == 1018){
											// 发现是黑名单用户，跳转至黑名单页面
											//   this.reLaunchPage("../blacklist/index");
											//   console.log("---------调用后台login接口后返回的状态有问题-------")											
										}
										else {
											// debugger
											// 登陆后后台返回错误
											that.toast("登陆失败");
											reject("-----调用后台login接口后返回的状态有问题-----")
											console.log("---------调用后台login接口后返回的状态有问题-------")
										}
									}
								}).then(async ()=>{
									let token = await that.getStorage( "userToken" ) || "";
									let userInfo = await that.getStorage( "userInfo" ) || "";
									console.log('--------缓存token成功----------')
									console.log( "缓存成功后读取缓存中的token：", token )
									console.log('----------缓存userInfo成功--------')
									console.log( "缓存成功后读取缓存中的userInfo：", userInfo ) 
								})						
							}else{
								reject("---登陆微信后台 wx.login() 接口返回异常---");
								console.log('---登陆微信后台 wx.login() 接口返回异常---')
							}
						},
						fail: (error) => {
							// debugger
							console.log("-----打印登录后------", error)
						}
					})
				}catch (error) {
					console.log(error)
					reject(error)
				}
			}) 
		},	  
			
		// 判断是否授权（主要是微信小程序）
		async getAuthorizeStatus(type, cb, fb) {
			// type: "scope.userInfo" "scope.userLocation" "scope.address" "scope.invoiceTitle" "scope.invoice" "scope.record" "scope.werun" "scope.writePhotosAlbum" "scope.camera"
			let _this = this
			if(!type){
				_this.toast("请传入scope.type!")
				return 
			}
			let scopeText = {
				"scope.userInfo":"用户信息",
				"scope.userLocation": "地理位置",
				"scope.address": "通讯地址",
				"scope.invoiceTitle": "发票排头",
				"scope.invoice": "获取发票",
				"scope.record": "录音功能",
				"scope.werun": "微信运动步数",
				"scope.writePhotosAlbum": "保存到相册",
				"scope.camera": "摄像头"
			}		

			return new Promise((resolve,reject)=>{
				// debugger
				_this.getDeviceApi().getSetting().then((res) => {
					// 获取用户授权信息
					console.log("打印用户授权的情况集合------------",res)   // res.userInfo 为true  res.errMsg == "authorize:ok"
					if( res ){
						// debugger
						if(res[1] && res[1]['authSetting'] && res[1]['authSetting'][type]){
							// 自动检测到已经授过权
							console.log(`--------------检测到已授权了：【${scopeText[type]}】 的权限---------`)
							// 成功回调
							cb && cb()
							resolve(true)
						}else {
							// 未授权
							console.log(`----------检测到未授权：【${scopeText[type]}】 的权限-----------`)
							fb && fb()
							resolve(false)
						}
					}else {
						// 先判断是否是网络问题造成了请求失败
						try {
							_this.getDeviceApi().getNetworkType({
								success: function (res) {
									let  networkType = res.networkType
									if( networkType != "none" ) {
										// 有网络，检查 缓存中的授权字段
										//   let AuthorizeStatus = _this.getDeviceApi().getStorageSync("AuthorizeStatus");
										//   if( AuthorizeStatus ) {
										// 	resolve( true ) ;
										//   }else {
										// 	resolve( false ) ;
										//   }  
										reject("--------报错了-------------")
									}else {
										// 无网络 返回true, 弹出 提示
										_this.error("网络异常")
										reject( "--------网络异常，请先检查网络------------" ) 
									}
								}
							})
						} catch (error) {
							reject("--------报错了-------")
						}						
					}
				})
			})		
    	},
		// 选择图片 在前端显示出来 params:{count,sizeType,sourceType}
		async chooseImg ( param ) {
		  let data = {
			count: 9, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		  }
		  param = Object.assign(data, param);
		  // debugger;
		  let tempFilePaths = [];
		  let that = this;

		  return new Promise( (resolve , reject)=>{
			that.getDeviceApi().chooseImage({
			  count: param.count, // 默认9
			  sizeType: param.sizeType, // 可以指定是原图还是压缩图，默认二者都有
			  sourceType: param.sourceType, // 可以指定来源是相册还是相机，默认二者都有
			  success: res => {
				that.getDeviceApi().showToast({
				  title: '正在上传...',
				  icon: 'loading',
				  mask: true,
				  duration: 2000
				});
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				console.log("上传成功后后打印返回选择的图片的临时地址",res.tempFilePaths)
				// 返回选择的图片的临时地址
				resolve( res.tempFilePaths );
			  },
			  fail: res => {
				// debugger; 
				that.getDeviceApi().showToast({
				  title: '取消选择',
				  // icon: 'loading',
				  image: '../static/imgs/icon/error.png',
				  mask: true,
				  duration: 2000
				});
				reject( res )
			  }
			});
		  })
		},
		//   选择图片 预览 传入 urls ,index 的对象集合
		async previewImage (  param  ) {
		  let data = {
			index: 0,  // 默认显示第一张开始
			urls: [],  // 预览的图片地址的数组集合
		  }
		  // debugger;
		  param = Object.assign(data, param);
		  // let index = e.target.dataset.index;//预览图片的编号
		  let that = this;
		  let urls = param.urls;
		  let current = param.urls[param.index];
		  that.getDeviceApi().previewImage({
			current: current,//预览图片链接
			urls: urls,//图片预览list列表
			success: function (res) {
			  //console.log(res);
			},
			fail: function () {
			  //console.log('fail')
			}
		  })
		},
		// 转换时间
		switchTimeForMart( value ) {
			if( value ) {
				 let theTime = parseInt(value); 
				 let middle = 0; // 分
				 let hour = 0; //小时
				 middle= parseInt(theTime/60);
				 theTime = parseInt(theTime%60);
				 if( theTime<10 ) {
					 theTime = "0"+ theTime ;
				 }

				 if(middle> 60) {
					 hour= parseInt(middle/60);
					 middle= parseInt(middle%60);
				 }

				 if( middle<10 ) {
					 middle = "0"+middle + ":";
				 }

				 if( hour<10 ){
					 if( hour ==0 ) {
						 hour = "";
					 }else {
						 hour = "0"+hour + ":";
					 }
				 }
				 var result = ""+hour + middle  + theTime;
				 return result;           
			} 
		},
		//   分享給好友/群,返回一个分享的对象
		async sharePic ( shareObj ) {
			let that = this;
			// debugger;
			console.log(  shareObj.title);
			return new Promise((resolve,reject)=>{
			  let shareObj_res = {
				title: shareObj.title,
				path: shareObj.path,
				imageUrl: shareObj.imageUrl,
				success: (res)=>{
					console.log(res)
					// debugger;
					that.getDeviceApi().showShareMenu({
						withShareTicket: true
					});          

				  if( res && res.errMsg == 'showShareMenu:ok' ) {
					that.success("分享成功",1000,true);
				  }  
				  // 获取分享者信息
				  that.getDeviceApi().getShareInfo({
					shareTicket: res.shareTickets[0]||"",
					success: (res)=>{ console.log(res) },
					fail:  (res) => { console.log(res) },
					complete: (res)=> { console.log(res) }
				  })    
				  // resolve( res );          
				},
				fail: (res)=>{
				  console.log(res)
				  // resolve( res );
				  // debugger;
				  if( res.errMsg == 'showShareMenu:cancel' ) {
					// 取消
					that.getDeviceApi().showToast({
					  title: "转发取消",
					  image: '../static/imgs/icon/alert.png',
					  mask: false,
					  duration: duration
					});

				  }else if ( res.errMsg == 'shareAppMessage:fail' ) {
					// 转发失败，其中 detail message为详细失败信息
					that.alert("转发失败",1000)
				  }
				},
				complete: (res)=>{
				  // debugger;
				  // resolve( res );
				}
			  };
			  
			  // if( opt.from == 'button' ) {
			  //   let eData = opt.target.dataset;
			  //   console.log( eData.name )
			  //   shareObj.path = `/pages/find/index?btn_name=${eData.name}`
			  // }
			  resolve ( shareObj_res );
			})
		},

		//判断是否开启了 ** 功能授权的权限并进行相应的授权提示操作 传入  scope.type 值
		//type类型scope.userInfo	、scope.userLocation、scope.address、scope.invoiceTitle、scope.invoice、scope.record、scope.werun、scope.writePhotosAlbum、scope.camera	
		async getIsAuthorize (type) {
			let that = this;
			if(!type){
				that.toast("请传入scope.type!")
				return 
			}
			let scopeText = {
				"scope.userInfo":"用户信息",
				"scope.userLocation": "地理位置",
				"scope.address": "通讯地址",
				"scope.invoiceTitle": "发票排头",
				"scope.invoice": "获取发票",
				"scope.record": "录音功能",
				"scope.werun": "微信运动步数",
				"scope.writePhotosAlbum": "保存到相册",
				"scope.camera": "摄像头"
			}
			return new Promise( async ( resolve , reject  )=>{
			  that.getDeviceApi().getSetting().then((res)=>{
				// 获取用户授权信息
				console.log(res)   // res.userInfo 为true  res.errMsg == "authorize:ok"
				console.log(res.authSetting)
				if( res.authSetting[type] ) {
				  // 自动检测到已经授过权
				  resolve(true);
				  return true;
				}else if ( !res.authSetting[type] ){
					// 检测到还未授权
					if( that.getDeviceApi().openSetting ) {
						that.getDeviceApi().showModal({
						  title: "提示",
						  content: `使用该功能需要授权开启${scopeText[type]}的权限，请点击确定先开启设置`,
						  showCancel: false,
						  confirmTex: "授权开启",
						  confirmColor: "#52a2d8",
						  success: res =>{
							that.getDeviceApi().authorize({
							  scope: type,
							  success(){
								// 授权成功
								resolve(true)
							  },
							  fail(){
								// 第一次授权失败
								that.getDeviceApi().showModal ({
								  title: "提示",
								  content: `您未开启${scopeText[type]}的权限,请开启设置`,
								  showCancel: true,
								  confirmTex: "授权开启",
								  confirmColor: "#52a2d8",
								  success: function(res){
									if( res.confirm ) {
									  that.getDeviceApi().openSetting({
										success: (res)=>{
										  console.log(res.authSetting);
										  if( res.authSetting[type] ){
											// 第二次授权成功
											resolve(true);
										  }else {
											// 第二次也未授权，再次提示开启授权
											that.getDeviceApi().showModal({
											  title: "提示",
											  content: `未开启授权将无法使用${scopeText[type]}的功能,请开启设置`,
											  showCancel: true,
											  confirmTex: "开启授权",
											  confirmColor: "#52a2d8",       
											  success: function(res){
												if( res.confirm ) {
												  that.getDeviceApi().openSetting({
													success: (res)=>{
													  console.log(res.authSetting);
													  if( res.authSetting[type] ){
														// 第二次授权才成功
														resolve( true );
													  }else {
														// 第二次授权没有成功
														that.getDeviceApi().showToast({
														  title: '授权失败',
														  // icon: 'loading',
														  image: '../static/imgs/icon/error.png',
														  mask: true,
														  duration: 1000
														});    
														resolve(false)                                            
													  }
													}
												  })
												}
											  }                           
											})
										  }
										}
									  })
									}
								  }
								})
							  }
							})                
						  }
						})
					  }          
					}
				})
			})
		}
	}
}

