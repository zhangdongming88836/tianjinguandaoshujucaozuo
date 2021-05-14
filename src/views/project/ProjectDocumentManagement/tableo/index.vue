<template>
  <div>
    <el-table
       ref="multipleTable"
      :data="tableData"
       border
       stripe
       style="width:100%"
      :header-cell-style="{ background: '#ecf5ff', color: '#606266' }"
      @selection-change="handleSelectionChange"
      :default-sort = "{prop: 'date', order: 'descending'}"
      @sort-change="sschange"
    >
      >
      <!-- 多选框 -->

      <el-table-column v-if="see" type="selection" width="50"></el-table-column>
      <!--  -->
      <template v-for="item in titles">
        <el-table-column
          v-if="item.typeRow === 'slot'"
          :key="item.id"
          :prop="item.field"
          :label="item.lable"
          header-align="center"
          align="center"
          :sortable = "item.lable == '名称' || item.lable == '版本号' || item.lable == '创建时间' || item.lable == '大小'"
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
          :sortable = "item.lable == '名称' || item.lable == '版本号' || item.lable == '创建时间' || item.lable == '大小'"
          :show-overflow-tooltip='true'
        >
        </el-table-column>
      </template>
      <!-- <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column> -->
    </el-table>
    <!-- ******************************************************** -->
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
  </div>
</template>
<script>
export default {
  props: ["titles", "tableData", "total", "see","pageSize" ,"pageNum",'empty'],
  data() {
    return {
      //触发排序
     TriggerSort:false,
      // //显示多选框
      // see: false,
      // //总页数
      // total: "",
      //每页条数
      // pageSize:2,
      // tableHeader: [],
      // tableData: [
      //   // {
      //   //   date: "2016-05-02",
      //   //   name: "王小虎",
      //   //   address: "上海市普陀区金沙江路 1518 弄",
      //   // },
      //   // {
      //   //   date: "2016-05-04",
      //   //   name: "王小虎",
      //   //   address: "上海市普陀区金沙江路 1517 弄",
      //   // },
      //   // {
      //   //   date: "2016-05-01",
      //   //   name: "王小虎",
      //   //   address: "上海市普陀区金沙江路 1519 弄",
      //   // },
      //   // {
      //   //   date: "2016-05-03",
      //   //   name: "王小虎",
      //   //   address: "上海市普陀区金沙江路 1516 弄",
      //   // },
      // ],
      // //多选删除的数组
      multipleSelection: [],
    //  //当前页数
       pageNum:1,
    };
  },
watch: {
  //   titles: {
  //     immediate: true,
  //     deep: true,
  //     handler(newName, oldName) {
  //       // console.log(newName);
  //       this.tableHeader = newName;
  //       //  console.log(oldName)
  //     },
  //   },
  //   tableData: {
  //     immediate: true,
  //     deep: true,
  //     handler(newName, oldName) {
  //       // console.log(newName);
  //       this.tableData = newName;
  //       //  console.log(oldName)
  //     },
  //   },
  //   total: {
  //     immediate: true,
  //     deep: true,
  //     handler(newName, oldName) {
  //       // console.log(newName);
  //       this.total = newName;
  //       //  console.log(oldName)
  //     },
  //   },
  //   see: {
  //     immediate: true,
  //     deep: true,
  //     handler(newName, oldName) {
  //       // console.log(newName);
  //       this.see = newName;
  //       //  console.log(oldName)
  //     },
  //   },
  //   pageSize: {
  //     immediate: true,
  //     deep: true,
  //     handler(newName, oldName) {
  //       // console.log(newName);
  //       this.pageSize = newName;
  //       //  console.log(oldName)
  //     },
  //   },
    // pageNum: {
    //   immediate: true,
    //   deep: true,
    //   handler(newName, oldName) {
    //     // console.log(newName);
    //     this.pageNum = newName;
    //     //  console.log(oldName)
    //   },
      empty(newName, oldName) {
      console.log(newName, '963852741')
      if (newName == 1) {
        //清空表格多选框
        this.$refs.multipleTable.clearSelection()
        this.multipleSelection = []
        this.$emit('returnToMulti', 0)
      }
    },
},
  //},
  //  created(){
  //    this.GetHeader()
  //    this.Getdata()
  //  },
  methods: {
    //每页多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.$emit('size',val)

    },
    //当前第几页
    handleCurrentChange(val) {
      // console.log(val,"***************")
      //  this.pageNum = val;
       this.$emit("page",val);
    },
    //全选框
    handleSelectionChange(val) {
     this.multipleSelection = val.map(item => {
       return item.id;
     })
     this.$emit("idArr",this.multipleSelection)
    },
    //监听顺序
    sschange(val){
     console.log(val,"顺序")
     this.$emit("orderBys",val)
    }
  },
};
</script>
<style lang="scss" scoped>
.paging {
  width:100%;
  height: 32px;
  margin-top:100px;
  margin-bottom: 50px;
}
.el-table td div {
   display: flex  !important;
    flex-direction: row  !important;
    justify-content: space-around !important;
    padding-left: 5px !important;
}
.positiones{
  display: flex;
  flex-direction:row;
  justify-content: space-between;
}
</style>
