import request from '@/api/request'; 
/********************查询与统计************************ */
//管线数据获取
export function queryStatisticsseaPipe(data){
    return request({
        url: `/fad/statistical/query-statistics/seaPipe`,
        method: 'get',
    })
}
//数据表数据获取
export function queryStatisticsReportInfo(data){
    return request({
        url: `/fad/statistical/query-statistics/reportInfo`,
        method: 'post',
        data
    })
}
//根据数据表查询待选列
export function queryStatisticsreportData(data){
    return request({
        url: `/fad/statistical/query-statistics/reportData`,
        method: 'post',
        data
    })
}
//生成报表
export function queryStatisticsgetReport(data){
    return request({
        url: `/fad/statistical/query-statistics/getReport`,
        method: 'post',
        data
    })
}
//导出报表
export function queryStatisticsgetdownReport(data){
    return request({
        url: `/fad/statistical/query-statistics/downReport`,
        method: 'post',
    //      headers: {
    //  'Content-Type': "application/json;charset=utf-8"
    //  },
     responseType: 'arraybuffer',
        data
    })
}
// headers: {
//     'Content-Type': "application/json;charset=utf-8"
//     },
//     responseType:'bolb',
// responseType: 'arraybuffer',
