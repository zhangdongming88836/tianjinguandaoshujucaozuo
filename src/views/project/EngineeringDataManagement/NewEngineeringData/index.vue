<template>
  <div id="NewProject">
    <div style="padding: 25px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        stripe
        style="width: 100%"
        :header-cell-style="{ background: '#ecf5ff', color: '#606266' }"
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @sort-change="sschange"
      >
        <el-table-column v-if="see" type="selection" width="50"></el-table-column>

        <template v-for="item in titles">
          <el-table-column
            v-if="item.typeRow === 'slot'"
            :key="item.id"
            :prop="item.field"
            :label="item.lable"
            header-align="center"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <slot :name="item.slotName" :data="scope.row"></slot>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="item.id"
            :prop="item.field"
            :label="item.lable"
            header-align="center"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </template>
      </el-table>
      <div class="positiones">
        <div></div>
        <div>
          <div class="paging">
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                background
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <!-- <div style="width: 99.8%; border: 1px solid #cccccc"></div>
      <div style="height: 10px"></div>
      <div class="lkjh">
        <el-button @click="UploadOpen = false">取 消</el-button>
        <el-button type="primary" @click="UploadOpenss">确 定</el-button>
      </div>
      <div style="height: 10px"></div> -->
    </div>
  </div>
</template>
<script>
import { selectFileUrl, selectDocumentsInfo, update, selectTableInfo,selectAllDocumentsInfo } from '@/api/QueryAndStatisticss'
export default {
  props: ['DocumentForm', 'reportCode', 'GprojectName','row'],
  data() {
    return {
      GprojectName: '',
      reportCode: '',
      //行数
      row:"",
      //显示多选框
      see: true,
      //总页数
      total: '',
      //每页条数
      pageSize: 10,
      titles: [
        { lable: '阶段', field: 'documentLocation' },
        { lable: '格式', field: 'documentName' },
      ],
      tableData: ['22', '22', '22', '22'],
      // //多选删除的数组
      multipleSelection: [],
      docuPath: [],
      //  //当前页数
      pageNum: 1,
    }
  },
  methods: {
    // open() {
    //   //   let obj ={
    //   //     pageSize:this.pageSize,
    //   //     pageNum:this.pageNum
    //   //   }
    //   //  selectDocumentsInfo(obj).then(res=>{
    //   //    console.log(res)
    //   //    this.tableData = res.data.data.rows
    //   //    this.total = res.data.data.total
    //   //  })
    //   // let obj = {
    //   //   projectId: this.GprojectName,
    //   //   reportCode: this.reportCode,
    //   // }
    //   // selectTableInfo(obj).then(res => {
    //   //   console.log(res)
    //   //   this.titles = res.data.data.heads
    //   //   this.tableData = res.data.data.rows
    //   // })
    // },
    // close() {
    //   this.$emit('UploadClose', false)
    // },
    //每页多少条
    handleSizeChange(val) {
      console.log(val, '第几条')
      this.pageSize = val
      this.pageNum = 1
      let obj = {
        pageSize: val,
        pageNum: 1,
      }
      selectAllDocumentsInfo(obj).then(res => {
        console.log(res)
        this.tableData = res.data.data.rows
        this.total = res.data.data.total
      })
    },
    //当前第几页
    handleCurrentChange(val) {
      console.log(val, '第几页')
      this.pageNum = val
      let obj = {
        pageSize: this.pageSize,
        pageNum: val,
      }
      selectAllDocumentsInfo(obj).then(res => {
        console.log(res)
        this.tableData = res.data.data.rows
        this.total = res.data.data.total
      })
    },
    //全选框
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => {
        return item.id
      })
    },
    //点击确认关联
    UploadOpenss() {
      let str = this.multipleSelection.toString()
      console.log(str)
      let obj = {
        docuId: str,
        projectId: this.GprojectName,
        reportCode: this.reportCode,
      }
      update(obj).then(res => {
        console.log(res)
        if (res.data.status == 200) {
          this.$message({
            message: `${res.data.message}`,
            type: 'success',
          })
          this.$emit('UploadClose', false)
        } else {
          this.$message({
            message: `${res.data.message}`,
            type: 'warning',
          })
        }
      })
    },
  },
  watch: {
    GprojectName: {
      immediate: true,
      deep: true,
      handler(val) {
        this.GprojectName = val
      },
    },
    reportCode: {
      immediate: true,
      deep: true,
      handler(val) {
        this.reportCode = val
      },
    },
    DocumentForm: {
      immediate: true,
      deep: true,
      handler(val) {
        this.DocumentForm = val
      },
    },
    row: {
      immediate: true,
      deep: true,
      handler(val) {
        this.row = val
           let obj = {
      pageSize: this.pageSize,
      pageNum: this.pageNum,
      // GprojectName:this.GprojectName,
      // reportCode:this.reportCode,
      // row:this.row
    }
    selectAllDocumentsInfo(obj).then(res => {
      console.log(res)
      this.tableData = res.data.data.rows
      this.total = res.data.data.total
    })
      },
    },
    multipleSelection: function (newVal, oldVal) {
      this.$emit('UploadClose', newVal)
    },
  },
  created() {
    let obj = {
      pageSize: this.pageSize,
      pageNum: this.pageNum,
      // GprojectName:this.GprojectName,
      // reportCode:this.reportCode,
      // row:this.row
    }
    selectAllDocumentsInfo(obj).then(res => {
      console.log(res)
      this.tableData = res.data.data.rows
      this.total = res.data.data.total
    })
  },
}
</script>
<style lang="scss">
#NewProject {
  .paging {
    width: 100%;
    height: 32px;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .el-table td div {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-around !important;
    padding-left: 5px !important;
  }
  .positiones {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  /********************************** */
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
    width: 900px;
    margin-bottom: 30px;
  }

  #customers td,
  #customers th {
    border: 1px solid #dcdcdc;
    text-align: center;
    padding: 8px;
    width: 60px;
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
    width: 60px;
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
    width: 1200px;
    overflow: auto;
    margin: auto;
  }
}
</style>