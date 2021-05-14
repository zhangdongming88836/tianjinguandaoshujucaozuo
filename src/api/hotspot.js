import request from '@/api/request'; 
 
//热点获取列表数据
export function hotSpotList(data) {
    return request({
        url: '/fad/statistical/hot-spot/list',
        method: 'post',
        data: data,
    })
}
//热点添加数据
export function hotSpotsave(data) {
    return request({
        url: '/fad/statistical/hot-spot/save',
        method: 'post',
        data: data,
    })
}
//热点单个或多个删除数据
export function hotSpotremove(data) {
    return request({
        url: '/fad/statistical/hot-spot/remove',
        method: 'post',
        data: data,
    })
}
//编辑数据
export function hotSpotupdate(data) {
    return request({
        url: `/fad/statistical/hot-spot/update`,
        method: 'post',
        data:data
    })
}
//查看数据
export function hotSpotdetails(data) {
    return request({
        url: `/fad/statistical/hot-spot/details/${data}`,
        method: 'get',
    })
}