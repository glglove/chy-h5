<style lang="less" scoped>
	uni-page-body {
		height: 100%
	}
	#findBox{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		.find-hasLogin {
			height: 100%;
			width: 100%;
			.bgBox{
				width: 100%;
				height: 100%;
				.bgpic{
					width: 100%;
				}
			}			
			.contentBox{
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				z-index: 1;
				overflow-y: auto;
				.top {
					width: 650upx;
					height: 400upx;
					margin: 0 auto;
					.design {
						height: 70upx;
						font-size: 40upx;
						color: #ffffff;
						line-height: 70upx;					
					}
					.study {
						width: 400upx;
						height: 70upx;
						font-size: 40upx;
						color: #ffffff;
						line-height: 70upx;
					}
				}
				.findContainer{
					width: 650upx;
					height: 600upx;
					margin: 0 auto;
					border-radius: 20upx;
					padding: 30upx 95upx 0 95upx;
					box-sizing: border-box;
					border-radius: 10upx;
					border: 2upx solid rgba(250, 235, 228, 0.2);
					box-shadow: 0 12px 20upx rgba(252,195,165,0.2);	
					.contentTop {
						width: 462upx;
						height: 280upx;
						.contentTopLeft{
							width: 50%;
							height: 255upx;
							.signUpPicBox {
								width: 128upx;
								height: 128upx;
								border-radius: 50%;
								margin: 0 auto;
								padding: 0;
								.signUpPic{
									width: 100%;
								}
							}
							.signUpNum {
								width: 85upx;
								height: 67upx;
								margin: 0 auto;   
								text-align: center;                 
								.signDay {
									width: 50upx;
									height: 100%;
									color: #FA9960;
									line-height: 67upx;
									font-weight: 500;
									font-size: 48upx;
									text-align: center;
								}
								.signTotalDay {
									width: 36upx;
									height: 100%;
									color: #FA9B64;
									line-height: 67upx;
									text-align: center;
									font-size: 24upx;
								}
							}
							.signUpTit {
								// width: 120upx;
								height: 42upx;
								text-align: center;
								line-height: 42upx;
								color: #000000;
								font-size: 30upx;
								margin: 0 auto;
							}
						}
						.contentTopRight{
							width: 50%;
							height: 255upx;
							.rankPicBox {
								width: 128upx;
								height: 128upx;
								border-radius: 50%;
								margin: 0 auto;
								padding: 0;
								.signUpPic{
									width: 100%;
								}
							}
							.rankNum {
								width: 85upx;
								height: 67upx;
								margin: 0 auto;     
								text-align: center;               
								.rankNo {
									width: 50upx;
									height: 100%;
									color: #FA9960;
									line-height: 67upx;
									font-weight: 500;
									font-size: 48upx;
									text-align: center;
								}
							}
							.rankTit {
								width: 120upx;
								height: 42upx;
								text-align: center;
								line-height: 42upx;
								color: #000000;
								font-size: 30upx;
								margin: 0 auto;
							}                
						}
					}					
					.signUpBtn {
						width: 462upx;
						height: 99upx;
						line-height: 99upx;
						background-color: #FA9960;
						border-radius: 49.5upx;
						text-align: center;
						box-shadow: 2upx 2upx 5upx rgba(0,0,0,0.1);
						.signUpPic {
							width: 48upx;
							height: 48upx;
							vertical-align: middle;
							position: absolute;
							top: 50%;
							left: 30%;
							transform: translate(-50%,-50% );
						}
						.signUpTit {
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%,-50%);
							width: 141upx;
							color: #FFFFFF;
							font-size: 34upx;
							margin-left: 25upx;
						}
					}
					.invitationBtn {
						width: 462upx;
						height: 99upx;
						background-color: #FFFFFF;
						border-radius: 49.5upx;
						border: 2px dashed #FA9960;
						text-align: center;      
						color: #FA9960; 
						box-shadow: 2upx 2upx 5upx rgba(0,0,0,0.1);                 
						.invitationPic {
							width: 48upx;
							height: 48upx;
							vertical-align: middle;
							position: absolute;
							top: 50%;
							left: 30%;                
							transform: translate(-50%,-50% );                
						}
						.invitationTit {
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%,-50%);
							width: 141upx;
							height: 100%;
							font-size: 34upx;
							margin-left: 25upx;
						}
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
	<container>
		<view  id="findBox" class="page" slot="container-slot">
			<!--loading组件-->
			<!-- <Loading type="4"></Loading> -->
			<!-- bg.find_bg:{{bg.find_bg}} -->
			<!-- {{$configs.baseImgsUrl + $configs.baseUrlConfigs.imgs_bg.find_bg}} -->
			<!--loading-->
			<!--已登录-->
			<div v-if="!userToken" class="find-hasLogin">
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
							class="item" 
							v-for="(item, index) in toolList"
							:key="index">
							<div class="left" :style="{background: item.color}">
								<!-- <icon-svg :icon-class="item.img"></icon-svg> -->
							</div>
							<div class="right" :class="(index + 1) === toolList.length ? 'last' : ''">
							<div class="content-title">
								<span class="text">{{item.name}}</span>
								<span class="time">下午 4：00</span>
							</div>
							<div class="last-content">
								<span class="text">消息通知已开通，请各位准时参加,消息通知已开通，请各位准时参加</span>
								<span class="badge">
								<span>120</span>
								</span>
							</div>
							</div>
						</view>
					</view>
				</mescroll-uni>				
			</div>
			
			<!---未登录-->
			<view v-if="userToken" class="find-notLogin">
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
	import { mapGetters } from 'vuex'
	export default {
		mixins: [ miniProApi ],
        components: {
            // uniCard,
            // uniPagination,
			// FooterExplain
		},			
		data() {
			return {
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
				toolList: [
					{
						name: '消息通知',
						img: 'xiaoxi',
						path: '',
						color: '#51A1F9'
					},
					{
						name: '工作提醒',
						img: 'tixing',
						path: '',
						color: '#34CAD6'
					},
					{
						name: '审批提醒',
						img: 'shenpi',
						path: '',
						color: '#FF8E8E'
					},
					{
						name: '日志提醒',
						img: 'rizhi',
						path: '',
						color: '#75C2F4'
					},
					{
						name: '任务通知',
						img: 'renwu',
						path: '',
						color: '#6FCA6C'
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
				
				// 异步下载 首页的背景图片存入 缓存中 后续就不用再次加载
				if( !this.bg.find_bg ){
					uni.downloadFile({
						url: `${this.$configs.baseImgsUrl+this.$configs.baseUrlConfigs.imgs_bg.find_bg}`,
						success: (res) => {
							if(res.statusCode === 200 && res.tempFilePath){
								console.log("99999999999",res)
								// res.tempFilePath
								this.bg.find_bg = res.tempFilePath
								// uni.saveFile({
								// 	
								// }) 
							}
						},
						fail: (error) => {
								
						}
					})	
				}else {
					console.log("find首页背景图片已经下载过了")
				}
			},	
			refreshPage() {
				// debugger
				this._getRankDayData()
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
		}
	}
</script>
