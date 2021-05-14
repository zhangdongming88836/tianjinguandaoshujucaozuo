<template>
  <div>
    <div id="EngineeringDataManagement">
      <div class="bid">
        <div class="bidstyle"></div>
        <div>
          <i class="bidText">工程数据管理</i>
        </div>
      </div>
      <div class="QueryLayout">
        <el-radio-group v-model="QueryAndSelect" @change="QueryAndChan">
          <el-radio :label="3">一般查询</el-radio>
          <el-radio :label="6">高级查询</el-radio>
          <el-radio :label="9">编辑</el-radio>
        </el-radio-group>
      </div>
      <!-- 一般 -->
      <div class="SelectLayout" v-if="QueryAndSelect == 3">
        <div v-if="GeneralDominance">
          <el-select
            v-model="projectName"
            multiple
            collapse-tags
            style="margin-left: 20px"
            placeholder="请选择项目名称"
            @change="selectTheProjectName"
          >
            <el-option v-for="item in projectNames" :key="item.id" :label="item.projectName" :value="item.id"> </el-option>
          </el-select>
        </div>
        <div style="margin-left: 30px">
          <el-select v-model="stage" placeholder="请选择工程阶段" @change="ProjectPhasechange">
            <el-option v-for="item in stages" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </div>
        <div style="margin-left: 30px">
          <el-cascader v-model="dataSheet" :props="props" :options="dataSheets" placeholder="请选择数据表" :show-all-levels="false">
            <template slot-scope="{ node, data }">
              <el-tooltip :content="data.name" placement="top-start">
                <span>{{ data.name }}</span>
              </el-tooltip>
            </template>
          </el-cascader>
        </div>
        <div style="margin-left: 20px">
          <el-button type="primary" @click="GeneralQquery">查询</el-button>
        </div>
        <div style="margin-left: 10px">
          <el-button @click="Reset">重置</el-button>
        </div>
      </div>
      <!-- 高级 -->
      <div class="SelectLayouts" v-else-if="QueryAndSelect == 6">
        <div class="SelectLayoutsa">
          <div>
            <el-select v-model="GprojectName" placeholder="请选择项目名称" @change="GjselectTheProjectName">
              <el-option v-for="item in GprojectNames" :key="item.id" :label="item.projectName" :value="item.id"> </el-option>
            </el-select>
          </div>
          <div style="margin-left: 30px">
            <el-select v-model="linname" placeholder="请选择管线名称">
              <el-option v-for="item in linnames" :key="item.id" :label="item.pipeName" :value="item.id"> </el-option>
            </el-select>
          </div>
          <div style="margin-left: 30px">
            <el-autocomplete
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="querySearch"
              placeholder="请输入KP值"
              :trigger-on-focus="false"
              @select="handleSelect"
              onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
            ></el-autocomplete>
          </div>
          <div style="padding: 6px 14px">至</div>
          <div>
            <el-autocomplete
              class="inline-input"
              v-model="state2"
              :fetch-suggestions="querySearchs"
              placeholder="请输入KP值"
              :trigger-on-focus="false"
              @select="handleSelects"
              onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
            ></el-autocomplete>
          </div>
          <div style="margin-left: 30px">
            <el-select v-model="WeldingSlogan" placeholder="请选择焊口号" @change="WeldingSloganChanges">
              <el-option v-for="item in WeldingSlogans" :key="item.id" :label="item.fieldData" :value="item.fieldData"> </el-option>
            </el-select>
          </div>
          <div style="margin-left: 30px">
            <el-select v-model="ManagementGroup" placeholder="请选择管号" @change="ChangeOfPipenumber">
              <el-option v-for="item in ManagementGroups" :key="item.id" :label="item.fieldData" :value="item.fieldData"> </el-option>
            </el-select>
          </div>
        </div>
        <div class="SelectLayoutsac">
          <div>
            <el-select v-model="stage" placeholder="请选择工程阶段" @change="ProjectPhasechange">
              <el-option v-for="item in stages" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </div>
          <div style="margin-left: 30px">
            <el-cascader v-model="dataSheet" :props="props" :options="dataSheets" placeholder="请选择数据表" :show-all-levels="false">
              <template slot-scope="{ node, data }">
                <el-tooltip :content="data.name" placement="top-start">
                  <span>{{ data.name }}</span>
                </el-tooltip>
              </template>
            </el-cascader>
          </div>
          <div style="margin-left: 20px">
            <el-button type="primary" @click="AdvancedQuery">查询</el-button>
          </div>
          <div style="margin-left: 10px">
            <el-button @click="Reset">重置</el-button>
          </div>
          <div style="margin-left: 10px">
            <el-button @click="exportExcel">导出</el-button>
          </div>
        </div>
      </div>
      <!-- 编辑 -->
      <div class="SelectLayoutas" v-else-if="QueryAndSelect == 9">
        <div v-if="dominance">
          <el-select v-model="GprojectName" placeholder="请选择项目名称" @change="GjselectTheProjectName">
            <el-option v-for="item in GprojectNames" :key="item.id" :label="item.projectName" :value="item.id"> </el-option>
          </el-select>
        </div>
        <div style="margin-left: 30px">
          <el-select v-model="stage" placeholder="请选择工程阶段" @change="ProjectPhasechange">
            <el-option v-for="item in stages" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </div>
        <div style="margin-left: 30px">
          <el-cascader v-model="dataSheet" :props="props" :options="dataSheets" placeholder="请选择数据表" :show-all-levels="false">
            <template slot-scope="{ node, data }">
              <el-tooltip :content="data.name" placement="top-start">
                <span>{{ data.name }}</span>
              </el-tooltip>
            </template>
          </el-cascader>
        </div>
        <div style="margin-left: 20px">
          <el-button type="primary" @click="querystatements">查询</el-button>
        </div>
        <div style="margin-left: 10px">
          <el-button @click="Reset">重置</el-button>
        </div>
      </div>
      <div class="BatchLayout">
        <!-- <div style="margin-right: 10px">
        <el-button type="success" icon="el-icon-plus" @click="ProjectDocumentUpload">新增</el-button>
      </div> -->
        <div style="margin-right: 10px" v-show="QueryAndSelect == 6">
          <el-button type="success" @click="ViewProjectManagements">查看关联文档</el-button>
        </div>
        <div style="margin-right: 10px" v-show="QueryAndSelect == 9">
          <el-button type="success" @click="ProjectDocumentUpload">关联文档</el-button>
        </div>
        <div style="margin-right: 10px" v-show="ConfirmConnection">
          <el-button type="primary" @click="UploadOpenss">确认关联</el-button>
        </div>
        <div style="margin-right: 10px" v-show="BatchDownloadDisplay">
          <el-button type="primary" @click="BulkDownload">批量下载</el-button>
        </div>
        <!-- <div style="margin-right: 10px">
        <el-button type="success">模板下载</el-button>
      </div>
      <div style="margin-right: 10px">
        <el-button type="success">导入</el-button>
      </div>
      <div style="margin-right: 10px">
        <el-button type="success">导出</el-button>
      </div> -->
        <!-- <div>
        <el-button type="danger" icon="el-icon-edit" @click="DeleteProjectmanagements">批量删除</el-button>
      </div> -->
      </div>
      <!-- <div style="margin-bottom:10px;">
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
      </div> -->
      <!-- <DisplayData v-if="display" :iframeUrl="iframeUrl"></DisplayData> -->
      <!-- 布局关联文档 -->
      <div style="padding: 10px">
        <el-row>
          <el-col :span="12">
            <div v-if="DataTable" class="dataLeft">
              <EngineeringDataEditing
                :ProjectDocumentEditOpen="ProjectDocumentEditOpen"
                @EngineeringDocumentEditClose="EngineeringDocumentEditClose"
                @Getheumberfows="Getheumberfows"
                :GprojectName="GprojectName"
                :reportCode="reportCode"
              ></EngineeringDataEditing>
            </div>
          </el-col>
          <el-col :span="12">
            <div v-if="DocumentForm" class="dataLeft">
              <NewEngineeringData
                :DocumentForm="DocumentForm"
                @UploadClose="UploadClose"
                :GprojectName="GprojectName"
                :reportCode="reportCode"
                :row="row"
              ></NewEngineeringData>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div v-if="GJDataTable" class="dataLeft">
              <ProjectDataView
                :ViewEngineeringDocuments.sync="ViewEngineeringDocuments"
                @GJViewAndCloseEngineeringDocuments="GJViewAndCloseEngineeringDocuments"
                @GJGetheumberfows="GJGetheumberfows"
                :GprojectName="GprojectName"
                :reportCode="reportCode"
              ></ProjectDataView>
            </div>
          </el-col>
          <el-col :span="12">
            <div v-if="GJDocumentForm" class="dataLeft">
              <DisplayData :GprojectName="GprojectName" :reportCode="reportCode" :gjrows="gjrows" @GJUploadClose="GJUploadClose"></DisplayData>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 布局关联文档 结束-->
      <div v-if="displa">
        <iframe class="iframeStyle" id="frame" name="frame" scrolling="no" :src="iframeUrl"></iframe>
      </div>
      <!-- 进入显示的没有数据 -->
      <div class="bgimg" v-if="!displa">
        <img src="../../../assets/menu/image.png" alt="" />
        <p class="posin">暂无数据</p>
      </div>
      <!-- 进入显示的没有数据结束 -->
      <footers></footers>
    </div>
    <!-- 查看 -->
    <!-- <ProjectDataView
      :ViewEngineeringDocuments.sync="ViewEngineeringDocuments"
      @ViewAndCloseEngineeringDocuments="ViewAndCloseEngineeringDocuments"
    ></ProjectDataView>
    <EngineeringDataEditing
      :ProjectDocumentEditOpen="ProjectDocumentEditOpen"
      @EngineeringDocumentEditClose="EngineeringDocumentEditClose"
      :GprojectName="GprojectName"
      :reportCode="reportCode"
    ></EngineeringDataEditing> -->
  </div>
</template>
<script>
import footers from '../components/footer/index'
import tables from '../components/table/index'
import ProjectDataView from './ProjectDataView/index'
import NewEngineeringData from './NewEngineeringData/index'
import EngineeringDataEditing from './EngineeringDataEditing/index'
import DisplayData from './DisplayData/index'
import {
  selectUrl,
  selectProjectName,
  selectSubmarinePipelineName,
  selectKPValue,
  selectKPValueByLike,
  selectWeldJointNumber,
  selectPipeNo,
  selectDataTable,
  selectEngineeringPhase,
  update,
  downLoadFiles,
  downReport,
} from '@/api/QueryAndStatisticss'
export default {
  components: {
    tables,
    ProjectDataView,
    NewEngineeringData,
    EngineeringDataEditing,
    footers,
    DisplayData,
  },
  data() {
    return {
      // 查看和编辑的id
      id: '',
      //查询选中值
      QueryAndSelect: 3,
      /******************一般查询区域**************************** */
      //一般项目显示
      GeneralDominance: true,
      //项目名称选中的数组
      projectName: [],
      //项目名称的数组
      projectNames: [],
      /******************************************* */
      /////////////////// 高级查询区域************************************ */
      /******************imput输入后匹配输入建议************************* */
      restaurants: [],
      restaurantss: [],
      state1: '',
      state2: '',
      /************************************************ */
      //项目名称选中
      GprojectName: '',
      //项目名称的数组
      GprojectNames: [],
      //管线选中
      linname: '',
      //管线名称下拉数组
      linnames: [],
      //焊口号下拉数组
      WeldingSlogans: [],
      //焊口号选择
      WeldingSlogan: '',
      //焊口号的reportCode
      reportCode: '',
      //选择项目名称获取ancestors值作为选择数据表的参数
      ancestors: '',
      //管号下拉数组
      ManagementGroups: [],
      //管号选中
      ManagementGroup: '',
      //查看关联数据显示或隐藏
      GJDataTable: false,
      //查看关联的预览下载显示隐藏
      GJDocumentForm: false,
      //批量下载按钮显示隐藏
      BatchDownloadDisplay: false,
      //查看关联数组行数
      gjrows: 0,
      //要查看关联的数组id
      GJmultipleSelection: [],
      /************************************************* */
      /*******************编辑*********************************** */
      //项目名称显示
      dominance: false,
      //工程阶段下拉
      stages: [],
      stage: '',
      //数据表
      //初始下拉
      dataSheets: [],
      //选中
      dataSheet: [],
      props: {
        lazy: true,
        lazyLoad: this.lazyLoad,
        value: 'id',
        label: 'name',
      },
      //传到子组件的url
      iframeUrl: '',
      //组件显示
      displa: false,
      //报表编号关联文档的
      reportCode: '',
      //文档表格显示和隐藏
      DocumentForm: false,
      //数据表格显示和隐藏
      DataTable: false,
      //关联要传的行数
      row: 0,
      //确认关联按钮显示隐藏
      ConfirmConnection: false,
      //要关联的数组id
      multipleSelection: [],
      /******************************************************** */
      /*************table组件****************** */
      //公共表头
      titles: [
        { lable: '名称', field: 'documentName' },
        { lable: '阶段', field: 'jdName' },
        { lable: '格式', field: 'fileType' },
        { lable: '版本号', field: 'version' },
        { lable: '创建人', field: 'createByName' },
        { lable: '创建时间', field: 'createTime' },
        { lable: '大小', field: 'fileSize' },
        { lable: '项目名称', field: 'projectName' },
        { lable: '承包商', field: 'contractor' },
        { lable: '合同编号', field: 'contractNumber' },
        { lable: '文档位置', field: 'documentLocation' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //公共表格内容
      tableData: [
        {
          documentName: 'djak',
          projectName: '454545',
          fileType: 'dasd',
        },
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
      //查看组件开
      ViewEngineeringDocuments: false,
      //新增开
      UploadOpen: false,
      //编辑文档打开
      ProjectDocumentEditOpen: false,
      /*************查询的数据**************** */
      QueryObject: {
        queryKey: '',
        version: '',
        contractor: '',
        contractNumber: '',
        fileType: '',
      },
      //版本号的下拉
      versions: [],
      //承包商的下拉
      contractors: [],
      //合同编号的下拉
      contractNumbers: [],
      //格式的下拉
      fileTypes: [],
      /******************************** */
    }
  },
  methods: {
    // 导出
    exportExcel() {
      // console.log('doac')
      // console.log(this.ancestors, this.GprojectName)
      let obj = {}
      // obj.projectName = ''
      this.GprojectNames.forEach(item=>{
        if(this.GprojectName==item.id){
          obj.projectName = item.projectName
        }
      })
      obj.projectId = this.GprojectName
      downReport(obj).then(res=>{
        console.log(res);
      })
    },
    //整体的div改变
    QueryAndChan(val) {
      if (this.QueryAndSelect == 9) {
        this.dominance = true
      } else {
        this.dominance = false
      }
      if (this.QueryAndSelect == 3) {
        this.GeneralDominance = true
      } else {
        this.GeneralDominance = false
      }
      //console.log(this.GprojectName,"项目名称")
      this.dataSheet = []
      this.stage = ''
      this.GprojectName = ''
      this.dataSheets = []
      this.projectName = []
      this.WeldingSlogan = []
      this.state1 = ''
      this.state2 = ''
      this.linname = ''
      this.ManagementGroup = ''
      this.displa = false
      //查看关联数据显示或隐藏
      this.GJDataTable = false
      //查看关联的预览下载显示隐藏
      this.GJDocumentForm = false
      //批量下载按钮显示隐藏
      this.BatchDownloadDisplay = false
      //文档表格显示和隐藏
      this.DocumentForm = false
      //数据表格显示和隐藏
      this.DataTable = false
      //确认关联按钮显示隐藏
      this.ConfirmConnection = false
    },
    /*************table的区域************ */
    //当前第几页
    page(val) {},
    //每页多少条
    size(val) {},
    //批量删除
    idArr(val) {
      //  console.log(val)
      this.ids = val
    },
    /******************************************** */
    /*///////////////////imput输入后匹配输入建议方法区域////////////////////////////////////*/
    //开始kp
    querySearch(queryString, cb) {
      var results = queryString ? this.restaurants.filter(this.createFilter(queryString)) : this.restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    //结束kp
    querySearchs(queryString, cb) {
      var restaurantss = this.restaurantss
      var results = queryString ? restaurantss.filter(this.createFilters(queryString)) : restaurantss
      // 调用 callback 返回建议列表的数据
      cb(results)
      //获取焊口号
      let obja = {
        firstKP: this.state1,
        lastKP: this.state2,
        projectId: this.GprojectName,
        pipeName: this.linname,
      }
      selectWeldJointNumber(obja).then(res => {
        //  console.log(res)
        this.WeldingSlogans = res.data.data
      })
    },
    createFilters(queryString) {
      return restaurant => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    // loadAll() {

    // },
    //起始kp值改变
    handleSelect(item) {
      // console.log(item,"987")
    },
    //结束kp值改变
    handleSelects(item) {
      //  console.log(item)
      //获取焊口号
      let obja = {
        firstKP: this.state1,
        lastKP: this.state2,
        projectId: this.GprojectName,
        pipeName: this.linname,
      }
      selectWeldJointNumber(obja).then(res => {
        //  console.log(res)
        this.WeldingSlogans = res.data.data
      })
    },
    /*///////////////////////////////////////////////////*/
    /****************查看**************** */
    // ViewProjectManagement(val) {
    //   this.ViewEngineeringDocuments = true
    //   this.id = val.data.id
    // },
    // //接受返回的数据
    GJViewAndCloseEngineeringDocuments(val) {
      console.log(val)
      this.GJDocumentForm = val
    },
    /********************************* */
    /***************关联文档**************** */
    ProjectDocumentUpload() {
      if (this.iframeUrl == '') {
        this.$message({
          message: '请查询结果后在关联文档',
          type: 'warning',
        })
      } else {
        this.DataTable = true
      }
    },
    //接受返回数据显示关联按钮
    UploadClose(val) {
      // console.log(val,'369')
      this.multipleSelection = val
      if (val.length > 0) {
        this.ConfirmConnection = true
      } else {
        this.ConfirmConnection = false
      }
    },
    /******************************* */
    /*****************查看关联文档**************** */
    ViewProjectManagements(val) {
      if (this.iframeUrl == '') {
        this.$message({
          message: '请查询结果后在关联文档',
          type: 'warning',
        })
      } else {
        this.GJDataTable = true
      }
      // this.id = val.data.id
    },
    //显示文档列表
    EngineeringDocumentEditClose(val) {
      console.log(val, '++++++')
      this.DocumentForm = val
    },
    /*********************************** */
    /*************************************一般查询报表区域****************************************** */
    // //同过项目名称获取工程阶段下拉数据
    // selectTheProjectName(val){

    // },
    //点击查询
    GeneralQquery() {
      if (this.projectName.length == 0 || this.stage == '' || this.dataSheet == '') {
        this.$message({
          message: '请选择项目名称、工程阶段、数据表',
          type: 'warning',
        })
        return false
      }
      let str = ''
      this.projectName.forEach((item, i) => {
        if (i == this.projectName.length - 1) {
          str += "'" + item + "'"
        } else {
          str += "'" + item + "'" + ','
        }
      })
      console.log(str, '1111')
      str = str.trim()
      let id = this.dataSheet[this.dataSheet.length - 1]
      console.log(str)
      selectUrl(id).then(res => {
        console.log(res, '报表地址')
        if (res.data.status == 200) {
          this.iframeUrl = res.data.data.pathUrl + `&ancestors=${this.ancestors}&projectId=${str}&op=view`
          this.reportCode = res.data.data.reportCode
          this.displa = true
        }
      })
    }, //获取项目名称里传入数具表的数据
    ///高级查寻区域*********************************************************** */
    /*********************************************************************************** */
    /******************************/
    GjselectTheProjectName(val) {
      // console.log(val)
      let obj = {}
      obj = this.GprojectNames.find(item => {
        return item.id === val
      })
      //  console.log(obj)
      this.ancestors = obj.ancestors
    },
    //焊口号改变获取reportCode
    WeldingSloganChanges(val) {
      //console.log(val,"**********")
      let obj = {}
      obj = this.WeldingSlogans.find(item => {
        return item.fieldData === val
      })
      //console.log(obj)
      this.reportCode = obj.reportCode
      //获取管号
      let objs = {
        pipeName: this.linname,
        projectId: this.GprojectName,
        reportCode: this.reportCode,
      }
      selectPipeNo(objs).then(res => {
        console.log(res)
        this.ManagementGroups = res.data.data
      })
    },
    //管号改变获取值
    ChangeOfPipenumber(val) {
      console.log(val)
    },
    //高级查询
    AdvancedQuery() {
      if (this.GprojectName == '' || this.stage == '' || this.dataSheet == '') {
        this.$message({
          message: '请选择项目名称、工程阶段、数据表',
          type: 'warning',
        })
        return false
      }
      let id = this.dataSheet[this.dataSheet.length - 1]
      selectUrl(id).then(res => {
        console.log(res, '报表地址')
        if (res.data.status == 200) {
          this.iframeUrl =
            res.data.data.pathUrl +
            `&ancestors=${this.ancestors}&projectId=${this.GprojectName}&op=view&pipeName=${this.linname}&firstKP=${this.state1}&lastKP=${this.state2}&weldJointNumber=${this.WeldingSlogan}&pipeNo=${this.ManagementGroup}&reportCode=${this.stage}`
          this.reportCode = res.data.data.reportCode
          this.displa = true
        }
      })
    },
    //高级获取行数
    GJGetheumberfows(val) {
      console.log(val, '******')
      this.gjrows = val
    },
    //高级获取多选数组的id
    GJUploadClose(val) {
      this.GJmultipleSelection = val
      if (val.length > 0) {
        this.BatchDownloadDisplay = true
      } else {
        this.BatchDownloadDisplay = false
      }
    },
    //多文件下载
    BulkDownload() {
      downLoadFiles(this.GJmultipleSelection).then(res => {
        // console.log(res.data.data)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = `/fad/dreport/report-data/downLoadFiles/${this.GJmultipleSelection}`
        link.setAttribute('download', 'exemple') // 自定义下载文件名（如exemple.txt）
        // link.download=res.data.data[0].fileName
        document.body.appendChild(link)
        link.click()
      })
    },
    /*************************************************************************************************** */
    /****************************************编辑*************************************************************/
    //阶段改变发送数据表请求
    ProjectPhasechange(val) {
      console.log(val)
      //获取数据表
      let obj = {
        parentId: val,
      }
      selectDataTable(obj).then(res => {
        console.log(res, '数据表')
        this.dataSheets = res.data.data
      })
    },
    //数据表级联动态下拉
    lazyLoad(node, resolve) {
      setTimeout(() => {
        this.getProvence(node, resolve)
      }, 50)
    },
    // test
    getProvence(node, resolve) {
      // console.log(node)
      // console.log(resolve)
      let obj = {
        parentId: node.data.id,
      }
      selectDataTable(obj).then(res => {
        // console.log(res, '数据表')
        const nodes = res.data.data
        resolve(nodes)
      })
    },
    //点击查询
    querystatements() {
      if (this.GprojectName == '' || this.stage == '' || this.dataSheet == '') {
        this.$message({
          message: '请选择项目名称、工程阶段、数据表',
          type: 'warning',
        })
        return false
      }
      let id = this.dataSheet[this.dataSheet.length - 1]
      selectUrl(id).then(res => {
        // console.log(res, '报表地址')
        if (res.data.status == 200) {
          this.iframeUrl = res.data.data.pathUrl + `&ancestors=${this.ancestors}&projectId=${this.GprojectName}&op=write`
          this.reportCode = res.data.data.reportCode
          this.displa = true
        }
      })
    },
    //点击重置
    Reset() {
      this.dataSheet = []
      this.stage = ''
      this.GprojectName = ''
      this.dataSheets = []
      this.projectName = []
      this.WeldingSlogan = []
      this.state1 = ''
      this.state2 = ''
      this.linname = ''
      this.ManagementGroup = ''
    },
    //获取行数
    Getheumberfows(val) {
      this.row = val
    },
    //确认关联
    //点击确认关联
    UploadOpenss() {
      // console.log(this.multipleSelection,"关联是古族")
      let str = this.multipleSelection.toString()
      console.log(str)
      let obj = {
        docuId: str,
        projectId: this.GprojectName,
        reportCode: this.reportCode,
        row: this.row,
      }
      update(obj).then(res => {
        console.log(res)
        if (res.data.status == 200) {
          this.$message({
            message: `${res.data.message}`,
            type: 'success',
          })
          this.DocumentForm = false
          //数据表格显示和隐藏
          this.DataTable = false
          //确认关联按钮显示隐藏
          this.ConfirmConnection = false
        } else {
          this.$message({
            message: `${res.data.message}`,
            type: 'warning',
          })
        }
      })
    },
    /************************************************************************************************* */
  },
  //生命周期里输入后匹配输入建议
  mounted() {
    let obj = {
      kpvalue: this.state1,
      projectId: this.GprojectName,
      pipeName: this.linname,
    }
    selectKPValueByLike(obj).then(res => {
      this.restaurants = res.data.data

      this.restaurantss = res.data.data
    })
  },
  //生命周期
  created() {
    /***********一般************** */
    /***************高级******************* */
    //初始获取下拉框-获取项目名称一般和高级和编辑
    selectProjectName().then(res => {
      //  console.log(res)
      this.projectNames = res.data.data
      this.GprojectNames = res.data.data
    })
    //获取管线名称
    selectSubmarinePipelineName().then(res => {
      console.log(res)
      this.linnames = res.data.data
    })
    //获取阶段名称
    selectDataTable({ parentId: '' }).then(res => {
      //  console.log(res,"阶段")
      this.stages = res.data.data
    })
  },
}
</script>
<style lang="scss">
#EngineeringDataManagement {
  min-height: 100vh;
  max-height: 100%;
  .bid {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 18px 0;
    border: solid 1px #cccccc;
  }
  .bidstyle {
    width: 4px;
    height: 17px;
    margin-left: 20px;
    background-color: #0061a7;
  }
  .bidText {
    width: 96px;
    height: 22px;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    // line-height: 22px;
    margin-left: 5px;
    letter-spacing: 0px;
    color: #333333;
  }
  /********************查询布局********************** */
  .QueryLayout {
    padding: 20px 18px 10px 18px;
  }
  /******************************************* */
  /***********************选择布局************************* */
  .SelectLayout {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 10px 0px 16px 0px;
    border-bottom: solid 1px #cccccc;
  }
  .SelectLayoutas {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 10px 0px 16px 17px;
    border-bottom: solid 1px #cccccc;
  }
  .SelectLayouts {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px 0px 16px 18px;
    border-bottom: solid 1px #cccccc;
  }
  .SelectLayoutsa {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .SelectLayoutsac {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 24px;
  }
  .iframeStyle {
    width: 100%;
    min-height: 500px;
    max-height: 100%;
  }
  .bgimg {
    width: 500px;
    margin: 200px auto;
  }
  .posin {
    width: 72px;
    height: 25px;
    font-family: PingFang SC;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 25px;
    letter-spacing: 0px;
    color: #666666;
    margin-top: -21px;
    margin-left: 153px;
  }
  /********************************************* */
  /******************操作数据按钮************************* */
  .BatchLayout {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px 10px;
  }
  /************************************************* */
  /******************整体交互布局**************************** */
  .dataLeft {
    width: 100%;
    height: 500px;
    overflow: auto;
  }
  .el-cascader-node {
    width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>