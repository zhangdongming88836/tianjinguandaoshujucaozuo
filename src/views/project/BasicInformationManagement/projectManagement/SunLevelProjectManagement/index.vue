<template>
  <div id="SunLevelProjectmanagement">
    <div class="QueryLayout">
      <div>
        <el-select v-model="ownedCompany" placeholder="请选择所属公司" @change="checkTheHomework">
          <el-option v-for="item in Companys" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
      </div>
      <div style="margin-left: 20px">
        <el-select v-model="ownedWorkArea" placeholder="请选择所属作业区" @change="checkTheProject">
          <el-option v-for="item in OperationAreas" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
      </div>
      <div style="margin-left: 20px">
        <el-select v-model="currenrState" placeholder="请选择项目状态">
          <el-option v-for="item in ProjectStatuss" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div style="margin-left: 20px">
        <el-input placeholder="请输入项目名称" suffix-icon="el-icon-search" v-model="projectName" @input="inputChange"> </el-input>
      </div>
      <div style="margin-left: 15px">
        <el-button type="primary" @click="querys">查询</el-button>
      </div>
      <div style="margin-left: 10px">
        <el-button @click="Reset">重置</el-button>
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
      <tables
        :titles="titles"
        :tableData="tableData"
        :total="total"
        :see="see"
        :pageSize="pageSize"
        :pageNum="pageNum"
        @page="page"
        @size="size"
        @idArr="idArr"
      >
        <template v-slot:status="data">
          <el-button type="text" size="mini" @click="ViewProjectManagement(data)">查看</el-button>
          <el-button type="text" size="mini" @click="ViewProjectManagements(data)">编辑</el-button>
          <el-button type="text" size="mini" @click="DeleteProjectmanagement(data)">删除</el-button>
        </template>
      </tables>
    </div>
    <ManagementNew :ManagementNewOpenL.sync="ManagementNewOpenL" @ManagementAddClose="ManagementAddClose" @PublicAccessLisk="PublicAccessLisk"></ManagementNew>
    <ProjectManagement
      :ProjectManagementView.sync="ProjectManagementView"
      @ProjectManagementViewClose="ProjectManagementViewClose"
      :id="id"
    ></ProjectManagement>
    <ProjectManagementEditor
      :ProjectManagementEditor.sync="ProjectManagementEditor"
      @ProjectManagementEditClose="ProjectManagementEditClose"
       @PublicAccessLisk="PublicAccessLisk"
      :id="id"
    ></ProjectManagementEditor>
  </div>
</template>
<script>
import tables from '../../../components/table/index'
import ManagementNew from './ManagementNewOpenL/index'
import ProjectManagement from './ProjectManagementView/index'
import ProjectManagementEditor from './ProjectManagementEditor/index'
import { projectInformationList,projectInformationcompany,projectInformationworkArea,projectInformationproject,projectInformationremove,projectInformasaveAfter,acceptanceReportremoveAfter } from '@/api/PM'
export default {
  components: {
    tables,
    ManagementNew,
    ProjectManagement,
    ProjectManagementEditor,
  },
  data() {
    return {
      //查看的id
      id:"",
      /**********搜索下拉框************* */
      //所属公司下拉
      Companys: [
        {
          label: '花花',
          value: '1',
        },
      ],
      //所属公司选中值
      ownedCompany: '',
      //所属作业区
      OperationAreas: [
        {
          label: '花花',
          value: '1',
        },
      ],
      //所属作业区选中值
      ownedWorkArea: '',
      //项目状态
      ProjectStatuss: [
        {
          label: '建设项目',
          value: '0',
        },
        {
          label: '在役项目',
          value: '1',
        },
      ],
      //项目状态选中值
      currenrState: '',
      //项目名称
      projectName: '',
      /******************************* */
      /*************table组件****************** */
      //公共表头
      titles: [
        { lable: '序号', field: 'tid' },
        { lable: '项目名称', field: 'projectName' },
        { lable: '所属公司', field: 'ownedCompanyName' },
        { lable: '所属作业区', field: 'ownedWorkAreaName' },
        { lable: '当前状态', field: 'currenrState' },
        { lable: '创建人', field: 'createByName' },
        { lable: '创建时间', field: 'createTime' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //公共表格内容
      tableData: [
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
      ManagementNewOpenL: false,
      /********************************************** */
      /****************查看组件数据区域************************* */
      ProjectManagementView: false,
      /********************************************** */
      /****************编辑组件数据区域************************* */
      ProjectManagementEditor: false,
      /********************************************** */
    }
  },
  methods: {
    /*******************查询区域************************* */
    //通过公司id查询作业区
    checkTheHomework(val){
      projectInformationworkArea(val).then( res=>{
        // console.log(res,"////////")
        this.OperationAreas = res.data.data;
      })

    },
    //input为空的时候查询所有
    inputChange(val){
      if(val == ""){
           this.PublicAccessLisk();
      }
    },
    //点击查询按钮
    querys(){
     this.PublicAccessLisk();
    },
    /******************************************** */
    /*************table的区域************ */
    //当前第几页
    page(val) {
        this.pageNum = val
      let obj = {
        currenrState: this.currenrState,
        ownedCompany: this.ownedCompany,
        ownedWorkArea: this.ownedWorkArea,
        projectName: this.projectName,
        pageNum: val,
        pageSize:this.pageSize,
      }
      projectInformationList(obj).then(res => {
         console.log(res,"++++++++")
        this.tableData = res.data.rows.map(item=>{
          item.currenrState == 0 ? item.currenrState = "建设项目" : item.currenrState = "在役项目"
          return item
        })
        
        this.tableData = res.data.rows.map((item,index)=>{
          item.tid =
              this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1;
          return item
        })
        
        this.total = res.data.total
      })
    },
    //每页多少条
    size(val) {
      this.pageSize = val
      let obj = {
        currenrState: this.currenrState,
        ownedCompany: this.ownedCompany,
        ownedWorkArea: this.ownedWorkArea,
        projectName: this.projectName,
        pageNum:this.pageNum,
        pageSize:val,
      }
      projectInformationList(obj).then(res => {
         console.log(res,"++++++++")
        this.tableData = res.data.rows.map(item=>{
          item.currenrState == 0 ? item.currenrState = "建设项目" : item.currenrState = "在役项目"
          return item
        })
        
        this.tableData = res.data.rows.map((item,index)=>{
          item.tid =
              this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1;
          return item
        })
        
        this.total = res.data.total
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
    NewProjectmanagement() {
      this.ManagementNewOpenL = true
    },
    //接受组件关闭数据
    ManagementAddClose(val) {
      this.ManagementNewOpenL = val
    },
    /*////////////////////////////////////////////////////////*/
    /********************查看*********************** */
    ViewProjectManagement(val) {
      this.ProjectManagementView = true
      this.id = val.data.id;
    },
    //接受查看关闭数据
    ProjectManagementViewClose(val) {
      this.ProjectManagementView = val
    },
    /********************************************* */
    /********************编辑*********************** */
    ViewProjectManagements(val) {
      this.ProjectManagementEditor = true
      this.id = val.data.id;
    },
    ProjectManagementEditClose(val) {
      this.ProjectManagementEditor = val
    },
    /********************************************* */
    /*******************删除******************** */
    DeleteProjectmanagement(val) {
      this.ids.push(val.data.id)
         this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
              let obj ={
       ids:this.ids
      }
            const loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
     projectInformationremove(obj).then( res=>{
           if( res.data.code == 200 ){
               acceptanceReportremoveAfter(res.data.data).then(res=>{
               
             })
             loading.close();
             this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
             this.PublicAccessLisk()
          }else{
            loading.close();
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
    DeleteProjectmanagements() {
      if(this.ids.length>0){
                this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
              let obj ={
       ids:this.ids
      }
          const loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
     projectInformationremove(obj).then( res=>{
           if( res.data.code == 200 ){
             acceptanceReportremoveAfter(res.data.data).then(res=>{

             })
             loading.close();
             this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
             this.PublicAccessLisk()
          }else{
            loading.close();
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
      }else{
          this.$message({
                message: `批量删除时需先选中一条或多条记录`,
                type: 'warning',
              })
      }
    },
    /*************************************** */
    /*****************重置***************** */
    Reset() {
      this.ownedCompany = ''
      this.ownedWorkArea = ''
      this.currenrState = ''
      this.projectName = ''
      this.PublicAccessLisk()
    },
    /************************************* */
    /*********************公共获取*************** */
    PublicAccessLisk() {
      this.pageNum = 1
      let obj = {
        currenrState: this.currenrState,
        ownedCompany: this.ownedCompany,
        ownedWorkArea: this.ownedWorkArea,
        projectName: this.projectName,
        pageNum: this.pageNum,
        pageSize:this.pageSize,
      }
      projectInformationList(obj).then(res => {
         console.log(res,"++++++++")
        this.tableData = res.data.rows.map(item=>{
          item.currenrState == 0 ? item.currenrState = "建设项目" : item.currenrState = "在役项目"
          return item
        })
        
        this.tableData = res.data.rows.map((item,index)=>{
          item.tid =
              this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1;
          return item
        })
        
        this.total = res.data.total
      })
    },
  },
  //生命周期
  created() {
    //获取公司
    projectInformationcompany().then(res=>{
      // console.log(res,"*********")
      this.Companys = res.data.data;
    });
    this.PublicAccessLisk();
  },
}
</script>
<style lang="scss">
#SunLevelProjectmanagement {
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
  }
  .BatchLayout {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px 10px;
  }
}
</style>