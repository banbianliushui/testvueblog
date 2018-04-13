<template>
    <div>
        <div> <input type="text" placeholder="搜索"></div>
        <div>
            <section class="alist-item" v-for="article in articleList" >
                <div class="item-title" ><router-link :to="{ name: 'article', params: { code: article.code }}">{{article.title}}</router-link></div>

                <div class="item-right">
                    <span><router-link to="{ name: 'admin', params: { code: article.code }}">编辑</router-link> <a @click="publishItem">发布</a></span>
                    <span class="item-time">{{article.publishtime | formatDate}}</span>
                </div>
            </section>
        </div>


    </div>
</template>
<style>
    .bb-more{

        padding-top:  10px;
        color: #c1e01e;
    }
    .bb-more a{
        color: #c1e01e;
    }
    .xz-date .impf{
        color: #f7b904;
        font-style: italic;
        font-weight: bold;
        font-size: 16px;
    }
    .xz-date .secf{
        color:white;
    }
    .xz-import{
        display: block;
        border: 1px solid #ccc;
        border-top-left-radius: 9px;
        padding: 5px;
        background: cadetblue;
        /* box-shadow: 1px 1px 1px 1px #ccc; */
        color: white;
    }
    .xz-date {
        font-size: 12px;
        display: inline-block;
        width: 60px;
        text-align: center;
        vertical-align: middle;
        box-shadow: 1px 1px 1px 1px #ccc;
        border-top-left-radius: 9px;
    }
    .bb-art-item{
        background: white;
        margin: 10px;
        padding: 10px;
        position:relative;
        overflow: hidden;
    }
    .bb-art-footer{
        color: #999;
        font-size: 12px;
        padding-top:10px;
    }
    .bb-art-footer .foot-inner{
        display: flex;
    }
    .foot-time{
        margin-left: auto;
    }
</style>
<script>

    /*import router from '../../router'*/

    export default{

        data (){
            return {
                showMore:true,
                articleList:[]
            }
        },
        methods:{
            toArticle:function (event) {
                // this.code
                //router.push({name:'article', params: { code: event.target.attributes.code.value }})
                //this.$router this.$root.$router

               // this.$router.push({name:'article', params: { code: event.target.attributes.code.value }});
            }
        }
    }
</script>