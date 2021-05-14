<template>
  <div id="QueryAndStatistics">
    <div class="Tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="高级报表" name="first">
          <div class="OperationAreaa">
            <div class="OperationArea">
              <div>
                <el-select v-model="obj.reportName" placeholder="请选择管线" @change="popeChange" style="width:250px;">
                  <el-option v-for="item in pipelines" :key="item.pipeNumber" :label="item.pipeName" :value="item.pipeNumber"> </el-option>
                </el-select>
              </div>
              <div>
                <el-select v-model="reportInfo" multiple collapse-tags style="margin-left: 20px;width:250px;" placeholder="请选择数据表" @change="dxuan">
                  <el-option v-for="item in reportInfos" :key="item.reportCode" :label="item.reportName" :value="item.reportCode"> </el-option>
                </el-select>
              </div>
              <div :class="[code == 1 ? 'GenerateButton' : 'GenerateButtons']" @click="GenerateTemplate">
                生成关联关系模板
                <i :class="[code == 1 ? 'InvertedTriangle' : 'InvertedTriangles']"></i>
              </div>
            </div>
            <div>
              <el-button  type="primary" class="iconfont icon-icon_upload  fontsi" @click="dcbb">导出报表</el-button>
            </div>
          </div>
          <!-- 显示生成报表div -->
          <div v-show="code != 1" class="Templates">
            <div>
              <div style="padding: 30px">
                <div class="TemplatesContent">
                  <div class="SelectTemplateLayout">
                    <el-radio-group v-model="reportCode" style="width: 100%" @change="SelectChange">
                      <!-- <div> -->
                      <el-radio-button v-for="item in TemplateArr" :key="item.reportCode" :label="item.reportCode">{{ item.reportName }}</el-radio-button>
                      <!-- </div> -->
                    </el-radio-group>
                  </div>
                  <div>
                    <el-transfer
                      :titles="['待选列表', '已选列表']"
                      v-model="values"
                      :data="dialogList"
                      :props="{ key: 'tid', label: 'fieldName' }"
                      @change="handleChange"
                    >
                    </el-transfer>
                  </div>
                </div>
              </div>
              <div class="butm">
                <div style="margin-right: 30px">
                  <el-button type="primary" @click="generate">生成报表</el-button>
                  <el-button @click="qxsc">取消</el-button>
                </div>
              </div>
            </div>
          </div>
          <!-- 显示生成报表div结束-->
          <!-- 进入显示的没有数据 -->
          <div class="bgimg" v-if="NotYet">
            <img src="../../../assets/menu/image.png" alt="" />
            <p class="posin">暂无数据</p>
          </div>
          <!-- 进入显示的没有数据结束 -->
          <div v-if="tabletrue" class="modle">
            <template>
              <div class="tableaf">
              <table id="customers">
                <tr>
                  <th v-for="item in titles" :key="item.id">{{ item }}</th>
                </tr>
                <tr v-for="items in tableData" :key="items.id">
                  <td v-for="itear in items" :key="itear.id">{{ itear }}</td>
                </tr>
              </table>
              </div>
            </template>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="统计分析" name="second">统计分析</el-tab-pane> -->
      </el-tabs>
    </div>
    <footers></footers>
  </div>
</template>
<script>
import footers from "../components/footer/index"
import {
  queryStatisticsseaPipe,
  queryStatisticsReportInfo,
  queryStatisticsreportData,
  queryStatisticsgetReport,
  queryStatisticsgetdownReport,
} from '@/api/querystatistics'
export default {
components:{
  footers
},
  data() {
    return {
      //已选中的标签
      activeName: 'first',
      //根据code显示模块
      code: 1,
      //暂无数据图片隐藏、
      NotYet: true,
      //生成模板后选中的数据表
      reportCode: '',
      //表格显示隐藏
      tabletrue: false,
      //关联模块数组
      TemplateArr: [
        { a: '管来奶属地', id: '1' },
        { a: '管来奶属', id: '2' },
        { a: '管来奶', id: '3' },
        { a: '管来', id: '4' },
        { a: '管', id: '5' },
        { a: '管来奶属地化ads', id: '6' },
        { a: '管来奶属地化da', id: '7' },
        { a: '管来奶属地化f', id: '8' },
        { a: '管来奶属地化g', id: '9' },
        { a: '管来奶属地化h', id: '10' },
      ],
      //选中模板
      SelectTemplate: '',
      /***************穿梭框区域****************** */
      //待选取
      dialogList: [],
      //已选的数组
      values: [],
      dialogLists: [],
      /********************************* */
      /********************下拉区域******************* */
      obj: {
        //管线选中的编号
        reportName: '',
        //数据表
        remark: '',
      },
      //数据表选中
      reportInfo: [],
      //管线数组
      pipelines: [],
      //数据表数组
      reportInfos: [],
      /************************************ */
      /*************table组件****************** */
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
    }
  },
  methods: {
    /*****************穿梭框区域********************* */
    handleChange(val) {
      console.log(val)
      console.log(this.values)
    },
    /************************************ */
    /******************管线下拉改变*********************** */
    popeChange(val) {
     // console.log(val)
     this.reportInfo = []
      let objs = {
        reportName:val
      }
       queryStatisticsReportInfo(objs).then(res => {
      console.log(res)
      this.reportInfos = res.data.data
    })
      objs = this.pipelines.find(item => {})
      this.code = 1
      this.TemplateArr = []
      this.dialogList = []
      this.values = []
      this.tabletrue = false
      this.NotYet = true
      this.reportCode = ''
    },
    //数据表多选改变
    dxuan(val) {
      this.code = 1
      this.TemplateArr = []
      this.dialogList = []
      this.values = []
      this.tabletrue = false
      this.NotYet = true
      this.reportCode = ''
    },
    /********************************************* */
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
    //显示模板板块的方法
    GenerateTemplate() {
      console.log(this.code)
      if(this.obj.reportName == ''||this.reportInfo.length == 0){
          this.$message({
          message: '请选择海管、数据表',
          type: 'warning'
        });
        return false
      }
      if (this.code == 1) {
        this.obj.remark = this.reportInfo.toString(',')
        queryStatisticsReportInfo(this.obj).then(res => {
          console.log(res)
          this.TemplateArr = res.data.data
        })
        this.tabletrue = false
      }
      this.code == 1 ? (this.code = 0) : (this.code = 1)
      this.code == 1 ? (this.NotYet = true) : (this.NotYet = false)
      if (this.code == 1) {
        this.TemplateArr = []
        this.dialogList = []
        this.values = []
        this.reportCode = ''
      }
    },
    //改变选中模块
    SelectChange(val) {
      console.log(val,"369")
      let obj = {
        reportCode: val,
      }
      console.log(obj,"369")
      queryStatisticsreportData(obj).then(res => {
        console.log(res,"/*/*/*/")
        this.dialogList = res.data.data.map(item => {
          item.tid = item.englishFieldName + ',' + item.reportCode + '/' + item.fieldName
          return item
        })
        //  this.dialogList.forEach(item=>{
        //    this.dialogLists.push(item)
        //  })
        //  this.dialogLists = Array.from(new Set(this.dialogLists))
      })
    },
    /****************导出报表*********************** */
    dcbb() {
      let obj = {
        heads: this.titles,
        lists: this.tableData,
      }
      queryStatisticsgetdownReport(obj).then(res => {
        console.log(res)
        const fileName = res.headers['content-disposition']
        var arr = []
        arr = fileName.split('=')
        let name = arr[1]
        /********************************************************************** */
        const uA = window.navigator.userAgent
        const isIE = /msie\s|trident\/|edge\//i.test(uA) && !!('uniqueID' in document || 'documentMode' in document || ('ActiveXObject' in window) || 'MSInputMethodContext' in window)
         if (isIE) {
            navigator.msSaveBlob(new Blob([res.data]), name)        
        } else {
          var blob = new Blob([res.data], { type: 'application/msword;charset=utf-8' })
          var filename = name
          var a = document.createElement('a')
          var url = window.URL.createObjectURL(blob)
          a.href = url
          a.download = filename
          var body = document.getElementsByTagName('body')[0]
          body.appendChild(a)
          a.click()
          body.removeChild(a)
          window.URL.revokeObjectURL(url)
        }

        /*************************************************************************************** */
      //            var blob = new Blob([res.data], {type: 'application/msword;charset=utf-8'});
      //               var filename = '报表.xlsx';
      //               var a = document.createElement('a');
      //               var url = window.URL.createObjectURL(blob);
      //               a.href = url;
      //               a.download = filename;
      //               var body = document.getElementsByTagName('body')[0];
      //               body.appendChild(a);
      //               a.click();
      //               body.removeChild(a);
      //               window.URL.revokeObjectURL(url);
       })
    },
    /************************************* */
    //确定生成报表
    generate() {
      if (this.values.length == 0) {
        this.$message({
          message: '请选择报表内容',
          type: 'warning',
        })
        return false
      }
      let obj = {
        heads: [],
        datas: [],
        connectId:this.obj.reportName
      }
      console.log(this.values)
      this.values.forEach(item => {
        obj.heads.push(item.split('/')[1])
        obj.datas.push(item.split('/')[0])
        //  console.log(item)
      })
      //   this.values.forEach(item => {
      //   this.dialogLists.forEach(item2 => {
      //     // console.log(item2)
      //     if (item == item2.tid) {
      //       obj.heads.push(item2.fieldName)
      //     }
      //   })
      // })
      // console.log(this.dialogLists)
      queryStatisticsgetReport(obj).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.tabletrue = true
          this.titles = res.data.data.heads
          this.tableData = res.data.data.lists
          this.$message({
            message: `${res.data.msg}`,
            type: 'success',
          })
          this.NotYet = false
          this.code = 1
          this.TemplateArr = []
          this.dialogList = []
          this.values = []
          this.reportCode = ''
          this.obj.reportName = '',
          this.reportInfo = ''
        } else {
          this.$message({
            message: `${res.data.msg}`,
            type: 'warning',
          })
        }
      })
    },
    //点击取消
    qxsc() {
       console.log(369)
      if (this.values.length > 0) {
        this.$confirm('如果关闭将无法保存已选的内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.NotYet = true
            this.code = 1
            this.TemplateArr = []
            this.dialogList = []
            this.values = []
            this.reportCode = ''
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消',
            })
          })
      }else{
        this.NotYet = true
            this.code = 1
            this.TemplateArr = []
            this.dialogList = []
            this.values = []
            this.reportCode = ''
      }
    },
  },
  created() {
    queryStatisticsseaPipe().then(res => {
      // console.log(res)
      this.pipelines = res.data.data
    })
  },
}
</script>
<style lang="scss">
#QueryAndStatistics {
  .Tab {
    margin-top: 5px;
  }
  .OperationAreaa {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 20px 20px 20px;
    border-bottom: solid 1px #cccccc;
  }
  .OperationArea {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .InvertedTriangle {
    width: 0;
    height: 0;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-top: 5px solid #ffffff;
    position: absolute;
    top: 11px;
    right: 9px;
  }
  .InvertedTriangles {
    width: 0;
    height: 0;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-top: 5px solid #666666;
    position: absolute;
    top: 11px;
    right: 9px;
  }
  .GenerateButton {
    width: 160px;
    height: 28px;
    margin-left: 20px;
    background-color: #2ec47e;
    border-radius: 4px;
    text-align: center;
    line-height: 28px;
    color: #ffffff;
    position: relative;
    cursor: pointer;
  }
  .GenerateButtons {
    width: 160px;
    height: 28px;
    margin-left: 20px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #dedede;
    text-align: center;
    line-height: 28px;
    color: #666666;
    position: relative;
    cursor: pointer;
  }
  .Templates {
    width: 900px;
    height: 472px;
    margin-bottom: 200px;
    // padding: 30px;
    position: relative;
    top: -1px;
    left: 446px;
    border: solid 1px #cccccc;
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
  .TemplatesContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .SelectTemplateLayout {
    width: 191px;
    height: 360px;
    background-color: #ffffff;
    border: solid 1px #cccccc;
    overflow: auto;
  }
  .SelectTemplateLayouta {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
    border-bottom: solid 1px #cccccc;
  }
  .SelectTemplateLayoutaf {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: #5397ef;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    border-bottom: solid 1px #cccccc;
  }
  // .DividingLine {
  //   width: 100%;
  //   height: 1px;
  //   background-color: #cccccc;
  // }
  .butm {
    width: 100%;
    height: 50px;
    border-top: 1px solid #cccccc;
    line-height: 50px;
    text-align: right;
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
  .modle {
    width: 100%;
    height: 100vh;
  }
  .fontsi {
    font-size: 12px;
  }
  /**************************************************** */
  .el-radio-button {
    width: 100%;
    height: 40px;
  }
  .el-popover,
  .el-radio-button:first-child:last-child .el-radio-button__inner {
    border-radius: 0px !important;
    display: block !important;
    width: 100% !important;
    height: 40px;
    line-height: 24px;
  }
  .el-transfer-panel {
    width: 240px !important;
    height: 360px !important;
  }
  .el-transfer-panel__list.is-filterable {
    height: 200px;
  }
  .el-dialog__header {
    background-color: #0075cb;
  }
  .el-dialog__title {
    margin-left: -95%;
    color: #e4e4e4;
  }
  .el-icon-close:before {
    color: #e4e4e4;
  }
  .el-radio-button__inner {
    width: 100%;
    height: 40px;
    line-height: 25px;
  }
  .tableaf{
    width:100%;
    height: 600px;
    overflow: auto;
    
  }
}
</style>