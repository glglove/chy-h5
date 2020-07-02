
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
    const url = `/WorkFlow`;
    var data = {
        Module: 'workFlow',
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


/**
 * 52.发起
 * @param no 流程编号
 */
export async function start (params = {}, loading = false, loadingText = "加载中...") {
    // debugger
    const url = `/WorkFlow`;
    var data = {
        Module: 'workFlow',
        Method: 'Start',
        no: ''
    }
    params = Object.assign(data, params)
    return http.post( url,{
        ...params
    },{
        loading,
        loadingText
    })
}

/**
 * 56.保存主表值
 * @param no 流程编号
 * @param nodeId 节点Id，开始节点Id是流程编号no+001
 * @param workId 工作id
 * @param mainValue 主表值，json格式
 */
export async function saveMainValue (params = {}, loading = false, loadingText = "加载中...") {
    // debugger
    const url = `/WorkFlow`;
    var data = {
        Module: 'workFlow',
        Method: 'SaveMainValue',
        no: '',
        nodeId:'',
        workId:'',
        mainValue:''
    }
    params = Object.assign(data, params)
    return http.post( url,{
        ...params
    },{
        loading,
        loadingText
    })
}

/**
 * 56.保存明细值
 * @param no 流程编号
 * @param nodeId 节点Id，开始节点Id是流程编号no+001
 * @param workId 工作id
 * @param mainValue 明细表值，json格式
 */

export async function saveDetailValue (params = {}, loading = false, loadingText = "加载中...") {
    // debugger
    const url = `/WorkFlow`;
    var data = {
        Module: 'workFlow',
        Method: 'SaveDetailValue',
        no: '',
        nodeId:'',
        workId:'',
        detailValue:''
    }
    params = Object.assign(data, params)
    return http.post( url,{
        ...params
    },{
        loading,
        loadingText
    })
} 
  

/*
*  * 62.查看表单
 * @param no 流程编号
 * @param workId 工作id
 * @param nodeId 节点id
 * @param roleRange 权限
* @param {*} Method 
* @param {} loading  是否显示loading
* @param {} loadingText  loading 的文字
* 
*/
export async function getForm (params = {}, loading = false, loadingText = "加载中...") {
    // debugger
    const url = `/WorkFlow`;
    var data = {
        Module: 'workFlow',
        Method: 'GetForm',
        no: '',
        workId: '',
        nodeId: '',
        roleRange: 0
    }
    params = Object.assign(data, params)
    return http.post( url,{
        ...params
    },{
        loading,
        loadingText
    })
}


/**
 * 保存工作实例
 * @param no 流程编号
 * @param nodeId 工作id
 * @param workId 节点id
 */
export async function saveWork (params = {}, loading = false, loadingText = "加载中...") {
    // debugger
    const url = `/WorkFlow`;
    var data = {
        Module: 'workFlow',
        Method: 'SaveWork',
        no: '',
        workId: '',
        nodeId: '',
    }
    params = Object.assign(data, params)
    return http.post( url,{
        ...params
    },{
        loading,
        loadingText
    })
}

/**
 * 59.发送/同意
 * @param no 流程编号
 * @param workId 工作id
 * @param nodeId 节点id
 * @param opinion 审批意见
 */
export async function send (params = {}, loading = false, loadingText = "加载中...") {
    // debugger
    const url = `/WorkFlow`;
    var data = {
        Module: 'workFlow',
        Method: 'Send',
        no: '',
        workId: '',
        nodeId: '',
        opinion:''
    }
    params = Object.assign(data, params)
    return http.post( url,{
        ...params
    },{
        loading,
        loadingText
    })
}


/**
 * 获取待办列表
 * @param obj 查询对象
 */
export async function todolist (params = {}, loading = false, loadingText = "加载中...") {
    // debugger
    const url = `/WorkFlow`;
    var data = {
        Module: 'workFlow',
        Method: 'Todolist',
        key: '',
        no: '',
        flowSortNo: '',
        dept: '',
        starter: '',
        days: '',
        begin: '',
        end: '',
        wfState: -1,
        taskSta: '',
        pageSize: 10,
        pageNum: 1
    }
    params = Object.assign(data, params)
    return http.post( url,{
        ...params
    },{
        loading,
        loadingText
    })
}