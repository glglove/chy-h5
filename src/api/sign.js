
import http from '@/utils/http'
import base from './base'
	/*
	*
    * @param {*} param 
    * @param {} loading  是否显示loading
	* @param {} loadingText  loading 的文字
	* 
	*/
	export function StartList (params = {}, loading = false, loadingText = "加载中...") {
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
	}			
