<template>
  <div id="hotspot">
    <div class="QueryLayout">
      <div style="margin-left: 20px">
        <el-input placeholder="请输入平台名称" suffix-icon="el-icon-search" v-model="platformName" @input="InpuTchange"> </el-input>
      </div>
      <div style="margin-left: 15px">
        <el-button type="primary" @click="PublicAccessLisk">查询</el-button>
      </div>
      <div style="margin-left: 10px">
        <el-button @click="Reset" >重置</el-button>
      </div>
    </div>
    <div class="BatchLayout">
      <div style="margin-right: 10px">
        <el-button type="success" icon="el-icon-plus" @click="NewProjectmanagement">新增</el-button>
      </div>
      <div>
        <el-button type="danger" icon="el-icon-edit" @click="DeleteProjectmanagements">批量删除</el-button>
      </div>
    </div>
    <div class="TheFormIsOutOfOrder">
      <tables :titles="titles" :tableData="tableData" :total="total" :see="see" :pageSize="pageSize" :pageNum="pageNum" @page="page" @size="size"  @idArr="idArr">
        <template v-slot:status="data">
          <el-button type="text" size="mini" @click="ViewProjectManagement(data)">查看</el-button>
          <el-button type="text" size="mini" @click="ViewProjectManagements(data)">编辑</el-button>
          <el-button type="text" size="mini" @click="DeleteProjectmanagement(data)">删除</el-button>
        </template> 
      </tables>
    </div>
       <footers></footers>
     <NewHotSpots :ManagementNewOpenL.sync="ManagementNewOpenL" @ManagementAddClose="ManagementAddClose" @PublicAccessLisk="PublicAccessLisk"></NewHotSpots>
    <ViewHotSpots :ProjectManagementView.sync="ProjectManagementView" @ProjectManagementViewClose="ProjectManagementViewClose" :id="id"></ViewHotSpots>
    <HotEditing :ProjectManagementEditor.sync="ProjectManagementEditor" @ProjectManagementEditClose="ProjectManagementEditClose" :id="id" @PublicAccessLisk="PublicAccessLisk"></HotEditing>
  </div>
</template>
<script>
import footers from "../../components/footer/index"
import tables from '../../components/table/index';
import ViewHotSpots  from "./ViewHotSpots/index";
import NewHotSpots  from "./NewHotSpots/index";
import HotEditing  from "./HotEditing/index";
import {hotSpotList,hotSpotremove,hotSpotupdate} from "@/api/hotspot.js"
export default {
  components: {
    tables,
   ViewHotSpots,
   NewHotSpots,
   HotEditing,
   footers
  },
  data() {
    return {
      //平台名称
       platformName:"",
       id:"",
      /*************table组件****************** */
      //公共表头
      titles: [
        { lable: '序号', field: 'tid' },
        { lable: '平台名称', field: 'platformName' },
        { lable: '网址链接', field: 'link' },
        { lable: '创建人', field: 'createByName' },
        { lable: '创建时间', field: 'createTime' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //公共表格内容
      tableData: [
       {
         platformName:"djak",
         link:"454545",
         createByName:"dasd",
       }
      ],
      //当前页数
      pageNum: 1,
      //每也条数
      pageSize: 10,
      //总页数
      total: 0,
      //显示多选框
      see: true,
      //删除除数组
      ids: [],
      /*************************************** */
      /****************新增组件数据区域************************* */
       ManagementNewOpenL:false,
      /********************************************** */
      /****************查看组件数据区域************************* */
       ProjectManagementView:false,
      /********************************************** */
      /****************编辑组件数据区域************************* */
       ProjectManagementEditor:false,
      /********************************************** */
    }
  },
  methods:{
    /*************table的区域************ */
    //当前第几页
    page(val) {
       this.pageNum = val
           let obj = {
        platformName:this.platformName, 
        pageSize:this.pageSize,                      //this.pageSize,
        pageNum:val,
      }
    hotSpotList(obj).then( res => {
      console.log(res)
      this.tableData = res.data.rows
      this.total = res.data.total
        this.tableData = res.data.rows.map((item, index) => {
            item.tid =
              this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1;
            return item;
          });
    })
    },
    //每页多少条
    size(val){
      this.pageSize = val
      this.pageNum = 1
          let obj = {
        platformName:this.platformName, 
        pageSize:val,                      //this.pageSize,
        pageNum:this.pageNum,
      }
    hotSpotList(obj).then( res => {
      console.log(res)
      this.tableData = res.data.rows
      this.total = res.data.total
        this.tableData = res.data.rows.map((item, index) => {
            item.tid =
              this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1;
            return item;
          });
    })
    },
       //批量删除
    idArr(val) {
      //  console.log(val)
      this.ids = val
    },
    /******************************************** */
    /*//////////////////////弹窗新增组件方法区域//////////////////////////*/
    //开启组件
    NewProjectmanagement(){
     this.ManagementNewOpenL = true;
    },
    //接受组件关闭数据
    ManagementAddClose(val){
      this.ManagementNewOpenL = val
    },
    /*////////////////////////////////////////////////////////*/
    /********************查看*********************** */
    ViewProjectManagement(val){
     this.ProjectManagementView = true
     this.id = val.data.id
    },
    //接受查看关闭数据
    ProjectManagementViewClose(val){
      this.ProjectManagementView = val
    },
    /********************************************* */
    /********************编辑*********************** */
    ViewProjectManagements(val){
    this.ProjectManagementEditor = true
      this.id = val.data.id
    },
    ProjectManagementEditClose(val){
     this.ProjectManagementEditor = val
    },
    /********************************************* */
    /*******************删除******************** */
    DeleteProjectmanagement(val){
      this.ids.push(val.data.id)
         this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
              let obj ={
       ids:this.ids
      }
     hotSpotremove(obj).then( res=>{
           if( res.data.code == 200 ){
             this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
             this.PublicAccessLisk()
          }else{
             this.$message({
                message: `${res.data.msg}`,
                type: 'warning',
              })
          }
     })
        
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    //批量删除
    DeleteProjectmanagements(){
            this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
              let obj ={
       ids:this.ids
      }
     hotSpotremove(obj).then( res=>{
           if( res.data.code == 200 ){
             this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
             this.PublicAccessLisk()
          }else{
             this.$message({
                message: `${res.data.msg}`,
                type: 'warning',
              })
          }
     })
        
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    /*************************************** */
    /*****************重置***************** */
    Reset(){
     this.platformName =''
     this.PublicAccessLisk()
    },
    /************************************* */
    /******************input值改变查询**************** */
    InpuTchange(val){
      if(val == ""){
        this.PublicAccessLisk();
      }
    },
    /****************************** */
    /******************公共查询获取列表******************* */
    PublicAccessLisk(){
      this.pageNum = 1
      let obj = {
        platformName:this.platformName, 
        pageSize:this.pageSize,                      //this.pageSize,
        pageNum:this.pageNum,
      }
    hotSpotList(obj).then( res => {
      console.log(res)
      this.tableData = res.data.rows
      this.total = res.data.total
        this.tableData = res.data.rows.map((item, index) => {
            item.tid =
              this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1;
            return item;
          });
    })
    }
    /******************************* */
  },
  created(){
  this.PublicAccessLisk()
  }
}
</script>
<style lang="scss">
#hotspot {
  .QueryLayout {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 10px;
    border-bottom: solid 1px #cccccc;
  }
  .TheFormIsOutOfOrder {
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom:20px;
  }
  .BatchLayout {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px 10px;
  }
}
</style>