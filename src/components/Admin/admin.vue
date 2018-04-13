<template>
    <div class="bc-main-outer">

        <ul class="bc-left-nav clearfix">
            <li><a @click="queryessaylist"> 随笔</a></li>
            <li><a @click="rawBox"> 草稿箱 </a></li>
        </ul>

        <div class="bc-main">
            <div  class="bc-main-list " >

            </div>
            <div class="clearfix">
                <div class="right ">
                  <!--  <a @click="publish" class="publish-btn">发布</a>-->
                    <span>
                         &nbsp;&nbsp;发布<input type="checkbox" id="publish"  v-model="ispublish" name="publish">
                    </span>
                    <span>
                         &nbsp;&nbsp;允许评论<input type="checkbox" id="comment"  v-model="iscomment" name="comment">
                    </span>
                </div>
            </div>

            <editor        ></editor>
        </div>
    </div>

</template>
<script>
    import editor from '../Editor/editor.vue'
    export default{
        props:['code'],
        data(){
            return {

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
        components:{editor},
        methods:{
            publish:function(){

            },
            queryessaylist:function(){

            },
            rawBox:function(){

            }
        },
        created:function () {
         /*   if(this.code!=""){
                var param ={code:this.code};
                this.$store.dispatch('editArticle',param)
            }*/
        }
    }

</script>

<style>
    .bc-main-outer{
        padding-top: 20px;
    }
    .bc-left-nav{
        width: 150px;
        float: left;
        position: relative;
        /* height: 100%; */
        /* overflow-y: auto; */
        /* background-color: #404040; */
        color: #f2f2f2;
        z-index: 100;
        margin: 0;
        /* margin-bottom: -60px; */
       /* padding-top: 20px;*/
    }
    .bc-left-nav li {
        list-style: none;
        padding: 3px 0px;
        float:left;
    }
    .bc-left-nav li a{
        list-style: none;
        color: #b5d802;
        padding:5px 8px;
        cursor:pointer;
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