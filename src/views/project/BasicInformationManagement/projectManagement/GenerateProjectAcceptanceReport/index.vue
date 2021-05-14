<template>
  <div id="ProjectAcceptanceReportghj">
    <div class="BatchLayout">
      <div style="margin-right: 10px">
        <el-button type="success" icon="el-icon-plus" @click="NewProjectmanagement">新增</el-button>
      </div>
      <div style="margin-right: 10px">
        <el-button type="success" icon="el-icon-plus" @click="DownloadProjectAcceptanceReport">下载</el-button>
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
        :empty.sync="empty"
        @returnToMulti="returnToMulti"
      >
        <template v-slot:status="data">
          <el-button type="text" size="mini" @click="ViewProjectManagement(data)">查看</el-button>
          <el-button type="text" size="mini" @click="ViewProjectManagements(data)">编辑</el-button>
          <el-button type="text" size="mini" @click="DeleteProjectmanagement(data)">删除</el-button>
        </template>
      </tables>
    </div>
    <NewAcceptanceInformation
      :ManagementNewOpenL.sync="ManagementNewOpenL"
      @ManagementAddClose="ManagementAddClose"
      @PublicAccessLisk="PublicAccessLisk"
    ></NewAcceptanceInformation>
    <ViewAcceptanceInformation
      :id="id"
      :ProjectManagementView.sync="ProjectManagementView"
      @ProjectManagementViewClose="ProjectManagementViewClose"
    ></ViewAcceptanceInformation>
    <EditAcceptanceInformation
      :ProjectManagementEditor.sync="ProjectManagementEditor"
      @ProjectManagementEditClose="ProjectManagementEditClose"
      :id="id"
      @PublicAccessLisk="PublicAccessLisk"
    ></EditAcceptanceInformation>
  </div>
</template>
<script>
import tables from '../../../components/table/index'
import EditAcceptanceInformation from './EditAcceptanceInformation/index'
import NewAcceptanceInformation from './NewAcceptanceInformation/index'
import ViewAcceptanceInformation from './ViewAcceptanceInformation/index'
import {
  projectAcceptanceInformationList,
  projectAcceptanceInformationSave,
  projectAcceptanceInformationRemove,
  projectAcceptanceInformationUpdate,
  projectAcceptanceInformationDetails,
  projectAcceptanceInformationDownload,
} from '@/api/GenerateReport.js'
export default {
  components: {
    tables,
    EditAcceptanceInformation,
    NewAcceptanceInformation,
    ViewAcceptanceInformation,
  },
  data() {
    return {
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
          label: '花花',
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
        { lable: '完工项目名称', field: 'projectName' },
        { lable: '承包商/供应商名称', field: 'contractorName' },
        { lable: '完工资产提交范围', field: 'submissionScope' },
        { lable: '承包商/供应商负责人', field: 'contractorPrincipal' },
        { lable: '承包商/供应商联系方式', field: 'contractorDetails' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //公共表格内容
      tableData: [],
      //清空多选
      empty: 0,
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
    /*************table的区域************ */
    //当前第几页
    page(val) {
      this.pageNum = val
      let obj = {
        platformName: this.platformName,
        pageSize: this.pageSize, //this.pageSize,
        pageNum: val,
      }
      projectAcceptanceInformationList(obj).then(res => {
        console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
        this.tableData = res.data.rows.map((item, index) => {
          item.tid = this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1
          return item
        })
      })
    },
    //每页多少条
    size(val) {
      this.pageSize = val
      this.pageNum = 1
      let obj = {
        platformName: this.platformName,
        pageSize: val, //this.pageSize,
        pageNum: this.pageNum,
      }
      projectAcceptanceInformationList(obj).then(res => {
        console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
        this.tableData = res.data.rows.map((item, index) => {
          item.tid = this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1
          return item
        })
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
      this.id = val.data.id
    },
    //接受查看关闭数据
    ProjectManagementViewClose(val) {
      this.ProjectManagementView = val
    },
    /********************************************* */
    /********************编辑*********************** */
    ViewProjectManagements(val) {
      this.ProjectManagementEditor = true
      this.id = val.data.id
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
      })
        .then(() => {
          let obj = {
            ids: this.ids,
          }
          projectAcceptanceInformationRemove(obj).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
              this.PublicAccessLisk()
            } else {
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
      if (this.ids.length > 0) {
        this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let obj = {
            ids: this.ids,
          }
          projectAcceptanceInformationRemove(obj).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
              this.PublicAccessLisk()
            } else {
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

      } else {
        this.$message({
          message: `批量删除时需先选中一条或多条记录`,
          type: 'warning',
        })
      }
    },
    /*************************************** */
    //返回多选清空的值
    returnToMulti(val) {
      this.empty = 0
    },
    /*****************下载********************* */
    DownloadProjectAcceptanceReport() {
      if (this.ids.length > 0) {
        let str = this.ids.toString(',')
        projectAcceptanceInformationDownload(str).then(res => {
          this.empty = 1
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = `/fad/statistical/project-acceptance-information/download/${str}`
          link.setAttribute('download', 'exemple') // 自定义下载文件名（如exemple.txt）
          // link.download=res.data.data[0].fileName
          document.body.appendChild(link)
          link.click()
        })
      } else {
        this.$message({
          message: `请选择下载的文件`,
          type: 'warning',
        })
      }
    },
    /*********************************** */
    /***************公共查询**************** */
    PublicAccessLisk() {
      this.pageNum = 1
      let obj = {
        pageSize: this.pageSize, //this.pageSize,
        pageNum: this.pageNum,
      }
      projectAcceptanceInformationList(obj).then(res => {
        console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
        this.tableData = res.data.rows.map((item, index) => {
          item.tid = this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1
          return item
        })
      })
    },
    /************************************ */
  },
  created() {
    this.PublicAccessLisk()
  },
}
</script>
<style lang="scss">
#ProjectAcceptanceReportghj {
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
    padding-top: 30px;
  }
  .BatchLayout {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px 10px;
    border-bottom: solid 1px #cccccc;
  }
}
</style>