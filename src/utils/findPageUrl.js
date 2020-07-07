export  default function findPageUrl(pageStr){
    switch(pageStr){
        // 登录页面
        case 'login':
            // return '/pages/login/login'
            return '/pages/amos-login/login'
        // 搜索历史记录
        case 'searchHistory':
            return '/pages/packageA/find/searchHistory/searchHistory'            
        // 考勤页面
        case '/checkWork':
            return '/pages/packageA/sign/checkWork/checkWork'
        // 员工页面
        case '/employee':
            return '/pages/packageA/sign/employee/employee'            
        // 社保页面
        case '/socialSecurity':
            return '/pages/packageA/sign/socialSecurity/socialSecurity'            
        // 平台页面
        case '/platform':
            return '/pages/packageA/sign/platform/platform'                        
        // 公告页面
        case '/notice':
            return '/pages/packageA/sign/notice/notice'              
        // 管理页面
        case '/manage':
            return '/pages/packageA/sign/manage/manage'  
        // 审批页面
        case '/approvalFlow':
            return '/pages/packageA/sign/approvalFlow/approvalFlow' 
        // 我发起的页面
        case 'myStart':
            return '/pages/packageA/sign/approvalFlow/myStart/myStart'                                   
        // 在途页面
        case 'onTheWay':
            return '/pages/packageA/sign/approvalFlow/onTheWay/onTheWay'       
        // 我关注的页面
        case 'myFollow':
            return '/pages/packageA/sign/approvalFlow/myFollow/myFollow'                                                         
        // 我挂起的页面
        case 'myPending':
            return '/pages/packageA/sign/approvalFlow/myPending/myPending'                                                                     
        // 发起审批页面
        case 'startLaunch':
            return '/pages/packageA/sign/approvalFlow/startLaunch/startLaunch'                                                                                 
        // 待办审批页面
        case 'waitLaunch':
            return '/pages/packageA/sign/approvalFlow/waitLaunch/waitLaunch'                                                                                             
        // 抄送给我的页面
        case 'copyToMe':
            return '/pages/packageA/sign/approvalFlow/copyToMe/copyToMe'                                                                                                         


    }
} 