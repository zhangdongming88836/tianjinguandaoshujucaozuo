import request from '@/api/request'; 
 
//生成报告获取列表数据
export function projectAcceptanceInformationList(data){
    return request({
        url: '/fad/statistical/project-acceptance-information/list',
        method: 'post',
        data: data,
    })
}
//生成报告添加数据
export function projectAcceptanceInformationSave(data){
    return request({
        url: '/fad/statistical/project-acceptance-information/save',
        method: 'post',
        data: data,
    })
}
//生成报告单个或多个删除数据
export function projectAcceptanceInformationRemove(data){
    return request({
        url: '/fad/statistical/project-acceptance-information/remove',
        method: 'post',
        data: data,
    })
}
//生成报告编辑数据
export function projectAcceptanceInformationUpdate(data){
    return request({
        url: `/fad/statistical/project-acceptance-information/update`,
        method: 'post',
        data:data
    })
}
//生成报告查看数据
export function projectAcceptanceInformationDetails(data){
    return request({
        url: `/fad/statistical/project-acceptance-information/details/${data}`,
        method: 'get',
    })
}
//获取下拉工程名字
export function projectAcceptanceInformationzjProject(data){
    return request({
        url: `/fad/statistical/project-acceptance-information/zjProject`,
        method: 'get',
        data
    })
}
//下载附件和打包下载
export function projectAcceptanceInformationDownload(data){
    return request({
        url: `/fad/statistical/project-acceptance-information/download/${data}`,
        method: 'get',
        responseType: 'arraybuffer'
    })
}

