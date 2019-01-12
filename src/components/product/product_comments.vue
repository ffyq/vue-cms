<template>
  <div>
    <productcomments :id="$route.params.id"></productcomments>
  </div>
</template>
<script>
import productcomments from '../subcomponents/comments.vue'
export default {
  components:{
    productcomments
  }
}
</script>
<style lang="scss">
  
</style>