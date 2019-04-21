<template>
    <div class="bc-main-outer">

        <ul class="bc-left-nav clearfix">
           <!-- <li><a @click="alllist"> 所有</a></li>-->
            <li><router-link to="/admin/add" class="bc-sbar-item"><i class="iconfont  icon-r-margin">&#xe60e;</i><span>新增</span></router-link></li>
           <li><router-link to="/admin/essaylist" class="bc-sbar-item"><span>随笔</span></router-link></li>
          <!--  <li><a @click="queryessaylist"> 随笔</a></li>-->
            <li><a @click="rawBox" class="bc-sbar-item"> 草稿箱 </a></li>
        </ul>
        <div class="bc-main">
            <div  class="bc-main-list " >
                <router-view></router-view>
               <!-- <mainlist  v-if="islist"></mainlist>-->
            </div>
        </div>
    </div>

</template>
<script>

    export default{
        props:['code'],
        data(){
            return {
                islist:false,
                summaryValue:'',
                ispublish:true,
                iscomment:true
            };
        },
        computed:{
            editorCode:function () {
                return this.code;
            },
            articleValues:function(){
              /*  return   this.$store.state.admin.articleValue*/
            }
        },

        methods:{
            publish:function(){

            },
            queryessaylist:function(){

            },
            rawBox:function(){

            }
        },
        created:function () {
            ///admin/add
            if( this.$route.name =='admin'){
                this.$router.push({path:'/admin/add'})
            }

          /* if(this.code!=""){
                var param ={code:this.code};
                this.$store.dispatch('editArticle',param)
            }*/
        }
    }

</script>

<style>

    .bc-sbar-item{
        list-style: none;
        padding: 2px 8px;
        cursor: pointer;
        border: 1px solid #eabe47;
        margin-right: 10px;
        border-radius: 5px;
        background: #efd30b;
        color: white;
        background-color: rgba(239, 211, 11, 0.7);
    }

    .bc-main-outer{
        padding-top: 20px;
    }
    .bc-left-nav{
       /* width: 150px;*/
       /*float: left;*/
        position: relative;
        /* height: 100%; */
        /* overflow-y: auto; */
        /* background-color: #404040; */
        color: #f2f2f2;
        z-index: 100;
        margin: 0;
        margin-bottom: 20px;
        margin-top: 10px;
    }
    .bc-left-nav li {
        list-style: none;
        padding: 3px 0px;
        float:left;
    }
    .bc-left-nav li a{
       /* list-style: none;
        color:#efd30b;
        padding:5px 8px;
        cursor:pointer;*/
    }
    .bc-main{
        padding-right:40px;
     /*   margin-left: 200px;
        position: absolute;*/
    }
    .publish-btn{
        background: #efd30b;
        padding: 2px 12px 3px 12px;
        border: 1px solid #eee;
        border-radius: 5px;
        color: white;
   /*     font-weight: bold;*/
        font-size: 14px;
        cursor:pointer;
    }
</style>