<template>
    <div>
        <ul>
            <li class="alist-item" v-for="article in articleList">
         <!--       <div>
                    <h3><a  v-bind:href="item.url" >{{item.title}}</a></h3>
                    <span><a>编辑</a><a>删除</a><a>发布</a></span>
                </div>-->

               <!-- <section class="alist-item" v-for="article in articleList" >-->
                    <div class="item-title" ><router-link :to="{ name: 'article', params: { code: article.code }}">{{article.title}}</router-link></div>

                    <div class="item-right">
                        <span><router-link to="{ name: 'admin', params: { code: article.code }}">编辑</router-link> <a @click="publishItem">发布</a></span>
                        <span class="item-time">{{article.publishtime | formatDate}}</span>
                    </div>
               <!-- </section>-->
            </li>
        </ul>
    </div>
</template>
<script>
   export default {
     /*  props:['essaylist'],*/
       data (){
           articleList:{}
       },
       computed:{
          /* articleList:function () {
               return this.essaylist;
           }*/
       },
       methods:{

       },
       created:function(){
           this.$store.dispatch('getArticleList')
       }
   }

</script>