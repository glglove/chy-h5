
import http from '@/utils/http'

export default {
	/*
	*
    * @param {*} param 查询 所有课程列表信息
    * @param {} loading  是否显示loading
	* @param {} loadingText  loading 的文字
	* 
	*/
	async StartList (params = {}, loading = false, loadingText = "加载中...") {
		// debugger
	   const url = `/WorkFlow`;
	   var data = {
			Method: 'StartList'
	   }
	   params = Object.assign(data, params)
	   return http.post( url,{
			...params
	   },{
		   loading,
		   loadingText
	   })
	},				
}
