<template>
  <div id="EngineeringEditorfs">
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
    <!-- <el-dialog title="查看关联报表" :visible.sync="ProjectDocumentEditOpen" width="60%" center @open="open" @close="close">
      <div style="padding: 25px">
        <table class="customers">
          <tr>
            <th v-for="item in titles" :key="item.id">{{ item }}</th>
          </tr>
          <tr v-for="items in tableData" :key="items.id">
            <td v-for="itear in items" :key="itear.id">{{ itear }}</td>
          </tr>
        </table>
      </div>
      <div style="width: 100%; border: 1px solid #cccccc"></div>
      <div style="height: 10px"></div>
      <div class="lkjh">
        <el-button @click="ProjectDocumentEditOpen = false">取 消</el-button>
        <el-button type="primary" @click="ProjectDocumentEditOpen = false">确 定</el-button>
      </div>
      <div style="height: 10px"></div>
    </el-dialog> -->
  </div>
</div>
</template>
<script>
import {selectFileUrl,selectDocumentsInfo,update,selectTableInfo} from"@/api/QueryAndStatisticss"
export default {
  props: ['ProjectDocumentEditOpen','reportCode','GprojectName'],
  data() {
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
         
        },
      ],
    }
  },
  methods: {
    //点击显示关联文件
    ClickDisplay(val){
      // console.log( val)
     this.$emit("EngineeringDocumentEditClose", true)
     this.$emit("Getheumberfows",val)
    },
    // open() {
    //   let obj = {
    //     projectId:this.GprojectName,
    //     reportCode:this.reportCode
    //   }
    // selectTableInfo(obj).then(res=>{
    //   console.log(res)
    // })
    // },
    // close() {
    //   this.$emit('EngineeringDocumentEditClose', false)
    // },
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
#EngineeringEditorfs {
  /******************************* */
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
    margin-left: -91% !important;
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
  .el-dialog--center .el-dialog__body {
    padding: 0px !important;
  }
  .lkjh {
    text-align: right;
    margin-right: 20px;
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