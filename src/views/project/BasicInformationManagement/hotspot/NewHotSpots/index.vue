<template>
  <div id="NewProjecanagement">
    <el-dialog title="新增" :visible.sync="ManagementNewOpenL" width="30%" center @open="open" @close="close" :before-close="gbq">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
          <el-form-item label="平台名称" prop="platformName">
            <el-input v-model="ruleForm.platformName" style="width:192px;" placeholder="请输入" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="网址链接" prop="link">
            <el-input v-model="ruleForm.link" style="width:192px;" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="CreateProjectManagementAdd('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {hotSpotList,hotSpotsave, } from "@/api/hotspot.js"
//正则
import {validateURL,} from "../../../../../utils/validate.js"
export default {
  props: ['ManagementNewOpenL'],
  data() {
        var validatorLink = (rule, value, callback) => {
      // //验证里的过滤方法先把用户名过滤
      // this.ruleForm.personName = stripscript(value)
      // value = this.ruleForm.personName
      if (value === '') {
        callback(new Error('请输入网址'))
      } else if (!validateURL(value)) {
        callback(new Error('网址格式错误'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
       //网址链接
       link:"",
       //平台名称
       platformName:""
      },
      rules: {
        platformName: [{ required: true, message: '请输入平台名称', trigger: 'blur' }],
        link: [{ required: true,  validator:validatorLink, trigger: 'blur' }],
      },
    }
  },
  methods: {
    //取消
    cancel(){
         if(this.ruleForm.link != "" || this.ruleForm.platformName != ""){
         this.$confirm('如果关闭将无法保存已填写的内容?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$emit('ManagementAddClose', false)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
     }else{
       this.$emit('ManagementAddClose', false)
     }
    },
    //关闭钩子
    close() {
        // console.log(1111111111)
      this.$emit('ManagementAddClose', false)
      this.clearValidate('ruleForm')
      this.ruleForm.link = ""
      this.ruleForm.platformName = ""
    },
    //关闭前的回调
    gbq(done){
     if(this.ruleForm.link != "" || this.ruleForm.platformName != ""){
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
     }else{
       done()
     }
       
    },
    //打开钩子
    open() {
        // console.log(222222222222222)
    },
    //新增确定
  CreateProjectManagementAdd(formName) {
    this.$refs[formName].validate(valid => {
      if (valid) {
        hotSpotsave(this.ruleForm).then( res => {
          // console.log(res)
          if( res.data.code == 200 ){
             this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
              this.$emit('ManagementAddClose', false)
              this.$emit("PublicAccessLisk")
          }else{
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
}
</script>
<style lang="scss">
#NewProjecanagement {
  /*************************** */

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
    margin-left: -95% !important;
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
}
</style>