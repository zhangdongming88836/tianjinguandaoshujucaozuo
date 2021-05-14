import request from '@/api/request'; 
 /*************************工程文档管理********************************/ 
 /*********************************左侧树api**************************************** */
//获取文档树
export function directoryTableEosOrg(data) {
    return request({
        url: `/fad/statistical/directory-table/eosOrg/${data}`,
        method: 'get',
    })
}
//文档树新建
export function directoryTableSave(data) {
    return request({
        url: `/fad/statistical/directory-table/save`,
        method: 'post',
        data
    })
}
//文档查看
export function directoryTabledetails(data) {
    return request({
        url: `/fad/statistical/directory-table/details/${data}`,
        method: 'get',
        
    })
}
//文档编辑
export function directoryTableupdate(data) {
    return request({
        url: `/fad/statistical/directory-table/update`,
        method: 'post',
        data
    })
}
//文档删除
export function directoryTableremove(data) {
    return request({
        url: `/fad/statistical/directory-table/remove/${data}`,
        method: 'get',
        
    })
}
/************************右侧列表api******************************************** */
//列表查询
export function engineeringDocumentsInformationIist(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/list`,
        method: 'post',
        data
    })
}
//工程文档添加
export function engineeringDocumentsInformationsave(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/save`,
        method: 'post',
        data
    })
}
//工程文档添加前判断
export function engineeringDocumentsInformationtoSave(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/toSave`,
        method: 'post',
        data
    })
}
//工程文档单个或多个删除
export function engineeringDocumentsInformationtoremove(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/remove`,
        method: 'post',
        data
    })
}
//根据ID查询工程文档详情
export function engineeringDocumentsInformationtodetails(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/details/${data}`,
        method: 'get',
    })
}
//批量修改
export function engineeringDocumentsInformationtobatEdit(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/batEdit`,
        method: 'post',
        data
    })
}
//导出
export function engineeringDocumentsInformationtoexport(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/export/${data.type}/${data.id}`,
        method: 'get',
        responseType: 'arraybuffer'
    })
}
//导入
export function engineeringDocumentsInformationimportEDI(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/importEDI`,
        method: 'post',
        data
    })
}
//导入前判断
export function engineeringDocumentsInformationtoImportEDI(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/toImportEDI`,
        method: 'post',
        data
    })
}
//工程文档修改前判断
export function engineeringDocumentsInformationtoUpdate(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/toUpdate`,
        method: 'post',
        data
    })
}
//工程文档编辑
export function engineeringDocumentsInformationupdate(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/update`,
        method: 'post',
        data
    })
}
//查询前获取版本号、承包商、合同编号字典数据
export function engineeringDocumentsInformationdict(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/dict`,
        method: 'get',
    })
}
//批量修改前操作
export function engineeringDocumentsInformationtoBatEdit(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/toBatEdit`,
        method: 'post',
        data
    })
}
//批量修改
export function engineeringDocumentsInformationbatEdit(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/batEdit`,
        method: 'post',
        data
    })
}
//工程文档批量修改前判断
export function engineeringDocumentsInformatipdBatEdit(data) {
    return request({
        url: `/fad/statistical/engineering-documents-information/pdBatEdit`,
        method: 'post',
        data
    })
}
