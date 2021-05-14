<template>
  <div id="LogView">
    <el-dialog title="查看" :visible.sync="ViewEngineeringDocuments" width="70%" center @open="open" @close="close">
       <div class="centebt">
         <div class="ProjectViewLayout">
            <div class="titlea">
              功能模块
            </div>
            <div class="GetMessage">{{obj.modul}}</div>
             <div class="titlea">
              操作类型
            </div>
            <div class="GetMessage">{{obj.type == 0 ? "添加" : obj.type == 1  ?"修改" : obj.type == 2 ?"删除" : obj.type == 3 ?"查看" : "其他" }}</div>
         </div>
         <div class="ProjectViewLayout">
            <div class="titlea">
              功能描述
            </div>
            <div class="GetMessage">{{obj.des}}</div>
             <div class="titlea">
              操作时间
            </div>
            <div class="GetMessage">{{obj.createTime}}</div>
         </div>
         <div class="ProjectViewLayout">
            <div class="titlea">
              操作状态
            </div>
            <div class="GetMessage">{{obj.status == 0 ? "正常" : "异常"}}</div>
             <div class="titlea">
              操作人
            </div>
            <div class="GetMessage">{{obj.createByName}}</div>
         </div>
          <!-- <div class="ProjectViewLayout">
            <div class="titlea">
              创建时间
            </div>
            <div class="GetMessage">22</div>
             <div class="titlea">
              修改人
            </div>
            <div class="GetMessage">22</div>
         </div>  -->
              <div class="ProjectViewLayout">
            <div class="titlead">
              操作方法
            </div>
            <div class="GetMessager">{{obj.method}}</div>
         </div>
            <div class="ProjectViewLayout">
            <div class="titlead">
              IP地址
            </div>
            <div class="GetMessager">{{obj.ip}}</div>
         </div>
           <div class="ProjectViewLayout">
            <div class="titlead">
              请求地址
            </div>
            <div class="GetMessager">{{obj.url}}</div>
         </div>
          <div class="ProjectViewLayout">
            <div class="titlead">
              请求参数
            </div>
            <div class="GetMessager">
            <el-input class="ove" type="textarea" :rows="2" placeholder="请输入内容" v-model="obj.requParam" :autosize="{minRows:2.7, maxRows:2.7}"> </el-input>
            </div>
         </div>
          <div class="ProjectViewLayout">
            <div class="titlead">
             {{obj.status == 0 ? "返回参数" : "返回异常"}}
            </div>
            <div class="GetMessager">
            <el-input class="ove" type="textarea" :rows="2" placeholder="请输入内容" v-model="obj.respParam" :autosize="{minRows:2.7, maxRows:2.7}"> </el-input>
            </div>
         </div>
       </div>
    </el-dialog>
  </div>
</template>>
<script>
import { sysLogList, sysLogDetails } from '@/api/journal'
export default {
    props:['ViewEngineeringDocuments',"id"],
    data(){
        return{
         obj:{
         requParam:"",
         respParam:"",   
         }    
        }
    },
    methods:{
        open(){
          sysLogDetails(this.id).then( res=>{
              console.log(res)
              this.obj = res.data.data;
          })
       },
       close(){
           this.$emit("ViewAndCloseEngineeringDocuments",false)
       }
    },
    watch:{
        id:{
           handler(newVal) {
              this.id = newVal
            },
            immediate: true,
            deep: true 
        }
    }
}
</script>
<style lang="scss">
#LogView{
   .centebt{
    width: 842px;
    margin: 0 auto;
	border: solid 1px #cccccc;
   } 
   .ProjectViewLayout{
       display: flex;
       flex-direction:row;
       justify-content: flex-start;
   }
   .titlea{
     width: 140px;
     height: 60px;
     text-align: center;
     line-height: 60px;
     color: #333333;
     border-bottom:solid 1px #cccccc;
	background-color: #f6f6f6; 
   }
   .GetMessage{
       width: 281px;
       height: 60px;
       padding-left:10px;
       line-height: 60px;
       border-bottom:solid 1px #cccccc;
   }
   .titlead{
     width: 156px;
     height: 60px;
     text-align: center;
     line-height: 60px;
     color: #333333;
     border-bottom:solid 1px #cccccc;
	background-color: #f6f6f6; 
   }
   .GetMessager{
       width: 95%;
       height: 60px;
       padding-left:10px;
       line-height: 60px;
       border-bottom:solid 1px #cccccc; 
   }
   .ove{
       overflow-y: hidden;
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
}
</style>