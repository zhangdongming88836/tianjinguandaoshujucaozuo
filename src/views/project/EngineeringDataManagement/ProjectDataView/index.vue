<template>
  <div id="ProjectNumberview">
   <div style="padding: 25px; ">
            <div class="modle">
            <template>
              <table id="customers">
                <tr>
                  <th v-for="afg in titles" :key="afg">{{afg}}</th>
                </tr>
                <tr v-for="(item,index) in tableData" :key="index" @click="ClickDisplay(index+1)">
                  <td v-for="items in item" :key="items" >{{items}}</td>
                </tr>
              </table>
            </template>
          </div>
  </div>      
  </div>
</template>>
<script>
import {selectFileUrl,selectDocumentsInfo,update,selectTableInfo} from"@/api/QueryAndStatisticss"
export default {
    props:['ViewEngineeringDocuments','reportCode','GprojectName'],
    data(){
        return {
       GprojectName:"", 
         reportCode:"",
         //传给父组件的行数
         row:0,
      //公共表头
      titles: [
        { lable: '序号', field: 'code' },
        { lable: '平台名称', field: 'platformName' },
        { lable: '网址链接', field: 'link' },
        { lable: '创建人', field: 'createByName' },
        { lable: '创建时间', field: 'createTime' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //公共表格内容
      tableData: [
        {
          platformName: 'djak',
          link: '454545',
          createByName: 'dasd',
        },
      ],
    }
    },
    methods:{
       //点击显示下载的关联文件
    ClickDisplay(val){
     console.log( val,"当前行树")
     this.$emit("GJViewAndCloseEngineeringDocuments", true)
     this.$emit("GJGetheumberfows",val)
    },
      //   open(){
         
      //  },
      //  close(){
      //      this.$emit("ViewAndCloseEngineeringDocuments",false)
      //  }
    },
     watch:{
      GprojectName:{
      immediate: true,
      deep: true,
        handler(val){
         this.GprojectName = val 
        }
      },
        reportCode:{
      immediate: true,
      deep: true,
        handler(val){
         this.reportCode = val 
        }
      },
    },
     created(){
      let obj = {
        projectId: this.GprojectName,
        reportCode: this.reportCode,
      }
      selectTableInfo(obj).then(res => {
        console.log(res)
        this.titles = res.data.data.heads
        this.tableData = res.data.data.rows
      })
 }
}
</script>
<style lang="scss">
#ProjectNumberview{
   .centebt{
    width: 842px;
    margin: 0 auto;
	border: solid 1px #cccccc;
   } 
   .ProjectViewLayout{
       display: flex;
       flex-direction:row;
       justify-content: flex-start;
   }
   .titlea{
     width: 140px;
     height: 60px;
     text-align: center;
     line-height: 60px;
     color: #333333;
     border-bottom:solid 1px #cccccc;
	background-color: #f6f6f6; 
   }
   .GetMessage{
       width: 281px;
       height: 60px;
       padding-left:10px;
       line-height: 60px;
       border-bottom:solid 1px #cccccc;
   }
   .titlead{
     width: 156px;
     height: 60px;
     text-align: center;
     line-height: 60px;
     color: #333333;
     border-bottom:solid 1px #cccccc;
	background-color: #f6f6f6; 
   }
   .GetMessager{
       width: 95%;
       height: 60px;
       padding-left:10px;
       line-height: 60px;
       border-bottom:solid 1px #cccccc; 
   }
   .ove{
       overflow-y: hidden;
   }
   /************************************ */
  .el-transfer-panel {
    width: 220px !important;
    height: 435px !important;
  }
  .el-transfer-panel__list.is-filterable {
    height: 200px;
  }
  .el-dialog__header {
    background-color: #0075cb;
  }
  .el-dialog__title {
    margin-left: -90% !important;
    width: 32px;
    height: 22px;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .el-icon-close:before {
    color: #e4e4e4;
  }
   #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 30px;
  }

  #customers td,
  #customers th {
    border: 1px solid #dcdcdc;
    text-align: center;
    padding: 8px;
    font-family: PingFang SC;
    font-weight: normal;
    font-stretch: normal;
    color: #666666;
  }

  #customers tr:nth-child(even) {
    background-color: #f6f6f6;
  }

  #customers tr:hover {
    background-color: #ddd;
  }

  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #ecf5ff;
    font-family: PingFang SC;
    font-weight: 600;
    font-stretch: normal;
    text-align: center;
    color: #333333;
  }
}
</style>