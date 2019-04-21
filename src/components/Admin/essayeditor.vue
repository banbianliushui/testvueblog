<template>
    <div>
        <div class="clearfix">
            <div class="right ">
                <!--  <a @click="publish" class="publish-btn">发布</a>-->
                <span>
                     发布<input type="checkbox" id="publish"  v-model="ispublish" name="publish">
                        </span>
                <span>
                    &nbsp;&nbsp;允许评论<input type="checkbox" id="comment"  v-model="iscomment" name="comment">
                        </span>
            </div>
        </div>

        <div class="bc-rmain">
            <div>
                <div class="bc-form-control">
                    <input type="text" class="bc-control-input line-input" name = "title"  placeholder="标题..." v-model.trim ="title">
                    <span class="bc-errmsg">{{errtitle}}</span>
                </div>
                <div class="bc-form-control">
                    <input type="text"  class="bc-control-input line-input"  name="code" placeholder="标题编码..."
                           v-model="code"
                         v-on:blur="checkCodestr" >
                    <!-- v-on:keyup="simpCodestr"-->
                    <span class="bc-errmsg">{{errCode}}</span>
                </div>
                <div class="bc-form-control">
                    <textarea v-bind:value="summaryValue"  v-on:input="changeSummary" class="bc-control-input line-input"    placeholder="摘要..." rows="5" ></textarea>
                </div>
                <div class="bc-form-control">
                    <input type="text" v-model="tags"  class="bc-control-input line-input"  name="tagnames" placeholder="标签..."/>

                </div>

            </div>

            <mavon-editor v-model="eValue"  ref=md @imgAdd="$imgAdd"
                          @imgDel="$imgDel" @save = "$save"
            ></mavon-editor>
        </div>
    </div>
</template>

<script>
    import editor from '../Editor/editor.vue'
    import util from '../../util/util.js'
    import api from '../../api/api.js'
    import {GET_EDITARTICLE} from '../../store/types'
    export default{
       /* props:['code'],*/
        data(){
            return {

                errtitle:'',
                img_file: {},
                islist:false,
                ispublish:true,
                iscomment:true
            };
        },
        computed:{
           /* editorCode:function () {
                return this.code;
            },*/
            articleValues:function(){
                 return   this.$store.state.admin.articleValue;
            },
            errCode: function(){
                return this.$store.state.admin.errcode;
            },
            tags:{
                get : function(){
                    var  articleValues = this.$store.state.admin.articleValue;
                    return articleValues!=null?articleValues.tags:"";
                },
                set:function(value){
                    console.log(this.$store)
                    var articleValues =  this.$store.state.admin.articleValue;
                    articleValues? articleValues.tags = value:articleValues={tags:value}
                    this.$store.commit(GET_EDITARTICLE,articleValues)
                }
            },
            code:{
                get : function(){
                    var  articleValues = this.$store.state.admin.articleValue;
                    return articleValues!=null?articleValues.code:"";
                },
                set:function(value){
                    console.log(this.$store)
                  //  var articleValues =  this.$store.state.admin.articleValue;
                   //  articleValues? articleValues.code = value:articleValues={code:value}
                    this.$store.commit(GET_EDITARTICLE,{code:value})
                }
            },
            summaryValue:{
                get:function () {
                    var  articleValues = this.$store.state.admin.articleValue
                    return  articleValues!=null?articleValues.summary:"";
                },
                set:function(value){
                    var articleValues =  this.$store.state.admin.articleValue;
                       articleValues? articleValues.summary = value:articleValues ={summary:value};
                    console.log("------------set summaryValue------------------");
                    console.log(value,articleValues)
                    this.$store.commit(GET_EDITARTICLE,articleValues)
                }

            },
            title:{
                get :function(){
                    var  articleValues = this.$store.state.admin.articleValue
                    return  articleValues!=null?articleValues.title:"";
                },
                set:function(value){
                  //  var articleValues =  this.$store.state.admin.articleValue;
                     //articleValues? (articleValues.title = value):(articleValues={title:value})
                    console.log("------------set title------------------");
                  //  console.log(value,articleValues)
                    this.$store.commit(GET_EDITARTICLE,{title:value})
                }
            },
            eValue:{
                get :function(){
                    var  articleValues = this.$store.state.admin.articleValue;
                    return  articleValues!=null&&articleValues.dmtxt?articleValues.dmtxt:"";
                },
                set:function(value){
                    console.log("------------set evalue------------------");
                    console.log(value);
                  //  value = value.replace(/\n/g,"\\\\n").replace(/\r/g,"\\\\r");
                    console.log("------------set evalue2------------------");
                    console.log(value);
                 //   var articleValues =  this.$store.state.admin.articleValue;
                  //  articleValues =   articleValues? articleValues.dmtxt = value:""
                  //  this.$store.commit(GET_EDITARTICLE,articleValues)
                }
            },
            id:function(){
                var  articleValues = this.$store.state.admin.articleValue
                return  articleValues!=null?articleValues.id:"";
            }
        },
       /* components:{editor},*/
        methods:{
            publish:function(){

            },

            rawBox:function(){

            },
            simpCodestr($event){
               // this.code = $event.target.value.replace(/[^0-9a-zA-Z-_]+/g,'');
            },
            checkCodestr($event){
                var value  = $event.target.value.replace(/[^0-9a-zA-Z-_]+/g,'');
                value = util.trim(value);
                var articleValues =  this.$store.state.admin.articleValue;
                if((articleValues&&articleValues.code!==value)||(value!=""&&(!articleValues||!articleValues.code))){
                   // articleValues? articleValues.code = value:articleValues={code:value}

                    this.$store.commit(GET_EDITARTICLE,{code:code})//articleValues
                }

                this.$store.dispatch('checkCode',{code:value,id:this.id});
            },
            changeSummary($event){
                this.summaryValue =$event.target.value;
            },
            $save(value,render){
                var code = util.trim(this.code);
                var title =util.trim( this.title);
                if(title==''){
                    this.errtitle = '请输入标题';
                    return ;
                }
                if(code==''){
                    this.errCode = '请输入编码';
                    return ;
                }
                if(this.errCode ){
                    return
                }

                var formdata = new FormData();
                formdata.append('content',render );
                formdata.append('dmtxt',value );
                formdata.append('code', this.code);
                formdata.append('title', this.title);
                formdata.append('id', this.id);
                formdata.append('summary', this.summaryValue);
                formdata.append('tags', this.tags);

                if( this.$parent.iscomment){
                    formdata.append('allowcomment', 1);
                }else{
                    formdata.append('allowcomment', 0);
                }
                if( this.$parent.ispublish){
                    formdata.append('state', 2);
                }else{
                    formdata.append('state', 0);
                }
                api.saveEssay(formdata);
            },
            $imgDel(pos){
                delete this.img_file[pos];
            },
            $imgAdd(pos,$file){
                var formdata = new FormData();
                formdata.append('image', $file);
                var $vm =this.$refs.md;
                api.saveEssayImg(formdata).then((data) => {
                    // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
                    /**
                     * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                     * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                     * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                     */
                    $vm.$img2Url(pos, data.data.url);
                })
            }
        },
        beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            function check(vm ){
                if( vm.$route.name=='adminedit'){
                    let params = vm.$route.params;
                    if(params.code!=""){
                        let param ={code:params.code};
                        vm.$store.dispatch('editArticle',param)
                    }
                }else{
                    vm.$store.state.admin.articleValue = null;
                }}
            next(check);
        },
       /* beforeRouteUpdate (to, from, next){
            console.log(to);
          /!*  if( to.name=='adminedit'){
                let params = to.params;
                if(params.code!=""){
                    let param ={code:params.code};
                    this.$store.dispatch('editArticle',param)
                }
            }else{
                this.$store.state.admin.articleValue = null;
            }*!/
        },*/
       /* beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            function check(vm ){
                if( vm.$route.name=='adminedit'){
                let params = vm.$route.params;
                if(params.code!=""){
                    let param ={code:params.code};
                    vm.$store.dispatch('editArticle',param)
                }
            }else{
                vm.$store.state.admin.articleValue = null;
            }}
            next(check);
        },

        created:function () {
            ///admin/add
           if( this.$route.name=='adminedit'){
               let params = this.$route.params;
               if(params.code!=""){
                   let param ={code:params.code};
                   this.$store.dispatch('editArticle',param)
               }
           }else{
               this.$store.state.admin.articleValue = null;
           }

        }*/
    }

</script>

<style>
    .line-input{
        width:80%;
    }
    .bc-rmain{
        margin-bottom: 30px;
    }
    .bc-errmsg{
        color: red;
        font-size: 12px;
    }
</style>