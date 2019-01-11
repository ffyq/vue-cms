<template>
  <div class="numbox">
    <div class="mui-numbox" data-numbox-min="1">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input class="mui-input-numbox" type="number" :value="everyNum" @change="countChange" ref="numbox">
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  data(){
    return {}
  },
  mounted(){
    mui('.mui-numbox').numbox()
  },
  methods:{
    // change事件监听数量变化
    countChange(){
      this.$store.commit('modifyNum',{
        id:this.id,
        num:Math.ceil(this.$refs.numbox.value)
      })
    }
  },
  props:['everyNum','id']
};
</script>
<style lang="scss">
.numbox {
  display: inline-block;
  .mui-numbox {
    height: 30px;
  }
}
</style>