import request from '@/api/request';
import { post } from 'jquery';
/***************************文档数据管理************************************************ */
//查找报表地址
export function selectUrl(data) {
    return request({
        url: `/fad/dreport/report-base-url-info/selectUrl/${data}`,
        method: 'get',
    })
}
//下拉框-获取项目名称
export function selectProjectName() {
    return request({
        url: `/fad/dreport/directory-table/selectProjectName`,
        method: 'get',
    })
}
//下拉框-获取管线名称
export function selectSubmarinePipelineName(data) {
    return request({
        url: `/fad/dreport/directory-table/selectSubmarinePipelineName`,
        method: 'get',
        data
    })
}
//下拉框-获取KP值
export function selectKPValue(data) {
    return request({
        url: `/fad/dreport/directory-table/selectKPValue`,
        method: 'get',
        data
    })
}
//模糊查询KP值
export function selectKPValueByLike(data) {
    return request({
        url: `/fad/dreport/directory-table/selectKPValueByLike`,
        method: 'post',
        data
    })
}
//下拉框-获取焊口号
export function selectWeldJointNumber(data) {
    return request({
        url: `/fad/dreport/directory-table/selectWeldJointNumber`,
        method: 'post',
        data
    })
}
//下拉框-获取管号
export function selectPipeNo(data) {
    return request({
        url: `/fad/dreport/directory-table/selectPipeNo`,
        method: 'post',
        data
    })
}
//下拉框-查询数据表
export function selectDataTable(data) {
    return request({
        url: `/fad/dreport/directory-table/selectDataTable?parentId=${data.parentId}`,
        method: 'get',
    })
}
//获取文件地址
export function selectFileUrl(data) {
    return request({
        url: `/fad/dreport/report-data/selectFileUrl`,
        method: 'post',
        data
    })
}
//查询表信息
export function selectTableInfo(data) {
    return request({
        url: `/fad/dreport/report-data/selectTableInfo`,
        method: 'post',
        data
    })
}
//关联文档
export function update(data) {
    return request({
        url: `/fad/dreport/report-data/update`,
        method: 'post',
        data
    })
}
//获取文档信息列表
export function selectDocumentsInfo(data) {
    return request({
        url: `/fad/dreport/report-data/selectDocumentsInfo`,
        method: 'post',
        data
    })
}
//编辑获取文档信息列表
export function selectAllDocumentsInfo(data) {
    return request({
        url: `/fad/dreport/report-data/selectAllDocumentsInfo`,
        method: 'post',
        data
    })
}
//多文件下载
export function downLoadFiles(data) {
    return request({
        url: `/fad/dreport/report-data/downLoadFiles/${data}`,
        method: 'get',
    })
}

export function downReport(data) {
    return request({
        url: '/fad/dreport/report-data/downReport',
        method: 'post',
        data
    })
}
