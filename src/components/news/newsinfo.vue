<template>
  <div class="newsinfo">
    <h3>{{newsinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{newsinfo.add_time}}</span>
      <span>点击：{{newsinfo.click}}次</span>
    </p>
    <hr>
    <div v-html="newsinfo.content"></div>
    <comments :id='id'></comments>
  </div>
</template>
<script>
import comments from '../subcomponents/comments.vue'
export default {
  data(){
    return {
      id:this.$route.params.id,
      newsinfo:''
    }
  },
  created(){
    this.getNewsInfo()
  },
  methods:{
    getNewsInfo(){
      this.$http.get('api/getnew/'+this.id).then(result=>{
        this.newsinfo = result.body.message[0]
      })
    }
  },
  components:{
    'comments':comments
  }
};
</script>
<style lang="scss">
.newsinfo {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: red;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle{
    font-size: 12px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
}
</style>
