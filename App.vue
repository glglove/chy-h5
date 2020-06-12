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
	/*每个页面公共css */
    /* #ifndef APP-PLUS-NVUE */
    /* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './assets/css/uni.css';	
	@import "./assets/css/index.css";
	@import "uview-ui/index.scss"
	/*#endif*/
</style>
