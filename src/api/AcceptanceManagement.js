import request from '@/api/request'; 
 
//管理报告获取列表数据
export function acceptanceReportList(data){
    return request({
        url: '/fad/statistical/acceptance-report/list',
        method: 'post',
        data: data,
    })
}
//管理报告添加数据
export function acceptanceReportSave(data){
    return request({
        url: '/fad/statistical/acceptance-report/save',
        method: 'post',
        data: data,
    })
}
//管理报告单个或多个删除数据
export function acceptanceReportRemove(data){
    return request({
        url: '/fad/statistical/acceptance-report/remove',
        method: 'post',
        data: data,
    })
}
//管理报告编辑数据
export function acceptanceReportUpdate(data){
    return request({
        url: `/fad/statistical/acceptance-report/update`,
        method: 'post',
        data:data
    })
}
//管理报告查看数据
export function acceptanceReportDetails(data){
    return request({
        url: `/fad/statistical/acceptance-report/details/${data}`,
        method: 'get',
    })
}
//获取下拉项目名字
export function acceptanceReportProject(data){
    return request({
        url: `/fad/statistical/acceptance-report/project`,
        method: 'get',
        data
    })
}
//下载附件和打包下载
export function acceptanceReportDownload(data){
    return request({
        url: `/fad/statistical/acceptance-report/download/${data}`,
        method: 'get',
        responseType: 'arraybuffer'
    })
}
