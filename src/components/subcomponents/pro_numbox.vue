<template>
  <div class="numbox">
    <div class="mui-numbox" data-numbox-min="1">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged()" ref='numbox'>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  props: ["max"],
  methods:{
    countChanged(){
      // 触发父组件传过来的方法并将数据集传递给父组件，ref引用dom元素
      // 注意一定要转整数！！！
      this.$emit('getCount',parseInt(this.$refs.numbox.value))
    }
  },
  watch: {
    // 因为是异步请求，监听max值的变化，设置数字框上限值
    max: function(newvalue, oldvalue) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newvalue);
    }
  }
};
</script>
<style lang="scss">
.numbox {
  display: inline-block;
}
</style>