<template>
  <div id="AddNewfolderS">
    <el-dialog title="新建文件夹" :visible.sync="addFolders" width="30%" center @open="open" @close="close" :before-close="gbq">
      <div class="centyu">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="父级目录" prop="labels">
            <el-input v-model="ruleForm.labels" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="width:99.5%;border:1px solid #cccccc"></div>
      <div class="righ">
          <el-button @click="resetForm('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
      <div style="height:10px"></div>
    </el-dialog>
  </div>
</template>
<script>
import { directoryTableSave } from '@/api/ProjectManagementinterface'
export default {
  props: ['addFolders', 'label',"id"],
  data() {
    return {
      ruleForm: {
        labels: '',
        name:"",
        parentId:"",
      },
      rules: {
        name: [
          { required: true, message: '请输入文件名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        labels: [{ required: true, message: '请选择父级目录', trigger: 'blur' }],
      },
    }
  },
  methods: {
    //关闭组件
    close() {
      this.$emit('CloseNewFolder', false)
      this.ruleForm.name =""
        this.clearValidate('ruleForm')
    },
    //打开组件
    open() {
        this.clearValidate('ruleForm')
    },
     //取消
    resetForm() {
      if (this.ruleForm.name != '' ) {
        this.$confirm('如果关闭将无法保存已填写的内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
           this.$emit('CloseNewFolder', false)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消',
            })
          })
      } else {
      this.$emit('CloseNewFolder', false)
      }  
    },
    //关闭前的回调
    gbq(done) {
      if (this.ruleForm.name != '' ) {
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
    //确定
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          directoryTableSave(this.ruleForm).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
             this.$emit('CloseNewFolder', false) 
             this.$emit("resetNode")
            } else {
              this.$message({
                message: `${res.data.msg}`,
                type: 'warning',
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
     //清空验证
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    }, 
  },
  watch: {
    label: {
      handler(val) {
        this.ruleForm.labels = val
      },
    },
    id: {
      handler(val) {
        // console.log(val)
        this.ruleForm.parentId = val
      },
    },
  },
}
</script>
<style lang="scss">
#AddNewfolderS {
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
    margin-left: -88% !important;
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
  .righ{
    text-align: right;
    margin-right:10px;
    margin-top:10px;
  }
  .el-dialog--center .el-dialog__body{
    padding:0px !important;
  }
  .centyu{
    width: 350px;
    margin:auto;
    padding: 25px 30px 25px 15px ;
  }
}
</style>