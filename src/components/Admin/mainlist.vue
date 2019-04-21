<template>
    <div>
        <ul>
            <li class="alist-item clearfix">
                <div class="item-title b-font"><a>标题</a></div>
                <div class="item-right">
                    <span class="item-state b-font"       >状态</span>
                    <span class="item-action b-font">操作</span>
                    <span class="item-time b-font">创建时间</span>
                </div>
            </li>
            <li class="alist-item clearfix" v-for="article in articleList">
                <div class="item-title" ><router-link :to="{ name: 'article', params: { code: article.code }}">{{article.title}}</router-link></div>
                    <div class="item-right">
                        <span class="item-state" >{{article.state | articleState}}</span>
                        <span class="item-action"><router-link :to="{ name: 'adminedit', params: { code: article.code }}" class="edit-btn">编辑</router-link> </span>
                        <span class="item-time">{{article.publishtime | formatDate}}</span>
                    </div>

            </li>
        </ul>
    </div>
</template>
<style>

    .item-state{
        display: inline-block;
        width: 100px;
        text-align: center;
    }
    .item-action{
        display: inline-block;
        width: 120px;
        text-align: center;
    }

    .item-title{
        float: left;
    }

    .item-right{
        float:right;
        width: 300px;
        display: flex;
        justify-content: space-between;
    }
    .item-time{
        width: 200px;
        display: inline-block;
        text-align: center;
    }
    .alist-item{
        background: white;
        padding: 5px;
        margin-top: 5px;
        box-shadow: 1px 3px 1px #eee;
    }
    .edit-btn{
      /*  color:#eab30e;*/
        color:#efd30b;
    }

</style>
<script>
   export default {
     /*  props:['essaylist'],*/
       data (){
          return { }
       },
       computed:{
           articleList:function () {
               console.log(this.$store.state.admin.articleList)
             return  this.$store.state.admin.articleList;
           },
           total:function () {
              return this.$store.state.admin.total;
           }
         /*  articleList:function(){

           },*/
       },
       methods:{
           publishItem(){

           }
       },
       created:function(){
           this.$store.dispatch('queryAllArticle')
       }
   }

</script>