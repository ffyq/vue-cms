<template>
  <div class="comments">
    <h2>发表评论</h2>
    <hr>
    <textarea placeholder="请输入要评论的内容(最多120字)" maxlength="120" v-model="content"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <ul v-for="(item, i) in comments" :key="item.add_time">
      <li class="head">第{{i+1}}楼&nbsp;&nbsp;用户: 匿名用户&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}</li>
      <li class="body">{{ item.content==='undefined'?'此用户暂无评论':item.content.trim()||'此用户暂无评论' }}</li>
    </ul>
    <mt-button type="primary" size="large" @click="getMore" plain>加载更多</mt-button>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      // id: this.$route.params.id,也可实现根据id加载评论
      comments: [],
      pageindex: 1,
      content: ""
    };
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex)
        .then(result => {
          this.comments = this.comments.concat(result.body.message)
          if(result.body.message.length === 0 ){
            Toast('暂无更多数据')
          }
        })
    },
    postComment() {
      if(this.content.trim().length===0){
        return Toast("评论内容不能为空!")
      }
      this.$http
        .post("api/postcomment/" + this.id, { content: this.content.trim() })
        .then(result => {
          if (result.body.status === 0) {
            var com = {
              add_time: Date.now(),
              user_name: "匿名用户",
              content: this.content
            }
            this.comments.unshift(com)
          }
        })
    },
    getMore(){
      this.pageindex++
      this.getComments()
    }
  },
  props:["id"]
};
</script>
<style lang="scss" scoped>
.comments {
  h2 {
    font-size: 18px;
  }
  textarea {
    margin: 0;
    font-size: 14px;
    height: 85px;
  }
  ul {
    padding: 0;
    margin: 3px 0;
    li {
      list-style: none;
      font-size: 13px;
      line-height: 30px;
    }
    .head {
      background: #ddd;
    }
    .body {
      line-height: 35px;
      text-indent: 2em;
    }
  }
}
</style>
