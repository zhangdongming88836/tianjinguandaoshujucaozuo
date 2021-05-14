<template>
  <div class="home_boxds">
    <div class="home_header">
      <CommonHeader :routes="routes"></CommonHeader>
      <!-- <div class="hh_bottom"> -->
        <!-- <CommonMenu :routes="routes"></CommonMenu> -->
      <!-- </div> -->
    </div>
    <div>
      <router-view></router-view>
    </div>
    <!-- <div class="home_footer">
       <div class="hf_box_left">
         <div class="paidng"><p>©2020-2021 失效分析数据库系统</p></div>
         <div class="paidngs"><p>©2020-2021 失效分析数据库系统 版权所有 All Rights Reserved 津ICP备15004239号</p></div>
       </div>
       <div class="hf_box_right">
         <div class="paidng"><p>电话：13157575757</p></div>
         <div class="paidngs"><p>邮箱：436354635@qq.com</p></div>
       </div>
    </div> -->
    <!-- <div class="home_footer">
      <div class="hf_box_left">
        <p>©2020-2021 失效分析数据库系统</p>
        <p class="box">©2020-2021 失效分析数据库系统 版权所有 All Rights Reserved 津ICP备15004239号&nbsp;&nbsp;&nbsp;</p>
      </div>
      <div class="hf_box_right">
        <p>电话：13157575757&nbsp;&nbsp;&nbsp;邮箱：436354635@qq.com</p>
      </div>
    </div> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CommonHeader from '@/views/project/components/commonHeader'
import CommonMenu from '@/views/project/components/commonMenu'
export default {
  data() {
    return {
      userShow: '',
      name: '',
      department: '',
      company: '',
    }
  },
  components: {
    CommonHeader,
    CommonMenu,
  },
  computed: {
    ...mapGetters(['permission_routers']),
    routes() {
      return this.permission_routers
    },
  },
}
</script>
<style lang="scss">
.home_boxds {
  // display: flex;
  // flex-direction: column;
  // width: 100%;
  //  // height: 100%;
  min-height: 100vh;
  background: #ffffff;
  .home_header {
    background: url('../../assets/header/topbar.png') no-repeat;
    background-size: 100% 100%;
    border-bottom: solid 4px #cccccc;
    .hh_bottom {
      z-index: 999;
      background: rgba(5, 98, 173, 0.5);
    }
  }
  // .home_body {
  //   min-height: 100vh;
  // }
  // .home_body {
  //   flex: 1;
  // }
  // .home_footer {
  //   height: 90px;
  //   padding-top: 20px;
  //   background: #0262a8;
  //   width: 100%;
  //   // z-index: 999;
  //   display: flex;
  //   margin: 0 auto;
  //   justify-content: center;
  //   .hf_box_left {
  //     box-sizing: border-box;
  //     padding-right: 8px;
  //     padding-top: 15px;
  //     // border-right: 1px solid #fff;
  //   }
  //   .hf_box_right {
  //     box-sizing: border-box;
  //     padding-left: 5px;
  //     padding-top: 30px;
  //   }
  // }
// .home_footer{
//    width:100wh;
//   display: flex;
//   flex-direction:row;
//   justify-content: center;
//   background-color: #f4f6f9;
//   padding:10px;
// }
// .hf_box_left{
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   margin-right: 10px;
// }
// .paidng{
//   margin-bottom: 10px;
//   font-family: PingFang SC;
// 	font-size: 14px;
// 	font-weight: normal;
// 	font-stretch: normal;
//   color: #666666;
// }
// .paidngs{
//   margin-bottom: 5px;
//   font-family: PingFang SC;
// 	font-size: 14px;
// 	font-weight: normal;
// 	font-stretch: normal;
//   color: #666666;
// }
// .hf_box_right{
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   border-left: solid 1px #cccccc;
//   padding-left: 10px;
// }
}
</style>