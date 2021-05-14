<template>
  <div id="treww">
    <div style="margin-left: 8px; margin-bottom: 10px; ">
      <el-button @click="NewFolder">新增</el-button>
      <el-button @click="EditFolder">编辑</el-button>
      <el-button @click="delets">删除</el-button>
    </div>
    <el-tree @node-click="handleNodeClick" :props="props" :load="loadNode" accordion lazy indent="9" ref="asyncTree" > </el-tree>
    <addFile :addFolders="addFolders" @CloseNewFolder="CloseNewFolder" :label="label" :id="id" @resetNode="resetNode"></addFile>
    <editFile :EditFolders="EditFolders" @EditFolderClosed="EditFolderClosed" :id="id" @resetNodeb="resetNodeb"></editFile>
  </div>
</template>
<script>
import addFile from './AddFile/index'
import editFile from './EditFolder/index'
import { directoryTableEosOrg, directoryTableremove } from '@/api/ProjectManagementinterface'
export default {
  components: {
    addFile,
    editFile,
  },
  data() {
    return {
      props: {},
      //新增打开关闭
      addFolders: false,
      //编辑文件打开
      EditFolders: false,
      //树的id
      id: '10086',
      /**********懒加载刷新数据************ */
      rootNode:{},
      rootReslove:{},
     /************************** */
      //根据level判断是否可以增删改
      level: '',
      //已选要新建文件的父级目录
      label: '',
      //选中树节点放到当前数组的中
      trees: [
        {
          lanle: '你',
          id: '1',
        },
        {
          lanle: 'hao',
          id: '2',
        },
        {
          lanle: '是',
          id: '3',
        },
        {
          lanle: '开',
          id: '4',
        },
        {
          lanle: '新',
          id: '5',
        },
      ],
    }
  },
  methods: {
    /***********************树操作区域******************************** */
    //点击该节点
    handleNodeClick(data) {
      this.id = data.id
      this.$emit("subtrees",data.id)
      this.level = data.level
      this.label = data.label
      let str = data.level - 1
      this.trees.splice(str)
      this.trees.push(data)
      this.$emit("subtree",this.trees)
      this.$emit("trreselct")
      this.$emit("GlobalSwitchTree",0)
    },
    //懒加载
    loadNode(node, resolve) {
      if (node.level === 0) {
        let data = []
        directoryTableEosOrg(10086).then(res => {
          data = res.data.data
          return resolve(data)
        })
      }
      if (node.level > 0) {
          this.rootNode = node
        this.rootReslove = resolve
      this.id = node.data.id
      this.$emit("subtrees",node.data.id)
      this.level = node.data.level
      this.label = node.data.label
      let str = node.data.level - 1
      this.trees.splice(str)
      this.trees.push(node.data)
      this.$emit("subtree",this.trees)
      this.$emit("trreselct")
      this.$emit("GlobalSwitchTree",0)
        setTimeout(() => {
          let data = []
          // console.log(this.id)
          directoryTableEosOrg(node.data.id).then(res => {
          
            data = res.data.data
            return resolve(data)
          })
        }, 50)
      }
    },
    /******************************************************** */
    /**************************文件增区域**************************** */
    //新增
    NewFolder() {
      if (this.level >= 7) {
        this.addFolders = true
      } else {
        this.$message({
          message: '该目录下不能新建文件',
          type: 'warning',
        })
      }
    },
    //新增打开
    CloseNewFolder(val) {
      this.addFolders = val
    },
    /***************************************************** */
    /**************************文件编辑区域**************************** */
    //编辑
    EditFolder() {
      if (this.level > 7) {
        this.EditFolders = true
      } else {
        this.$message({
          message: '该文件不能编辑',
          type: 'warning',
        })
      }
    },
    //编辑关闭
    EditFolderClosed(val) {
      this.EditFolders = val
    },
    /***************************************************** */
    /*************************删除***************** */
    delets() {
      if (this.level > 7) {
        this.$confirm('是否删除该文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            directoryTableremove(this.id).then(res => {
              // console.log(res)
              if (res.data.code == 200) {
                this.$message({
                  message: `${res.data.msg}`,
                  type: 'success',
                })
                 this.resetNodeb()
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
          message: '该文件不能删除',
          type: 'warning',
        })
      }
    },
    /****************************************** */
    /*****************懒加载局部刷新******************** */
    //新增的局部刷新
      resetNode(){
         //console.log("123+123+123")
        var theChildren = this.rootNode.childNodes
            theChildren.splice(0,theChildren.length)
            this.loadNode(this.rootNode,this.rootReslove)
      },
      //删除局部刷新
       resetNodeb(){
        // console.log(this.$refs.asyncTree)
        // console.log(this.rootNode)
        let paentId = this.rootNode.parent
        paentId.loaded = false
        // paentId.expanded = true
        paentId.expand()
        this.loadNode(this.rootNode,this.rootReslove)  
      },
    /**************************************** */
    //公共查询树节点
    theTree() {
      directoryTableEosOrg(10086).then(res => {
        // console.log(res, '123456+++')
        this.props = res.data.data[0]
      })
      this.resetNodeb()
    },
  },
  created() {
  }, 
}
</script>
<style lang="scss">
// #treww{
// //   height:100vh;
// //  overflow-y: auto;
// //  overflow: hidden;
// }
</style>