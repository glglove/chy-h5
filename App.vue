<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss" rel="stylesheet/stylus">
	@import "./assets/css/my-iconfont.css"; // 一定要放在 所有样式引入的最前面
	/**H5 端 nprogress 进度条 颜色设置*/
	#nprogress .bar {
      background: #00AEEF !important; //自定义颜色
    }
	/*每个页面公共css */
    /* #ifndef APP-PLUS-NVUE */
    /* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './assets/css/uni.css';	
	@import "./assets/css/index.css";
	@import "uview-ui/index.scss"
	/*#endif*/
</style>
