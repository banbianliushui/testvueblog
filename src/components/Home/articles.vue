<template>
    <div>
        <article class="bb-art-item" v-for="article in articleList" >
            <header>
                <span class="xz-date">
                    <span class="xz-import">
                         <span  class="impf">  {{new Date(article.publishtime).getMonth()+1}}</span>
                        <span class="secf">{{new Date(article.publishtime).getDate()}}</span>
                    </span>
                    <span class="">
                        {{new Date(article.publishtime).getFullYear()}}

                    </span>
                </span>
                <div class="xz-title" ><a :code="article.code" @click="toArticle">{{article.title}}</a></div>
            </header>
            <section  class="markdown-body" v-html="article.summary"></section>
            <div class="bb-more"  v-if="article.summary"><router-link :to="{ name: 'article', params: { code: article.code }}">继续...</router-link></div>
            <footer class="bb-art-footer">
                <div class="foot-inner">

                    <span>阅读{{article.readcount}}</span>
                    <span>·评论{{article.replycount}}</span>
                  <!--  <span>·喜欢{{article.likecount}}</span>-->
                    <span class="foot-time">{{article.publishtime | formatDate}}</span>
                </div>
                <div class="xz-tag-row " :class="{'active':article.tags.length>0}">

                   <span v-for="tag in article.tags" class="xz-tag" :tagid="tag.tagid">{{tag.tagname}}</span>
                </div>
            </footer>
        </article>

    </div>
</template>
<style>
    .bb-more{
       /* text-align: center;
        position: absolute;
        bottom: 25px;
        margin: auto;
        left: 10px;
        right: 10px;
        padding: 20px;
             filter: alpha(opacity=100 finishopacity=50 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=white,endcolorstr=white,gradientType=0);
        -ms-filter: alpha(opacity=100 finishopacity=50 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=white,endcolorstr=white,gradientType=0);
        background: red;
        background: -moz-linear-gradient(top,rgba(255,255,255,0.8) ,rgba(255, 255, 255, 0.9));
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255,255,255,0.8)), to(rgba(255, 255, 255, 0.9)));
        background: -o-linear-gradient(top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9));
        color: #c6ea08;*/
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
        props:['articleList'],
        data (){
            return {
                showMore:true
            }
        },
        methods:{
            toArticle:function (event) {
                // this.code
                //router.push({name:'article', params: { code: event.target.attributes.code.value }})
                //this.$router this.$root.$router

                this.$router.push({name:'article', params: { code: event.target.attributes.code.value }});
            }
        }
    }
</script>