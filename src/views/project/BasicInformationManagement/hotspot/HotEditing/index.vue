<template>
  <div id="NewProjecanagement">
    <el-dialog title="编辑" :visible.sync="ProjectManagementEditor" width="30%" center @open="open" @close="close">
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
        <el-button @click="ProjectManagementEditor = false">取 消</el-button>
        <el-button type="primary" @click="CreateProjectManagementAdd('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {hotSpotList,hotSpotremove,hotSpotupdate,hotSpotdetails} from "@/api/hotspot.js"
//正则
import {validateURL,} from "../../../../../utils/validate.js"
export default {
  props: ['ProjectManagementEditor','id'],
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
       //id
       id:"",
       //平台名称
       platformName:""
      },
      rules: {
        platformName: [{ required: true, message: '请输入平台名称', trigger: 'blur' }],
        link: [{ required: true,  validator:validatorLink, trigger: 'blur' }],
      },  
        //所属公司下拉
      Companys: [
        {
          label: '花花',
          value: '1',
        },
      ],
      //所属作业区
      OperationAreas: [
        {
          label: '花花',
          value: '1',
        },
      ],
    }
  },
  methods: {
    //关闭钩子
    close() {
        // console.log(1111111111)
      this.$emit('ProjectManagementEditClose', false)
      this.clearValidate('ruleForm')
    },
    //打开钩子
    open() {
       hotSpotdetails(this.ruleForm.id).then( res => {
      console.log(res)
      this.ruleForm = res.data.data;
    })
    },
    //新增确定
  CreateProjectManagementAdd(formName) {
    this.$refs[formName].validate(valid => {
      if (valid) {
       hotSpotupdate(this.ruleForm).then( res=>{
         console.log(res)
            if( res.data.code == 200 ){
             this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
              this.$emit('ProjectManagementEditClose', false)
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
  watch: {
    id: {
      immediate: true,
      deep: true,
      handler(newName, oldName) {
        // console.log(newName);
        this.ruleForm.id = newName;
        //  console.log(oldName)
      },
    }
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