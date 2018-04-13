<template>
    <div >
        <article>
            <header class="article-header">
                <h1 class="article-title">{{articleValues.title}}</h1>
            </header>
            <section class="markdown-body" v-html="articleValues.content">

            </section>
            <footer>

                <div class="foot-inner">
                    <span class="foot-time">posted @ {{articleValues.publishtime | formatDate}}</span>
                    <span class="foot-readtxt"> 阅读 ({{articleValues.readcount}})</span>
                    <span class="foot-commenttxt">·评论 ({{articleValues.replycount}})</span>

                </div>
                <div class="xz-tag-row " :class="{'active':articleValues.tags&&articleValues.tags.length>0}">

                    <span v-for="tag in articleValues.tags" class="xz-tag" :tagid="tag.tagid">{{tag.tagname}}</span>
                </div>

            </footer>
        </article>
    </div>
</template>
<style>
    .article-panel{
        overflow: hidden;
        background: white;
        margin: 10px;
        padding: 10px;
    }
    article{

    }
    footer{
        padding: 10px;
        font-size: 12px;
    }
    .foot-readtxt,.foot-commenttxt{
        color:#7bab1b;
    }
</style>
<script>

    export default {
        computed:{
           articleValues:function(){
              return   this.$store.state.article.articleValue
            }
        },
        created : function () {
            this.articleValue='';
           var routeparam = this.$router.currentRoute.params;
            var param = {code : routeparam.code};
            this.$store.dispatch('articleDetail',param)
        }

    }

</script>