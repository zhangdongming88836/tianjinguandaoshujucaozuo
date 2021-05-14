<template>
  <div id="MarineManagementInformation">
    <div class="QueryLayout">
      <div>
        <el-select v-model="ownedProjectId" placeholder="请选择所属项目">
          <el-option v-for="item in ownedProjectIds" :key="item.id" :label="item.projectName" :value="item.id"> </el-option>
        </el-select>
      </div>
      <div style="margin-left: 20px">
        <el-input placeholder="关键字搜索" suffix-icon="el-icon-search" v-model="pipeName" @input="inputChange"> </el-input>
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
        <el-button type="success" icon="el-icon-plus" @click="NewInformationOfTheSeaManagement">新增</el-button>
      </div>
      <div>
        <el-button type="danger" icon="el-icon-edit" @click="DeletionOfMarineManagementIformationS">批量删除</el-button>
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
          <el-button type="text" size="mini" @click="ReviewOfmarineManagementinformation(data)">查看</el-button>
          <el-button type="text" size="mini" @click="EditingOfMarineManagementInformation(data)">编辑</el-button>
          <el-button type="text" size="mini" @click="DeletionOfMarineManagementIformation(data)">删除</el-button>
        </template>
        -->
      </tables>
    </div>
    <NewInformationOfTheSeaManagementm
      :ManagementNewOpenL.sync="ManagementNewOpenL"
      @ManagementAddClose="ManagementAddClose"
      @PublicAccessLisk="PublicAccessLisk"
    ></NewInformationOfTheSeaManagementm>
    <ReviewOfmarineManagementinformationm
      :ProjectManagementView.sync="ProjectManagementView"
      @ProjectManagementViewClose="ProjectManagementViewClose"
      :id="id"
    ></ReviewOfmarineManagementinformationm>
    <EditingOfMarineManagementInformationm
      :ProjectManagementEditor.sync="ProjectManagementEditor"
      @ProjectManagementEditClose="ProjectManagementEditClose"
      @PublicAccessLisk="PublicAccessLisk"
      :id="id"
    ></EditingOfMarineManagementInformationm>
  </div>
</template>
<script>
import tables from '../../../components/table/index'
import EditingOfMarineManagementInformationm from './EditingOfMarineManagementInformation/index'
import NewInformationOfTheSeaManagementm from './NewInformationOfTheSeaManagement/index'
import ReviewOfmarineManagementinformationm from './ReviewOfmarineManagementinformation/index'
import {
  statisticalseasipeList,
  statisticalseasiperemove,
  statisticalseasipdetails,
  statisticalseasipsave,
  statisticalseasiupdate,
  statisticalseasiprojectAll,
} from '@/api/subsea'
export default {
  components: {
    tables,
    //编辑
    EditingOfMarineManagementInformationm,
    //新增
    NewInformationOfTheSeaManagementm,
    //查看
    ReviewOfmarineManagementinformationm,
  },
  data() {
    return {
      //查看或编辑的id
      id: '',
      //搜查询海管名称
      pipeName: '',
      /**********搜索下拉框************* */
      //所属项目数组
      ownedProjectIds: [],
      //项目选中
      ownedProjectId: '',
      /******************************* */
      /*************table组件****************** */
      //公共表头
      titles: [
        { lable: '序号', field: 'tid' },
        { lable: '海管名称', field: 'pipeName' },
        { lable: '海管编号', field: 'pipeNumber' },
        { lable: '所属公司', field: 'ownedCompanyName' },
        { lable: '所属作业区', field: 'ownedWorkAreaName' },
        { lable: '所属项目', field: 'ownedProject' },
        { lable: '创建时间', field: 'createTime' },
        { lable: '创建人', field: 'creatByName' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //公共表格内容
      tableData: [],
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
        ownedProjectId: this.ownedProjectId,
        pageNum: val,
        pageSize: this.pageSize,
        pipeName: this.pipeName,
      }
      statisticalseasipeList(obj).then(res => {
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
      let obj = {
        ownedProjectId: this.ownedProjectId,
        pageNum: this.pageNum,
        pageSize: val,
        pipeName: this.pipeName,
      }
      statisticalseasipeList(obj).then(res => {
        this.tableData = res.data.rows
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
    NewInformationOfTheSeaManagement() {
      this.ManagementNewOpenL = true
    },
    //接受组件关闭数据
    ManagementAddClose(val) {
      this.ManagementNewOpenL = val
    },
    /*////////////////////////////////////////////////////////*/
    /********************查看*********************** */
    ReviewOfmarineManagementinformation(val) {
      this.ProjectManagementView = true
      this.id = val.data.id
    },
    //接受查看关闭数据
    ProjectManagementViewClose(val) {
      this.ProjectManagementView = val
    },
    /********************************************* */
    /********************编辑*********************** */
    EditingOfMarineManagementInformation(val) {
      this.ProjectManagementEditor = true
      this.id = val.data.id
    },
    ProjectManagementEditClose(val) {
      this.ProjectManagementEditor = val
    },
    /********************************************* */
    /*******************删除******************** */
    DeletionOfMarineManagementIformation(val) {
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
          statisticalseasiperemove(obj).then(res => {
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
    DeletionOfMarineManagementIformationS() {
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
            statisticalseasiperemove(obj).then(res => {
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
    //查询
    querys() {
      this.PublicAccessLisk()
    },
    //input清除后查询
    inputChange(val) {
      if (val == '') {
        this.PublicAccessLisk()
      }
    },
    /*****************重置***************** */
    Reset() {
      this.ownedProjectId = ''
      this.pipeName = ''
      this.PublicAccessLisk()
    },
    /************************************* */
    /*******************公共查询******************* */
    PublicAccessLisk() {
      this.pageNum = 1
      let obj = {
        ownedProjectId: this.ownedProjectId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        pipeName: this.pipeName,
      }
      statisticalseasipeList(obj).then(res => {
        //  console.log(res,"++++")
        this.tableData = res.data.rows
        this.total = res.data.total
        this.tableData = res.data.rows.map((item, index) => {
          item.tid = this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1
          return item
        })
      })
    },
    //获取下拉
    pullDown() {
      statisticalseasiprojectAll().then(res => {
        // console.log(res,"9863")
        this.ownedProjectIds = res.data.data
      })
    },
  },
  created() {
    //获取所有项目下拉
    this.pullDown()
    this.PublicAccessLisk()
  },
}
</script>
<style lang="scss">
#MarineManagementInformation {
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