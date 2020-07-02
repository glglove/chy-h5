
import http from '@/utils/http'
import md5Libs from "uview-ui/libs/function/md5"

/*
* 
* @param {*} Method 
* @param {} loading  是否显示loading
* @param {} loadingText  loading 的文字
* 
*/
export async function loginByUsername (params = {}, loading = false, loadingText = "加载中...") {
    // debugger
    const url = `/API/Account`;
    var data = {
        // Module: 'commApi',
		Method: 'logon',
		companyCode: '',
		UserName: '',
		pwd: '',
    }
    params = Object.assign(data, params)
    // 将pwd 进行 md5 加密
    params.pwd = md5Libs.md5(`${params.pwd}`)
    return http.post( url,{
        ...params
    },{
        loading,
        loadingText
    })
}