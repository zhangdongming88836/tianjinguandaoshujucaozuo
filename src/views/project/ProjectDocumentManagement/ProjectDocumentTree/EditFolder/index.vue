<template>
  <div id="AddNewfolderSs">
    <el-dialog title="编辑文件夹" :visible.sync="EditFolders" width="30%" center @open="open" @close="close" >
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
   
        <el-button  @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>

      </div>
      <div style="height:10px"></div>
    </el-dialog>
  </div>
</template>
<script>
import { directoryTableSave,directoryTabledetails,directoryTableupdate} from '@/api/ProjectManagementinterface'
export default {
  props: ['EditFolders','label',"id"],
  data() {
    return {
      ruleForm: {
        labels: '',
        name:"",
        parentIdd:"",
        id:""
        },
        rules: {
          name: [
            { required: true, message: '请输入文件名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          labels: [
            { required: true, message: '请选择父级目录', trigger: 'change' }
          ],
        }
    }
  },
  methods: {
      //关闭组件
    close() {
      this.$emit('EditFolderClosed', false)
      this.clearValidate('ruleForm')
    },
    //打开组件
    open() {
    directoryTabledetails(this.ruleForm.parentIdd).then(res=>{
      this.ruleForm.labels = res.data.data.pName
      this.ruleForm.name = res.data.data.dt.name 
      this.ruleForm.id = res.data.data.dt.id
    })
    this.clearValidate('ruleForm')
    },
    //确定
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            directoryTableupdate(this.ruleForm).then(res=>{
                if (res.data.code == 200) {
              this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
           this.$emit('EditFolderClosed', false)
            this.$emit("resetNodeb")
            } else {
              this.$message({
                message: `${res.data.msg}`,
                type: 'warning',
              })
            }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消
      resetForm() {
       this.$emit('EditFolderClosed', false)     
      },
      //清空验证
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
  },
 watch:{
    id: {
      handler(val) {
        // console.log(val,"369")
        this.ruleForm.parentIdd = val
      },
    },
 } 
}
</script>
<style lang="scss">
#AddNewfolderSs {
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