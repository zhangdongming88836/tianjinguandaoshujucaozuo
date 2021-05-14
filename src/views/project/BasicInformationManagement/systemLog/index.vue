<template>
  <div id="hotspot">
    <div class="QueryLayout">
      <div style="margin-left: 20px">
        <el-select v-model="Operation" placeholder="请选择操作类型">
          <el-option v-for="item in OperationClass" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div style="margin-left: 20px">
        <el-select v-model="state" placeholder="请选择操作状态">
          <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div style="margin-left: 15px">
        <el-button type="primary" @click="LogQuery">查询</el-button>
      </div>
      <div style="margin-left: 10px">
        <el-button @click="Reset">重置</el-button>
      </div>
    </div>
    <!-- <div class="BatchLayout">
      <div style="margin-right: 10px">
        <el-button type="success" icon="el-icon-plus" @click="NewProjectmanagement">新增</el-button>
      </div>
      <div>
        <el-button type="danger" icon="el-icon-edit" @click="DeleteProjectmanagements">批量删除</el-button>
      </div>
    </div> -->
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
        </template>
      </tables>
    </div>
     <footers></footers>
    <ViewSystemLog
      :ViewEngineeringDocuments="ViewEngineeringDocuments"
      @ViewAndCloseEngineeringDocuments="ViewAndCloseEngineeringDocuments"
      :id="id"
    ></ViewSystemLog>
    <!-- <NewHotSpots :ManagementNewOpenL.sync="ManagementNewOpenL" @ManagementAddClose="ManagementAddClose"></NewHotSpots>
    <ViewHotSpots :ProjectManagementView.sync="ProjectManagementView" @ProjectManagementViewClose="ProjectManagementViewClose"></ViewHotSpots>
    <HotEditing :ProjectManagementEditor.sync="ProjectManagementEditor" @ProjectManagementEditClose="ProjectManagementEditClose"></HotEditing> -->
  </div>
</template>
<script>
import footers from "../../components/footer/index"
import tables from '../../components/table/index'
import ViewSystemLog from './ViewSystemLog/index'
import { sysLogList, sysLogDetails } from '@/api/journal'
// import ViewHotSpots  from "./ViewHotSpots/index";
// import NewHotSpots  from "./NewHotSpots/index";
// import HotEditing  from "./HotEditing/index";
export default {
  components: {
    tables,
    ViewSystemLog,
    footers
  },
  data() {
    return {
      //id
      id:"",
      /*****************查询区域**************** */
      //操作类
      OperationClass: [
        {
          label: '添加',
          value: '0',
        },
        {
          label: '修改',
          value: '1',
        },
        {
          label: '删除',
          value: '2',
        },
        {
          label: '查看',
          value: '3',
        },
        {
          label: '其他',
          value: '4',
        },
      ],
      //操作类选中
      Operation: '',
      //状态类
      states: [
        {
          label: '正常',
          value: '0',
        },
        {
          label: '异常',
          value: '1',
        },
      ],
      //状态选中
      state: '',
      /********************************** */
      /*************table组件****************** */
      //公共表头
      titles: [
        { lable: '功能模块', field: 'modul' },
        { lable: '功能描述', field: 'des' },
        { lable: '操作类型', field: 'type' },
        { lable: 'IP地址', field: 'ip' },
        { lable: '操作人', field: 'createByName' },
        { lable: '操作时间', field: 'createTime' },
        { lable: '操作状态', field: 'status' },
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
      //当前页数
      pageNum: 1,
      //每也条数
      pageSize: 10,
      //总页数
      total: 0,
      //显示多选框
      see: false,
      //删除除数组
      ids: [],
      /*************************************** */
      /****************查看组件数据区域************************* */
      ViewEngineeringDocuments: false,
      /********************************************** */
    }
  },
  methods: {
    /*************table的区域************ */
    //当前第几页
    page(val) {
      this.pageNum = val
      let obj = {
        pageNum: val,
        pageSize:this.pageSize,
        status: this.state,
        type:this.Operation,
      }
      sysLogList(obj).then(res => {
        console.log(res)
        this.total = res.data.total;
        this.tableData = res.data.rows.map(item => {
          item.status == 0 ? (item.status = '正常') : (item.status = '异常')
          item.type == 0
            ? (item.type = '添加')
            : item.type == 1
            ? (item.type = '修改')
            : item.type == 2
            ? (item.type = '删除')
            : item.type == 3
            ? (item.type = '查看')
            : (item.type = '其他')
          return item
        })
      })
    },
    //每页多少条
    size(val) {
      this.pageSize = val
         let obj = {
        pageNum: this.pageNum,
        pageSize:val,
        status: this.state,
        type:this.Operation,
      }
      sysLogList(obj).then(res => {
        console.log(res)
        this.total = res.data.total;
        this.tableData = res.data.rows.map(item => {
          item.status == 0 ? (item.status = '正常') : (item.status = '异常')
          item.type == 0
            ? (item.type = '添加')
            : item.type == 1
            ? (item.type = '修改')
            : item.type == 2
            ? (item.type = '删除')
            : item.type == 3
            ? (item.type = '查看')
            : (item.type = '其他')
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

    /********************查看*********************** */
    ViewProjectManagement(val) {
      this.id = val.data.id
      this.ViewEngineeringDocuments = true
    },
    //接受查看关闭数据
    ViewAndCloseEngineeringDocuments(val) {
      this.ViewEngineeringDocuments = val
    },
    /********************************************* */
    /********************日志查询**************** */
    LogQuery(){
    this.LogPublicView()
    },
    /****************************** */
    /*****************重置***************** */
    Reset() {
      this.state = ''
      this.Operation = ''
    this.LogPublicView()
    },
    /************************************* */
    //公共查询
    LogPublicView() {
      this.pageNum = 1
      let obj = {
        pageNum: this.pageNum,
        pageSize:this.pageSize,
        status: this.state,
        type:this.Operation,
      }
      sysLogList(obj).then(res => {
        console.log(res)
        this.total = res.data.total;
        this.tableData = res.data.rows.map(item => {
          item.status == 0 ? (item.status = '正常') : (item.status = '异常')
          item.type == 0
            ? (item.type = '添加')
            : item.type == 1
            ? (item.type = '修改')
            : item.type == 2
            ? (item.type = '删除')
            : item.type == 3
            ? (item.type = '查看')
            : (item.type = '其他')
          return item
        })
      })
    },
  },
  created() {
    this.LogPublicView()
  },
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
    padding-top: 30px;
    margin-bottom: 50px;
  }
  .BatchLayout {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px 10px;
  }
}
</style>