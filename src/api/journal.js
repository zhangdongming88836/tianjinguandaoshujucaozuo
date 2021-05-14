import request from '@/api/request'; 
//系统日志查看数据
export function sysLogList(data){
    return request({
        url: `/fad/statistical/sys-log/list`,
        method: 'post',
        data
    })
}
//系统日志查询数据
export function sysLogDetails(data){
    return request({
        url: `/fad/statistical/sys-log/details/${data}`,
        method: 'get',
    })
}
