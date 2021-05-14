<template>
  <div>
    <div id="EngineeringDocuments">
      <div class="bid">
        <div class="bidstyle"></div>
        <div>
          <i class="bidText">工程文档管理</i>
        </div>
      </div>
      <div class="Contents">
        <div class="ContentsLeft">
          <div class="OperationTree">
            <ProjectDocumentTree @subtree="subtree" @subtrees="subtrees" @trreselct="trreselct" @GlobalSwitchTree="GlobalSwitchTree"></ProjectDocumentTree>
           <div class="NavigationHanges">
             <div></div>
           </div>
          </div>
        </div>
        <div class="ContentsRight">
          <div class="QueryLayout">
            <div>
              <el-input placeholder="请输入搜索关键词" suffix-icon="el-icon-search" v-model="QueryObject.documentName" @input="inputChange">
              </el-input>
            </div>
            <div style="margin-left: 15px">
              <el-select v-model="QueryObject.version" placeholder="请选择版本号">
                <el-option v-for="(item, index) in versions" :key="index" :label="item" :value="item"> </el-option>
              </el-select>
            </div>
            <div style="margin-left: 15px">
              <el-select v-model="QueryObject.contractor" placeholder="请选择承包商">
                <el-option v-for="(item, index) in contractors" :key="index" :label="item" :value="item"> </el-option>
              </el-select>
            </div>
            <div style="margin-left: 15px">
              <el-select v-model="QueryObject.contractNumber" placeholder="请选择合同编号">
                <el-option v-for="(item, index) in contractNumbers" :key="index" :label="item" :value="item"> </el-option>
              </el-select>
            </div>
            <div style="margin-left: 15px">
              <el-select v-model="QueryObject.fileType" placeholder="请选择格式">
                <el-option v-for="(item, index) in fileTypes" :key="index" :label="item" :value="item"> </el-option>
              </el-select>
            </div>
            <div style="margin-left: 10px">
              <el-button type="primary" @click="refer">查询</el-button>
            </div>
            <div style="margin-left: 5px">
              <el-button @click="reset">重置</el-button>
            </div>
          </div>
          <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="item in calstr" :key="item.id">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="FunctionButtonlayout">
            <div style="margin-right: 5px"><el-button type="success" icon="el-icon-plus" @click="ProjectDocumentUpload">上传</el-button></div>
            <div style="margin-right: 5px">
              <el-button type="danger" icon="el-icon-delete" @click="DeleteProjectmanagements" v-show="fileType != '文件夹'">批量删除</el-button>
            </div>
            <div style="margin-right: 5px">
              <el-button type="warning" icon="el-icon-edit" @click="bulkEditing" v-if="fileType != '文件夹'">批量修改</el-button>
            </div>
            <div style="margin-right: 5px">
              <el-button type="primary" class="iconfont icon-icon_input fontsi" @click="toguideinto">导入</el-button>
            </div>
            <div v-if="fileType != '文件夹'">
              <el-dropdown @command="handleCommand">
                <el-button type="primary" class="iconfont icon-icon_upload fontsi"> 导出<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="0">导出全部</el-dropdown-item>
                  <el-dropdown-item command="1">导出所选</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="FormContent">
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
              @orderBys="orderBys"
              :empty.sync="empty"
              @returnToMulti="returnToMulti"
            >
              <template v-slot:imgName="data">
                <div>
                  <template>
                    <div style="padding-left: 10px">
                      <a v-if="data.data.fileType == 'pdf'" :href="data.data.fileUrl" target="_blank" style="cursor: pointer">{{
                        data.data.documentName
                      }}</a>
                      <a v-else @click="UnableToClick">{{ data.data.documentName }}</a>
                    </div>
                  </template>
                </div>
              </template>
              <template v-slot:status="data">
                <el-button type="text" size="mini" @click="ViewProjectManagement(data)">{{ data.data.fileType == '文件夹' ? '' : '查看' }}</el-button>
                <el-button type="text" size="mini" @click="ViewProjectManagements(data)">{{
                  data.data.fileType == '文件夹' ? '' : '编辑'
                }}</el-button>
                <el-button type="text" size="mini" @click="DeleteProjectmanagement(data)">{{
                  data.data.fileType == '文件夹' ? '' : '删除'
                }}</el-button>
              </template>
            </tables>
          </div>
        </div>
      </div>
      <footers></footers>
    </div>
    <ProjectDocumentviewcomponent
      :ViewEngineeringDocuments.sync="ViewEngineeringDocuments"
      @ViewAndCloseEngineeringDocuments="ViewAndCloseEngineeringDocuments"
      :id="id"
    ></ProjectDocumentviewcomponent>
    <DocumentUpload :UploadOpen.sync="UploadOpen" @UploadClose="UploadClose" @trreselct="trreselct" @getAllThe="getAllThe"></DocumentUpload>
    <EngineeringDocumentEditing
      :ProjectDocumentEditOpen.sync="ProjectDocumentEditOpen"
      @EngineeringDocumentEditClose="EngineeringDocumentEditClose"
      @trreselct="trreselct"
      :id="id"
      @getAllThe="getAllThe"
    ></EngineeringDocumentEditing>
    <batchModifying :doorOpen.sync="doorOpen" @changeIsclosed="changeIsclosed" :ids="ids" @trreselct="trreselct"></batchModifying>
    <tolead :openTheImport.sync="openTheImport" @importedClosed="importedClosed" @trreselct="trreselct"></tolead>
  </div>
</template>
<script>
import footers from '../components/footer/index'
import tables from './tableo/index'
import ProjectDocumentTree from './ProjectDocumentTree/index'
import ProjectDocumentviewcomponent from './ProjectDocumentviewcomponent/index'
import DocumentUpload from './DocumentUpload/index'
import EngineeringDocumentEditing from './EngineeringDocumentEditing/index'
import batchModifying from './batchModifying/index'
import tolead from './tolead/index'
import {
  engineeringDocumentsInformationIist,
  engineeringDocumentsInformationsave,
  engineeringDocumentsInformationtoremove,
  engineeringDocumentsInformationdict,
  engineeringDocumentsInformationtoexport,
  acceptanceReportremoveAfter,
  acceptanceReportreupdateAfter,
} from '@/api/ProjectManagementinterface'
export default {
  components: {
    tables,
    ProjectDocumentTree,
    ProjectDocumentviewcomponent,
    DocumentUpload,
    EngineeringDocumentEditing,
    batchModifying,
    tolead,
    footers,
  },
  data() {
    return {
      //全局开关
      GlobalSwitch:0,
      //导出选中
      reportCode: '',
      //是文档隐藏按钮
      fileType: '',
      //导出数组
      TemplateArr: [
        {
          value: 1,
          name: '导出全部',
        },
        {
          value: 2,
          name: '导出多选',
        },
      ],
      /*************table组件****************** */
      //公共表头
      titles: [
        { lable: '名称', typeRow: 'slot', slotName: 'imgName' },
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
      //清空多选
      empty: 0,
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
      //查看组件开
      ViewEngineeringDocuments: false,
      //查看或编辑用的id
      id: '',
      //上传文档开
      UploadOpen: false,
      //编辑文档打开
      ProjectDocumentEditOpen: false,
      //批量修改开门
      doorOpen: false,
      //导入打开
      openTheImport: false,
      /*************查询的数据**************** */
      QueryObject: {
        documentName: '',
        version: '',
        contractor: '',
        contractNumber: '',
        fileType: '',
        orderBy: '',
      },
      //版本号的下拉
      versions: [],
      //承包商的下拉
      contractors: [],
      //合同编号的下拉
      contractNumbers: [],
      //格式的下拉
      fileTypes: ['pdf', 'word', 'dwg'],
      //搜索用的id
      directoryTableId: '10086',
      /******************************** */
      //面报削的导航数组
      calstr: [],
    }
  },
  methods: {
    /********************全局查询开关******************** */
    GlobalSwitchTree(val){
      this.GlobalSwitch=val
    },
    //不是pdf的提示
    UnableToClick() {
      this.$message({
        showClose: true,
        message: '该格式不支持预览',
      })
    },
    /**************************导出全部或部分*********************** */
    //返回多选清空的值
    returnToMulti(val) {
      this.empty = 0
    },
    //导出事件
    handleCommand(command) {
      //  console.log(command)
      if (command == 0) {
        if(this.GlobalSwitch == 0){
            if (this.directoryTableId != '10086') {
          let obj = {
            type: command,
            id: this.directoryTableId,
          }
          engineeringDocumentsInformationtoexport(obj).then(res => {
            // this.trreselct()
            this.empty = 1
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = `/fad/statistical/engineering-documents-information/export/${command}/${this.directoryTableId}`
            link.setAttribute('download', 'exemple') // 自定义下载文件名（如exemple.txt）
            // link.download=res.data.data[0].fileName
            document.body.appendChild(link)
            link.click()
          })
        } else {
          this.$message({
            message: `请选择左侧文件夹`,
            type: 'warning',
          })
        }
        }else{
           this.empty = 1
           this.$message({
            message: `请选择左侧文件夹`,
            type: 'warning',
          })
        }
      } else {
        if (this.ids.length > 0) {
          let str = this.ids.toString(',')
          let obj1 = {
            type: command,
            id: str,
          }
          engineeringDocumentsInformationtoexport(obj1).then(res => {
            // this.trreselct()
            this.empty = 1
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = `/fad/statistical/engineering-documents-information/export/${command}/${str}`
            link.setAttribute('download', 'exemple') // 自定义下载文件名（如exemple.txt）
            // link.download=res.data.data[0].fileName
            document.body.appendChild(link)
            link.click()
          })
        } else {
          this.$message({
            message: `请选择导出的文件`,
            type: 'warning',
          })
        }
      }
    },
    /************************************************** */
    /****************************获取子组件返回的数*******************************/
    subtree(val) {
      //  console.log(val,".1.111.")
      this.calstr = val
    },
    subtrees(val) {
      //  console.log(val,"/*/*/*")
      this.directoryTableId = val
    },
    /*************************************************************** */
    //切换树宽度的方法
    SwitchTreeWidth() {
      this.ToggleArrow == true ? (this.ToggleArrow = false) : (this.ToggleArrow = true)
    },
    /*************table的区域************ */
    //当前第几页
    page(val) {
      this.pageNum = val
      let obj = {
        contractNumber: this.QueryObject.contractNumber,
        contractor: this.QueryObject.contractor,
        directoryTableId: this.GlobalSwitch == 0? this.directoryTableId:"",
        documentName: this.QueryObject.documentName,
        fileType: this.QueryObject.fileType,
        id: '',
        pageNum: val,
        pageSize: this.pageSize,
        version: this.QueryObject.version,
        orderBy: this.orderBy,
      }
      engineeringDocumentsInformationIist(obj).then(res => {
        // console.log(res)
        this.tableData = res.data.rows.map(item => {
          if (item.attachments != null) {
            item.fileType = item.attachments.fileType
            item.fileSize = item.attachments.fileSize
            return item
          } else {
            return item
          }
        })
      })
    },
    //每页多少条
    size(val) {
      this.pageSize = val
      let obj = {
        contractNumber: this.QueryObject.contractNumber,
        contractor: this.QueryObject.contractor,
        directoryTableId:  this.GlobalSwitch == 0? this.directoryTableId:"",
        documentName: this.QueryObject.documentName,
        fileType: this.QueryObject.fileType,
        id: '',
        pageNum: this.pageNum,
        pageSize: val,
        version: this.QueryObject.version,
        orderBy: this.orderBy,
      }
      engineeringDocumentsInformationIist(obj).then(res => {
        // console.log(res)
        this.tableData = res.data.rows.map(item => {
          if (item.attachments != null) {
            item.fileType = item.attachments.fileType
            item.fileSize = item.attachments.fileSize
            return item
          } else {
            return item
          }
        })
      })
    },
    //批量删除
    idArr(val) {
      //  console.log(val)
      this.ids = val
    },
    /******************************************** */
    /****************查看**************** */
    ViewProjectManagement(val) {
      this.ViewEngineeringDocuments = true
      this.id = val.data.id
    },
    //接受返回的数据
    ViewAndCloseEngineeringDocuments(val) {
      this.ViewEngineeringDocuments = val
    },
    /********************************* */
    /***************上传**************** */
    ProjectDocumentUpload() {
      this.UploadOpen = true
    },
    //接受返回数据
    UploadClose(val) {
      this.UploadOpen = val
    },
    /******************************* */
    /*****************编辑**************** */
    ViewProjectManagements(val) {
      this.ProjectDocumentEditOpen = true
      this.id = val.data.id
    },
    //关闭
    EngineeringDocumentEditClose(val) {
      this.ProjectDocumentEditOpen = val
    },
    /*********************************** */
    /***********************批量修改关******************** */
    bulkEditing() {
      if(this.ids.length>0){
       this.doorOpen = true
      }else{
         this.$message({
          message: `至少选择一条数据`,
          type: 'warning',
        })
      }
    },
    changeIsclosed(val) {
      console.log(val)
      this.doorOpen = val
    },
    /***************************************** */
    /**********************导入****************** */
    toguideinto() {
      this.openTheImport = true
    },
    importedClosed(val) {
      this.openTheImport = val
    },
    /*************************************** */
    /*******************删除或批量删除******************* */
    //删除
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
          engineeringDocumentsInformationtoremove(obj).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
              this.trreselct()
              this.getAllThe()
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
            engineeringDocumentsInformationtoremove(obj).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: `${res.data.msg}`,
                  type: 'success',
                })
                this.trreselct()
                this.getAllThe()
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
    /************************************** */
    //接受表格排序
    orderBys(val) {
      console.log(val,"解雇")
      let order = val.order == 'ascending' ? ' asc' : ' desc'
      let prop =
        val.prop == 'fileSize'
          ? 'sa.FILE_SIZE'
          : val.prop == 'version'
          ? 'edi.VERSION'
          : val.prop == 'createTime'
          ? 'edi.CREATA_TIME'
          : 'edi.DOCUMENT_NAME'
      this.orderBy = prop + order
      this.trreselct()
    },
    //查询
    refer() {
      this.GlobalSwitch = 1
     this.trreselct()
    },
    //input为空查询所有
    inputChange(val) {
      if (val == '') {
        this.trreselct()
      }
    },
    //重置
    reset() {
      this.QueryObject.documentName = ''
      this.QueryObject.version = ''
      this.QueryObject.contractor = ''
      this.QueryObject.contractNumber = ''
      this.QueryObject.fileType = ''
      this.trreselct()
    },
    /***************公共查询******************* */
    trreselct() {
      this.pageNum = 1
      let obj = {
        contractNumber: this.QueryObject.contractNumber,
        contractor: this.QueryObject.contractor,
        directoryTableId: this.GlobalSwitch == 0? this.directoryTableId:"",
        documentName: this.QueryObject.documentName,
        fileType: this.QueryObject.fileType,
        id: '',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        version: this.QueryObject.version,
        orderBy: this.orderBy,
      }
      engineeringDocumentsInformationIist(obj).then(res => {
        console.log(res, '*/*/*')
        this.tableData = res.data.rows.map(item => {
          if (item.attachments != null) {
            item.fileType = item.attachments.fileType
            item.fileSize = item.attachments.fileSize
            return item
          } else {
            return item
          }
        })
        if (res.data.rows.length > 0) {
          this.fileType = res.data.rows[0].fileType
        } else {
          this.fileType = '文件夹'
        }
        console.log(this.fileType)
        this.total = res.data.total
      })
    },
    //左侧树点击获取获取列表公共
    //     trreselctLfet() {
    //   this.pageNum = 1
    //   let obj = {
    //     contractNumber: this.QueryObject.contractNumber,
    //     contractor: this.QueryObject.contractor,
    //     directoryTableId: this.directoryTableId,
    //     documentName: this.QueryObject.documentName,
    //     fileType: this.QueryObject.fileType,
    //     id: '',
    //     pageNum: this.pageNum,
    //     pageSize: this.pageSize,
    //     version: this.QueryObject.version,
    //     orderBy: this.orderBy,
    //   }
    //   engineeringDocumentsInformationIist(obj).then(res => {
    //     console.log(res, '*/*/*')
    //     this.tableData = res.data.rows.map(item => {
    //       if (item.attachments != null) {
    //         item.fileType = item.attachments.fileType
    //         item.fileSize = item.attachments.fileSize
    //         return item
    //       } else {
    //         return item
    //       }
    //     })
    //     if (res.data.rows.length > 0) {
    //       this.fileType = res.data.rows[0].fileType
    //     } else {
    //       this.fileType = '文件夹'
    //     }
    //     console.log(this.fileType)
    //     this.total = res.data.total
    //   })
    // },
    //获取所有下拉
    getAllThe() {
      engineeringDocumentsInformationdict().then(res => {
        //  console.log(res,"/*/*/*/*/")
        this.versions = res.data.data.versions
        this.contractors = res.data.data.contractors
        this.contractNumbers = res.data.data.contractNumbers
      })
    },
  },
  created() {
    this.trreselct()
    this.getAllThe()
  },
}
</script>
<style lang="scss">
#EngineeringDocuments {
  width: 100%;
  height: 100vh;
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
  /******************整体交互布局**************************** */
  .Contents {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .ContentsLeft {
    // height:91vh;
    // border-right: solid 1px #cccccc;
    padding: 10px 0 0 10px;
    //  overflow-y: auto;
     position: relative;
  }
  .ContentsRight {
    border-left: solid 1px #cccccc;
    width: 100%;
    overflow-y:auto;
    min-height: 100vh;
    max-height: 100%;
  }
  .QueryLayout {
    display: flex;
    flex-direction: row;
    padding: 10px 10px;
    justify-content: flex-start;
    border-bottom: solid 1px #cccccc;
  }
  .crumbs {
    padding: 10px 10px;
    border-bottom: solid 1px #cccccc;
  }
  .FunctionButtonlayout {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px 10px;
  }
  .FormContent {
    padding: 10px 10px;
  }
  .OperationTree {
    min-width: 250px;
    max-width: 400px;
    height: 100vh;
    margin-top: 5px;
    overflow-y: auto;
    //  height: 200px;
  }
  .coord {
    position: relative;
  }
  .fontsi {
    font-size: 12px;
  }
  //导航点击改变宽度外层的div
  // .NavigationHanges{
  // width: 13px;
	// height: 52px;
  // position: absolute;
  // top:273px;
  // right: 0px;
	// background-color: #ffffff;
	// border: solid 1px #cccccc;
  // }
  /**************************** */
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>