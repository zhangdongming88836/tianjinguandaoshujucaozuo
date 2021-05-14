<template>
  <div id="projectManagement">
    <div class="bid">
      <div class="bidstyle"></div>
      <div><i class="bidText">基础信息管理</i>><i class="bidText">项目管理</i>><i class="bidText">{{FaceToFaceReportTail}}</i></div>
    </div>
    <div class="ContentLayout">
      <div  >
        <el-tabs tab-position="left" v-model="FaceToFaceReportTail" @tab-click="handleClick">
          <el-tab-pane label="项目管理" name="项目管理">
           <SunLevelProjectManagement ref="xmgl"></SunLevelProjectManagement>
          </el-tab-pane>
          <el-tab-pane label="海管信息" name="海管信息">
            <MarineManagementInformation ref="hgxi"></MarineManagementInformation>
          </el-tab-pane>
          <el-tab-pane label="生成项目验收报告" name="生成项目验收报告">
            <GenerateProjectAcceptanceReport ref='scbg'></GenerateProjectAcceptanceReport>
          </el-tab-pane>
          <el-tab-pane label="项目验收报告管理" name="项目验收报告管理">
            <ProjectAcceptanceReportManagement ref="glbg"></ProjectAcceptanceReportManagement>
          </el-tab-pane>
        </el-tabs>
      <footers></footers>
      </div>
    </div>
  </div>
</template>
<script>
import footers from "../../components/footer/index"
import SunLevelProjectManagement   from "@/views/project/BasicInformationManagement/projectManagement/SunLevelProjectManagement/index"
import MarineManagementInformation   from "@/views/project/BasicInformationManagement/projectManagement/MarineManagementInformation/index"
import GenerateProjectAcceptanceReport   from "@/views/project/BasicInformationManagement/projectManagement/GenerateProjectAcceptanceReport/index"
import ProjectAcceptanceReportManagement   from "@/views/project/BasicInformationManagement/projectManagement/ProjectAcceptanceReportManagement/index"
export default {
  components:{
    SunLevelProjectManagement,
    MarineManagementInformation,
    GenerateProjectAcceptanceReport,
    ProjectAcceptanceReportManagement,
    footers
  },
  data() {
    return {
   FaceToFaceReportTail:"项目管理"
    }
  },
  methods:{
     handleClick(tab, event) {
        // console.log(tab.label);
        if(tab.label == "项目管理"){
          // console.log(this.$refs.xmgl)
            this.$refs.xmgl.ownedCompany = ""
          this.$refs.xmgl.ownedWorkArea =""
          this.$refs.xmgl.currenrState =""
          this.$refs.xmgl.projectName= ""
          this.$refs.xmgl.PublicAccessLisk()
        }
        if(tab.label == "海管信息"){
           this.$refs.hgxi.pipeName = ""
          this.$refs.hgxi.ownedProjectId = ""
          this.$refs.hgxi.PublicAccessLisk()
          this.$refs.hgxi.pullDown()
        }
        if(tab.label == "生成项目验收报告"){
          this.$refs.scbg.PublicAccessLisk()
        }
        if(tab.label == "项目验收报告管理"){
          this.$refs.glbg.projectName = ""
          this.$refs.glbg.PublicAccessLisk()
        }

      }
  }
}
</script>
<style lang="scss">
#projectManagement {
  //面包导航样式
  .bid {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 18px 0;
    border: solid 1px #cccccc;
  }
  .bidstyle {
    width: 4px;
    height: 17px;
    margin-left: 20px;
    background-color: #0061a7;
  }
  .bidText {
    width: 96px;
    height: 22px;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    // line-height: 22px;
    margin-left: 5px;
    letter-spacing: 0px;
    color: #333333;
  }
  //下面的整体布局
  .ContentLayout{
    height: 100vh;
  }
  // //左侧的树外层布局
  // .NavigationOuterlayer{
  //   width: 210px;
  //   height:100vh;
  //   border-right:solid 1px #cccccc;

  // }
  .el-tabs__nav-scroll{
    height: 100vh;
    width: 210px;
  }
  .el-tabs--left .el-tabs__item.is-left{
    text-align: center  !important;
  }
  .el-tabs__item.is-active{
    color: #ffffff;
    background-color: #409EFF;
  }
  .el-tabs--left .el-tabs__header.is-left{
    margin-right: 0px !important;
  }
}
</style>