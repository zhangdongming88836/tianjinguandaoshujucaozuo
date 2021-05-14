import request from '@/api/request'; 
/**********************海管********************** */
//获取查询获取列表数据
export function statisticalseasipeList(data) {
    return request({
        url: `/fad/statistical/sea-pipe/list`,
        method: 'post',
        data
    })
}
//删除和多个删除列表数据
export function statisticalseasiperemove(data) {
    return request({
        url: `/fad/statistical/sea-pipe/remove`,
        method: 'post',
        data
    })
}
//id查
export function statisticalseasipdetails(data) {
    return request({
        url: `/fad/statistical/sea-pipe/details/${data}`,
        method: 'get',
    })
}
//添加
export function statisticalseasipsave(data) {
    return request({
        url: `/fad/statistical/sea-pipe/save`,
        method: 'post',
        data
    })
}
//修改
export function statisticalseasiupdate(data) {
    return request({
        url: `/fad/statistical/sea-pipe/update`,
        method: 'post',
        data
    })
}
//查询的获取获取所属项目下拉
export function statisticalseasiprojectAll(data) {
    return request({
        url: `/fad/statistical/project-information/projectAll`,
        method: 'post',
        data
    })
}
//新增模块里的所属公司下拉
export function statisticalseasipcompany(data) {
    return request({
        url: `/fad/statistical/project-information/company`,
        method: 'get',
    })
}
//新增模块里的通过公司id获取作业区下拉
export function statisticalseasipworkArea(data) {
    return request({
        url: `/fad/statistical/project-information/workArea/${data}`,
        method: 'get',
    })
}
//新增模块里的通过作业区id获取所属项目下拉
export function statisticalseasipproject(data) {
    return request({
        url: `/fad/statistical/project-information/project/${data}`,
        method: 'get',
    })
}