<style lang="less" scoped>
	uni-page-body {
		height: 100%
	}
	/deep/.u-notice-text {
		font-size: 24upx !important;
	}
	#findBox{
		padding-bottom: calc(var(--window-bottom));
		// background-color: rgba(255,255,255,1);
		background-color: rgba(245,245,245,1);
		.searchBox {
			padding:0 30upx 10upx 30upx;
			box-sizing: border-box;
			background: #ffffff;
			margin: 10upx 0;
			/deep/.u-content {
				height: 80upx !important;
				.u-input {
					height: 100% !important
				}        
			}		
		}
		.search-box {width:95%;background-color:rgb(242,242,242);padding:15upx 2.5%;display:flex;justify-content:space-between;position:sticky;top: 0;}
		.search-box .mSearch-input-box{width: 100%;}
		.search-box .input-box {width:85%;flex-shrink:1;display:flex;justify-content:center;align-items:center;}
		.search-box .search-btn {width:15%;margin:0 0 0 2%;display:flex;justify-content:center;align-items:center;flex-shrink:0;font-size:28upx;color:#fff;background:linear-gradient(to right,#ff9801,#ff570a);border-radius:60upx;}
		.search-box .input-box>input {width:100%;height:60upx;font-size:32upx;border:0;border-radius:60upx;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0 3%;margin:0;background-color:#ffffff;}
		.placeholder-class {color:#9e9e9e;}
		.search-keyword {width:100%;background-color:rgb(242,242,242);}		
		.items {
			background-color: #ffffff;
			.item {
				height: 150upx;
				padding: 0 40upx;
				box-sizing: border-box;
				&:active {
					background: rgba(242,242,242,.8)
				}				
				.left {
					width: 80upx;

				}
				.right {
					width: calc(100% - 40px);
					padding: 0 20upx;
					box-sizing: border-box;
					.right-top {
						.right-top-left {
							font-size: 32upx;
							color: #000000
						}
						.right-top-right {
							font-size: 24upx;
							color: #9d9d9d
						}
					}
					.right-bottom {
						font-size: 24upx;
						color: #9d9d9d
					}
				}
			}
		}
		.find-notLogin {
            display: flex;
            flex: 1;
            flex-direction: column;
            .title {
                color: #8f8f94;
                margin-top: 50upx;
            } 
            .ul {
                font-size: 30upx;
                color: #8f8f94;
                margin-top: 50upx;
                view {
                    line-height: 50upx;
                }
            }  			
		}
	}
</style>
<template>
	<container
		ref="containerCmp"
		:containerAllloading="containerAllloading"
		:containerLoading = "containerLoading"
	>
		<view  id="findBox" class="page animated fast fadeIn" slot="container-slot">
			<!--loading组件-->
			<!-- <Loading type="4"></Loading> -->
			<!-- bg.find_bg:{{bg.find_bg}} -->
			<!-- {{$configs.baseImgsUrl + $configs.baseUrlConfigs.imgs_bg.find_bg}} -->
			<!--loading-->
			<!-- <view class="searchBox" @click="inputFocus">
				<u-search 
					placeholder="输入关键词" 
					:clearabled="true" 
					:show-action="false"
					v-model="searchKey"
					@focus="inputFocus"
				></u-search>
			</view> -->

            <view class="search-box">
                <!-- mSearch组件 如果使用原样式，删除组件元素-->
                <search-history 
                    class="mSearch-input-box" 
                    :mode="2" 
                    button="inside" 
					:isFocus="false"
                    :placeholder="defaultKeyword" 
                    @search="doSearch(false)" 
					@inputFocus="inputFocus"
                    @confirm="doSearch(false)" 
                    v-model="keyword"
                ></search-history>
                <!-- 原样式 如果使用原样式，恢复下方注销代码 -->
                <!-- 						
                <view class="input-box">
                    <input type="text" :adjust-position="true" :placeholder="defaultKeyword" @input="inputChange" v-model="keyword" @confirm="doSearch(false)"
                    placeholder-class="placeholder-class" confirm-type="search">
                </view>
                <view class="search-btn" @tap="doSearch(false)">搜索</view> 
                -->
                <!-- 原样式 end -->
            </view>

			<!-- <u-icon name="rizhi" custom-prefix="my-iconfont">icon图标</u-icon>
			<i class="my-iconfont-woguanzhude"></i> -->
			<!-- <u-icon name="photo"></u-icon> -->

			<!--已登录-->
			<view v-if="userToken" class="find-hasLogin">
				<mescroll-uni 
					class="mescroll_contentList_wrap"
					ref="mescrollRef" 
					:height="scrollHeight"
					@init="mescrollInit" 
					@down="downCallback" 
					@up="upCallback" 
					:down="downOption" 
					:up="upOption" 
					id="dataList"
				>  
					<view class="items">
						<view 
							class="item u-f-jsb" 
							v-for="(item, index) in toolList"
							:key="index">
							<view class="left">
								<u-icon :name="item.iconName" size="76" custom-prefix="my-iconfont" :color="item.color"></u-icon>
							</view>
							<view class="right line u-f1 u-f-column u-f-jc">
								<view class="right-top u-f-jsb">
									<view class="right-top-left">
										{{item.name}}
										<u-badge 
											:is-dot="false" 
											:count="item.count" 
											:offset="[]"
										></u-badge>
									</view>
									<view class="right-top-right">下午4:00</view>
								</view>
								<view class="right-bottom ellipsis1">
									<u-notice-bar 
										mode="horizontal" 
										:list="item.content"
										type="none"
										:close-icon="false"
										duration="2500"
										:speed="50"
									></u-notice-bar>
								</view>
							</view>
						</view>
					</view>
				</mescroll-uni>				
			</view>
			
			<!---未登录-->
			<view v-if="!userToken" class="find-notLogin">
                <view class="title" @click="clickBtn">
                    您好 游客。
                </view>
                <view class="ul">
                    <view>这是 小助手App首页。</view>
                    <view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
                </view>
            </view>
			
		</view>
	</container>
</template>

<script>
	// import {uniCard, uniPagination} from '@dcloudio/uni-ui'	
	// import FooterExplain from '@/pages/components/footerExplain/footerExplain'
	import { miniProApi } from '@/utils/mixins.js'
		//引用mSearch组件，如不需要删除即可
	import SearchHistory from '@/components/search-history/search-history'; 
	import { mapGetters } from 'vuex'
	export default {
		mixins: [ miniProApi ],
        components: {
			SearchHistory
		},			
		data() {
			return {
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false,				
				mescroll:null, 
				upOption: {
					auto: false, //是否在初始化完毕之后自动执行一次上拉加载的回调
					use: true, // 是否启用下拉刷新 如果配置false,则不会初始化上拉刷新的布局
					isBounce: true, //是否允许橡皮筋回弹效果, 默认不允许
					page: {
						num: 1, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
						size: 10,  // pageSize 为miniProApi data中的共有值
						time: null,  //加载第一页数据服务器返回的时间 (可空); 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
					},
					textLoading: '加载中 ...',  //上拉加载中的文本
					textNoMore: '-- END --',  // 没有更多数据的提示文本
					bgColor: 'transparent', // 下拉区域背景颜色 
					textColor: 'gray', // 下拉文本的颜色 (当bgColor配置了颜色,textColor未配置时,则会默认为白色 1.2.4新增) 
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {//列表第一页无任何数据时,显示的空提示布局; 需配置warpId或clearEmptyId才生效;
						//列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
						// warpId:	"xxid", //父布局的id (1.3.5版本支持传入dom元素)													
						use: false, // 是否启用
						btnText: '返回', // 按钮文本
						icon: require("@/components/mescroll-uni/components/mescroll-uni/mescroll-empty.png"), //图标,默认null
						tip: "暂无相关数据~", //提示							
					}, 
					toTop: {
						//回到顶部按钮
						// src: "../img/mescroll-totop.png", //图片路径,默认null,支持网络图
						offset: 1000 //列表滚动1000px才显示回到顶部按钮	
					},					
					clearEmptyId: "dataList", //相当于同时设置了clearId和empty.warpId; 简化写法;默认null，配置了此项后数据请求里就不需要配置if(pageindex == 1) {self.tableData = [];}
				},
				// 下拉刷新的配置(可选, 90%的情况无需配置)
				downOption: { 
					use: true, // 是否启用下拉刷新 如果配置false,则不会初始化下拉刷新的布局
					auto: false, //是否在初始化完毕之后自动执行一次下拉加载的回调
				},
				searchKey: '',
				toolList: [
					{
						name: '消息通知',
						iconName: 'xiaoxi1',
						path: '',
						color: '#51A1F9',
						count: 120,
						content: [
							'消息通知已开通，请各位准时参加消息通知已开通，请各位准时参加消息通知已开通，请各位准时参加消息通知已开通，请各位准时参加'
						]
					},
					{
						name: '工作提醒',
						iconName: 'tixing',
						path: '',
						color: '#34CAD6',
						count: 2,
						content: [
							'本周一全体员工到东区会议室开会，记得准时参加'
						]
					},
					{
						name: '审批提醒',
						iconName: 'shenpi',
						path: '',
						color: '#FF8E8E',
						count: 10,
						content: [
							'消息通知已开通，请各位准时参加消息通知已开通，请各位准时参加消息通知已开通，请各位准时参加消息通知已开通，请各位准时参加'
						]
					},
					{
						name: '日志提醒',
						iconName: 'rizhi',
						path: '',
						color: '#75C2F4',
						count: 15,
						content: [
							'上次登陆时间2020.01.01，14：00'
						]
					},
					{
						name: '任务通知',
						iconName: 'renwu1',
						path: '',
						color: '#6FCA6C',
						count: 0,
						content: [
							'您有新的审批任务待处理'
						]
					}
				]				
			};
		},	
		computed:{
			...mapGetters([
				'userToken',
				'forcedLogin', 
				'hasLogin', 
				'userName'
			]),
			scrollHeight(){
            	let height = this.pHeight - 84
            	return `${height}px`
        	}
		},
		watch: {
			userToken: {
				handler(newValue, oldValue){
					// debugger
					if(newValue){
						this.refreshPage()
					}
				},
				immediate: true
			}
		},
		async onLoad () {
			//#ifdef MP-WEIXIN
			this.$bus.$on("emitRefreshPage", () => {
				// debugger
				// this.refreshPage()
			})
			//#endif			
			// debugger
			console.log("find页面------------onload")
			console.log("-------find首页检查是否登陆成功----",await this.getLoginStatus())
			// 判断是否已经授权
			//#ifdef MP-WEIXIN
			console.log("----------------find首页检查是否用户授权了userInfo--------", await this.getAuthorizeStatus('scope.userInfo'))
			console.log("----------------find首页检查是否用户授权了userLocation--------", await this.getAuthorizeStatus('scope.userLocation'))
			//#endif
			
		},
		onShow(){
			console.log("find页面-----------------onShow")
		},	
		onReady(){
			console.log("find页面-----------------onReady")		
		},
		onHide () {
			this.$bus.$off("emitRefreshPage")			
		},	
		onTabItemTap(){
			console.log("find页面-----------onTabItemTap----")
		},
		methods:{		
			async onComLoad () {
				// debugger
				console.log("find --------onComLoad")
				// find 首页 判断 用户是否授权userinfo 信息
				// #ifdef MP-WEIXIN
				let isAuthorize = await this.getAuthorizeStatus("scope.userInfo")
				console.log("find --------onComLoad--获取到的用户信息授权状态----", isAuthorize)
				// 将授权状态存入 store 中
				this.$store.dispatch("setAuthorizeState", {authorizeState: isAuthorize})
				//#endif
				
				//#ifdef H5 || APP-PLUS
				// 判断是否登陆
				if(!this.userToken){
					this.getDeviceApi().showModal({
						title: '未登录',
						content: '您未登录，需要登录后才能继续',
						/**
						 * 如果需要强制登录，不显示取消按钮
						 */
						showCancel: !this.forcedLogin,
						success: (res) => {
							if (res.confirm) {
								/**
								 * 如果需要强制登录，使用reLaunch方式
								 */
								if (this.forcedLogin) {
									// this.reLaunchPage("../login/login");
								} else {
									this.navigatePage("../amos-login/login");
								}
							}else {
								// 取消
							}
						}
					})				
				}	
				//#endif
			},	
			refreshPage() {
				// debugger
			},
			// 下拉刷新
			downRefreshPage(page, mescroll){
				debugger
				if(mescroll){
					console.log("下拉刷新")	
					mescroll.endSuccess(10, false)				
				}
			},
			// 上拉加载
			upRefreshPage(page, mescroll){
				debugger
				if(mescroll){
					console.log("上拉刷新")	
					mescroll.endSuccess(1)						
				}
			},
			inputFocus(){
				debugger
				let resUrl = this.$findPageUrl("searchHistory")
				this.togoPage( resUrl, {}, 'navigate')
			},		
			//执行搜索
			doSearch(keyword) {
				debugger
				// keyword = keyword===false?this.keyword:keyword;
				// this.keyword = keyword;
				// this.saveKeyword(keyword); //保存为历史 
				// uni.showToast({
				// 	title: keyword,
				// 	icon: 'none',
				// 	duration: 2000
				// });
				//以下是示例跳转淘宝搜索，可自己实现搜索逻辑
				/*
				//#ifdef APP-PLUS
				plus.runtime.openURL(encodeURI('taobao://s.taobao.com/search?q=' + keyword));
				//#endif
				//#ifdef H5
				window.location.href = 'taobao://s.taobao.com/search?q=' + keyword
				//#endif
				*/

				let resUrl = this.$findPageUrl("searchHistory")
				this.togoPage( resUrl, {}, 'navigate')				
			},					
		}
	}
</script>
