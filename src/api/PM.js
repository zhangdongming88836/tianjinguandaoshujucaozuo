import request from '@/api/request'; 
/************************项目管理*********************** */
//获取查询获取列表数据
export function projectInformationList(data) {
    return request({
        url: `/fad/statistical/project-information/list`,
        method: 'post',
        data
    })
}
//获取获取公司数据下拉查询的
export function projectInformationcompany(data) {
    return request({
        url: `/fad/statistical/project-information/company`,
        method: 'get',
        data
    })
}
//获取作业区数据下拉查询的
export function projectInformationworkArea(data) {
    return request({
        url: `/fad/statistical/project-information/workArea/${data}`,
        method: 'get',
        
    })
}
//获取项目数据下拉查询的
export function projectInformationproject(data) {
    return request({
        url: `/fad/statistical/project-information/project/${data}`,
        method: 'get',
        
    })
}
//添加项目管理
export function projectInformationsave(data) {
    return request({
        url: `/fad/statistical/project-information/save`,
        method: 'post',
        data
    })
}
//删除或多个删除项目管理
export function projectInformationremove(data) {
    return request({
        url: `/fad/statistical/project-information/remove`,
        method: 'post',
        data
    })
}
//根据id查看项目管理
export function projectInformationdetails(data) {
    return request({
        url: `/fad/statistical/project-information/details/${data}`,
        method: 'get',
        
    })
}
//编辑项目管理
export function projectInformationupdate(data) {
    return request({
        url: `/fad/statistical/project-information/update`,
        method: 'post',
        data
    })
}
//添加后
export function projectInformasaveAfter(data) {
    return request({
        url: `/fad/statistical/project-information/saveAfter`,
        method: 'post',
        data
    })
}
//项目管理删除后执行
export function acceptanceReportremoveAfter(data){
    return request({
        url: `/fad/statistical/project-information/removeAfter`,
        method: 'post',
        data
    })
}
//项目管理修改后执行
export function acceptanceReportreupdateAfter(data){
    return request({
        url: `/fad/statistical/project-information/updateAfter`,
        method: 'post',
        data
    })
}