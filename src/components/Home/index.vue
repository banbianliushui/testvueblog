<template>
    <div>

        <Articles :articleList="articleList"></Articles>
      <!--  <Sidebar :datelist="dateList" :taglist="taglList"></Sidebar>-->
     <!--   <aside>
            <div>这里是时间序列</div>
            <div>这里是标签搜索</div>
        </aside>-->

    </div>
</template>

<script>
    import Articles from './articles.vue'

  /*  import Navbar from '../Navbar.vue'*/
   /*import Sidebar from './sidebar.vue'*/
    import { mapState,mapActions } from 'vuex'
    export default{
        components:{Articles},
        computed:{

            dateList:function(){

            },
            taglList:function(){

            },
            articleList:function () {
               return  this.$store.state.articleList.articlelist;
            }
//            ...mapState({
//                articleList:function({articleList}){
//                    return articleList.rows;
//                }
//            })


        },
        created:function(){
            this.$store.dispatch('getArticleList')
        }
    }
</script>