<template>
  <div id="SunLevelProjectmanagement">
    <div class="QueryLayout">
      <div>
        <el-select v-model="projectName" placeholder="请选择项目名称" @change="projectChange($event)">
          <el-option v-for="item in projectNames" :key="item.id" :label="item.projectName" :value="item.projectName"> </el-option>
        </el-select>
      </div>
      <div style="margin-left: 15px">
        <el-button type="primary" @click="PublicAccessLisk">查询</el-button>
      </div>
      <div style="margin-left: 10px">
        <el-button @click="Reset">重置</el-button>
      </div>
    </div>
    <div class="BatchLayout">
      <div style="margin-right: 10px">
        <el-button type="success" icon="el-icon-plus" @click="NewProjectmanagement">新增</el-button>
      </div>
      <div style="margin-right: 10px">
        <el-button type="success" icon="el-icon-plus" @click="DownloadProjectAcceptanceReportsdf">下载</el-button>
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
        :empty="empty"
        @returnToMulti="returnToMulti"
      >
        <template v-slot:status="data">
          <a :href="data.data.fileUrl" class="weiz" target="_blank">查看</a>
          <el-button type="text" size="mini" @click="ViewProjectManagements(data)">编辑</el-button>
          <el-button type="text" size="mini" @click="DeleteProjectmanagement(data)">删除</el-button>
        </template>
      </tables>
    </div>
    <NewAcceptanceManagement
      :ManagementNewOpenL.sync="ManagementNewOpenL"
      @ManagementAddClose="ManagementAddClose"
      @PublicAccessLisk="PublicAccessLisk"
    ></NewAcceptanceManagement>
    <!-- <ViewAcceptanceInformation :ProjectManagementView.sync="ProjectManagementView" @ProjectManagementViewClose="ProjectManagementViewClose"></ViewAcceptanceInformation> -->
    <EditorAcceptanceManagement
      :ProjectManagementEditor.sync="ProjectManagementEditor"
      @ProjectManagementEditClose="ProjectManagementEditClose"
      :id="id"
      @PublicAccessLisk="PublicAccessLisk"
    ></EditorAcceptanceManagement>
  </div>
</template>
<script>
import tables from '../../../components/table/index'
import EditorAcceptanceManagement from './EditorAcceptanceManagement/index'
import NewAcceptanceManagement from './NewAcceptanceManagement/index'
import {
  acceptanceReportList,
  acceptanceReportSave,
  acceptanceReportRemove,
  acceptanceReportUpdate,
  acceptanceReportDetails,
  acceptanceReportProject,
  acceptanceReportDownload,
} from '@/api/AcceptanceManagement.js'
export default {
  components: {
    tables,
    EditorAcceptanceManagement,
    NewAcceptanceManagement,
  },
  data() {
    return {
      //选中编辑的id
      id: '',
      //查询
      projectName: '',
      projectId: '',
      //查询的数组
      projectNames: [],
      /*************table组件****************** */
      //公共表头
      titles: [
        { lable: '序号', field: 'tid' },
        { lable: '项目名称', field: 'projectName' },
        { lable: '阶段', field: 'stage' },
        { lable: '文件名称', field: 'fileName' },
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
    //查询
    PublicAccessLisk() {
      this.PublicAccessLisk()
    },
    //项目名称改变
    projectChange(val) {
      let obj = {}
      obj = this.projectNames.find(item => {
        //这里的userList就是上面遍历的数据源
        return item.projectName === val //筛选出匹配数据
      })
      // console.log(obj);//获取的 name
      // console.log(this.ruleForm.projectName)
      this.projectId = obj.id
    },
    /*************table的区域************ */
    //当前第几页
    page(val) {
      this.pageNum = val
      let obj = {
        platformName: this.platformName,
        pageSize: this.pageSize, //this.pageSize,
        pageNum: val,
      }
      acceptanceReportList(obj).then(res => {
        console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
        this.tableData = res.data.rows.map((item, index) => {
          item.tid = this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1
          return item
        })
        this.tableData = res.data.rows.map(item => {
          console.log(item)
          item.fileName = item.attachments.fileName
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
      acceptanceReportList(obj).then(res => {
        console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
        this.tableData = res.data.rows.map((item, index) => {
          item.tid = this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1
          return item
        })
        this.tableData = res.data.rows.map(item => {
          console.log(item)
          item.fileName = item.attachments.fileName
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
          acceptanceReportRemove(obj).then(res => {
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
          acceptanceReportRemove(obj).then(res => {
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
    DownloadProjectAcceptanceReportsdf() {
      if (this.ids.length > 0) {
        this.empty = 1
        let str = this.ids.toString(',')
        acceptanceReportDownload(str).then(res => {
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = `/fad/statistical/acceptance-report/download/${str}`
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
    /*****************重置***************** */
    Reset() {
      this.projectName = ''
      this.projectId = ''
      this.PublicAccessLisk()
    },
    /************************************* */
    /******************公共查询获取列表******************* */
    PublicAccessLisk() {
      this.pageNum = 1
      let obj = {
        projectId: this.projectId,
        pageSize: this.pageSize, //this.pageSize,
        pageNum: this.pageNum,
      }
      acceptanceReportList(obj).then(res => {
        console.log(res, '/**************///////')
        this.tableData = res.data.rows
        this.total = res.data.total
        this.tableData = res.data.rows.map((item, index) => {
          item.tid = this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1
          return item
        })
        this.tableData = res.data.rows.map(item => {
          console.log(item)
          item.fileName = item.attachments.fileName
          return item
        })
      })
    },
    /******************************* */
  },
  created() {
    this.PublicAccessLisk()
    acceptanceReportProject().then(res => {
      console.log(res)
      this.projectNames = res.data.data
    })
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
  .weiz {
    margin-right: 10px;
  }
}
</style>