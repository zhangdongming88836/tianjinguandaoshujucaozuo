<template>
  <div>
    <div >
      <!-- <crumbs></crumbs> -->
      <div>
      <router-view></router-view>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
// import crumbs from "@/views/project/components/crumbs/index"
export default {
  // components:{
  //     crumbs
  // }, 
  data() {
    return {
        routers:[]
    }
  },
//  created(){
//     console.log( this.$router.options.routes)
//  }
}
</script>
<style lang="scss">

</style>