<template>
  <div id="uedfg">
    <el-dialog title="批量修改" :visible.sync="doorOpen" width="47.4%" center @close="close" @open="open" :before-close="gbq">
      <div style="padding:25px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="原目录" prop="pName">
                <el-input v-model="ruleForm.pName" placeholder="原目录" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="AddDisplayTree">
                <el-form-item label="移动至目录:" prop="documentLocation">
                  <el-input
                    v-model="ruleForm.documentLocation"
                    @focus="inpuTfocus"
                    @blur="inpuTblur"
                    placeholder="请选择文件文位置"
                    suffix-icon="el-icon-arrow-down"
                  ></el-input>
                </el-form-item>
                <div class="DocumentTree" v-if="opens">
                  <div class="play">
                    <el-tree @node-click="handleNodeClick" :props="props" :load="loadNode" accordion lazy ref="asyncTree"> </el-tree>
                  </div>
                  <div>
                    <div style="width: 150px; margin-left: 70%; margin-bottom: 5px">
                      <el-button type="primary" @click="SelectDocumentTree">确定</el-button>
                      <el-button @click="CancelDocumentTree">取消</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
       <div style="width:99.5%;border:1px solid #cccccc"></div>
        <div style="height:10px"></div>
       <div class="jklh">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
       </div>
       <div style="height:10px"></div>
    </el-dialog>
  </div>
</template>
<script>
import {
  engineeringDocumentsInformationIist,
  engineeringDocumentsInformationsave,
  directoryTableEosOrg,
  engineeringDocumentsInformationtoSave,
  engineeringDocumentsInformationtoBatEdit,
  engineeringDocumentsInformationbatEdit,
  engineeringDocumentsInformatipdBatEdit
} from '@/api/ProjectManagementinterface'
export default {
  props: ['doorOpen', 'ids'],
  data() {
    return {
      /******************x新增的树文件按区域****************** */
      i: '',
      //编辑文件树打开
      opens: false,

      //传入懒加载局部刷新的id
      uid: '',
      //根据level判断是否可以增删改
      level: '',
      //已选要新建文件的父级目录
      label: '',
      //选中树节点放到当前数组的中
      trees: [],
      props: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      /*********************************** */
      /******************新增数据区域验证************************ */
      ruleForm: {
        ids: [],
        pName: '',
        documentLocation: '',
        //树的id
        directoryTableId: '10086',
      },
      //给后台的数据对象
      obj: {},
      rules: {
        documentLocation: [{ required: true, message: '请选择文档位置', trigger: 'change' }],
        // ats: [{  required: true, message: '请上传文件', trigger: 'change' }],
      },
      //  ats:[],
      /****************************************** */
    }
  },
  methods: {
    /**************获取焦点获取文件树******************** */
    //书的div显示
    inpuTfocus() {
      this.opens = true
    },
    //点击该节点
    handleNodeClick(data) {
      this.ruleForm.directoryTableId = data.id
      this.level = data.level
      this.label = data.label
      let str = data.level - 1
      this.trees.splice(str)
      this.trees.push(data)
    },
    //懒加载
    loadNode(node, resolve) {
      if (node.level === 0) {
        // console.log(node,111111111)
        // console.log(resolve,1111111111111)
        let data = []
        directoryTableEosOrg(10086).then(res => {
          // console.log(res);
          data = res.data.data
          return resolve(data)
        })
      }
      //   if (node.level > 5) return resolve([]);

      if (node.level > 0) {
        //   console.log(node,2222222222)
        // console.log(resolve,2222222222)
        this.ruleForm.directoryTableId = node.data.id
        this.level = node.data.level
        this.label = node.data.label
        let str = node.data.level - 1
        this.trees.splice(str)
        this.trees.push(node.data)
        this.i = setTimeout(() => {
          let data = []
          directoryTableEosOrg(node.data.id).then(res => {
            // console.log(res, '***')
            data = res.data.data
            return resolve(data)
          })
        }, 50)
      }
    },
    //选中确定文档
    SelectDocumentTree() {
      let arr = []
      this.trees.forEach(item => {
        return arr.push(item.label)
      })
      // console.log(arr)
      this.ruleForm.documentLocation = arr.join('/')
      console.log(this.ruleForm.documentLocation)
      this.opens = false
    },
    //取消树文档div
    CancelDocumentTree() {
      this.opens = false
    },
    /********************************** */
    //取消
    resetForm() {
      if (this.ruleForm.documentLocation != '') {
        this.$confirm('如果关闭将无法保存已填写的内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$emit('changeIsclosed', false)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消',
            })
          })
      } else {
        this.$emit('changeIsclosed', false)
      }
    },
    //关闭前的回调
    gbq(done) {
      if (this.ruleForm.documentLocation != '') {
        this.$confirm('如果关闭将无法保存已填写的内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            done()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消',
            })
          })
      } else {
        done()
      }
    },
    close() {
      this.clearValidate('ruleForm')
      this.$emit('changeIsclosed', false)
      this.ruleForm.documentLocation = ''
      this.ruleForm.pName = ''
      this.opens = false
    },
    open() {
      let obj = {
        ids: this.ruleForm.ids,
      }
      engineeringDocumentsInformationtoBatEdit(obj).then(res => {
        //  console.log(res)
        this.ruleForm.pName = res.data.data.pName
        this.obj = res.data.data.edi
      })
      this.clearValidate('ruleForm')
    },
    //清空验证
    clearValidate(formName) {
      this.$refs[formName].clearValidate()
    },
    //确认发送数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.obj.directoryTableId = this.ruleForm.directoryTableId
          this.obj.documentLocation = this.ruleForm.documentLocation

          // engineeringDocumentsInformationbatEdit(this.obj).then(res => {
          //   console.log(res)
          //   if (res.data.code == 200) {
          //     this.$message({
          //       message: `${res.data.msg}`,
          //       type: 'success',
          //     })
          //     this.$emit('changeIsclosed', false)
          //     this.$emit('trreselct')
          //   } else {
          //     this.$message({
          //       message: `${res.data.msg}`,
          //       type: 'warning',
          //     })
          //   }
          // })
             engineeringDocumentsInformatipdBatEdit(this.obj).then(res => {
            if (res.data.code == 201) {
              this.$confirm(`${res.data.msg}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              })
                .then(() => {
                  engineeringDocumentsInformationbatEdit(res.data.data).then(res => {
                    if (res.data.code == 200) {
                      this.$message({
                        message: `${res.data.msg}`,
                        type: 'success',
                      })
                      this.$emit('changeIsclosed', false)
                      this.$emit('trreselct')
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
                    message: '已取消',
                  })
                })
            } else if (res.data.code == 500) {
              this.$message({
                message: `${res.data.msg}`,
                type: 'warning',
              })
            } else {
              //  console.log(res)
              engineeringDocumentsInformationbatEdit(res.data.data).then(res => {
                if (res.data.code == 200) {
                  this.$message({
                    message: `${res.data.msg}`,
                    type: 'success',
                  })
                 this.$emit('changeIsclosed', false)
                 this.$emit('trreselct')
                } else {
                  this.$message({
                    message: `${res.data.msg}`,
                    type: 'warning',
                  })
                }
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //公共查询树节点
    theTree() {
      directoryTableEosOrg(10086).then(res => {
        // console.log(res, '123456+++')
        this.props = res.data.data[0]
      })
    },
  },
  watch: {
    ids: {
      handler(val) {
        this.ruleForm.ids = val
      },
    },
  },
}
</script>
<style lang="scss">
#uedfg {
  .conter {
    padding-right: 38px;
  }
  .SplitLine {
    width: 100%;
    height: 1px;
    margin-bottom: 10px;
    background-color: #cccccc;
  }
  .AddDisplayTree {
    position: relative;
  }
  .DocumentTree {
    width: 84%;
    position: absolute;
    top: 28px;
    left: 100px;
    border: 1px solid #cccccc;
    background-color: #ffffff;
    z-index: 1;
  }
  .play {
    width: 500px;
    margin: 10px auto;
  }
  /************************************ */
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
    margin-left: -90% !important;
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
  .element.style {
    margin-left: 590px;
  }
     .el-dialog--center .el-dialog__body{
    padding: 0px !important;
  }
  .jklh{
    text-align: right;
    margin-right:20px;
  } 
}
</style>