
import http from '@/utils/http'

/*
* 
* @param {*} Method 
* @param {} loading  是否显示loading
* @param {} loadingText  loading 的文字
* 
*/
export async function StartList (params = {}, loading = false, loadingText = "加载中...") {
    // debugger
    const url = `/API/Account`;
    var data = {
        Module: 'commApi',
		Method: 'logon',
		UserName: '',
		pwd: '',
		appId: '',
		appKey: ''
    }
    params = Object.assign(data, params)
    return http.post( url,{
        ...params
    },{
        loading,
        loadingText
    })
}	
