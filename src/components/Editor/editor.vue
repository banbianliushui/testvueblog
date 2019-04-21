<template>
    <div class="bc-rmain">
        <div>
            <div class="bc-form-control">
                <input type="text" class="bc-control-input line-input" name = "title"  placeholder="请输入标题" v-model.trim ="title">
                <span class="bc-errmsg">{{errtitle}}</span>
            </div>
            <div class="bc-form-control">
                <input type="text"  class="bc-control-input line-input"  name="code" placeholder="请输入标题编码"
                    v-model="code"
                       v-on:keyup="simpCodestr" v-on:blur="checkCodestr" >
                <span class="bc-errmsg">{{errcode}}</span>
            </div>
            <div class="bc-form-control">
                <textarea v-bind:value="summaryValue"  v-on:input="changeSummary" class="bc-control-input line-input"    placeholder="输入摘要" rows="5" ></textarea>
            </div>

          </div>

        <mavon-editor v-model="eValue"  ref=md @imgAdd="$imgAdd"
                      @imgDel="$imgDel" @save = "$save"
        ></mavon-editor>
    </div>
</template>
<script>
    import api from '../../api/api.js'
    import util from '../../util/util.js'


    export default {
        props:['eCode','eSummary','eContent','eTitle','eId'],
        data (){
            return {
                /*code:this.eCode?this.eCode:"",
                title:this.eTitle?this.eTitle:"",*/
                errtitle:'',
                img_file: {},
            /*    summaryValue:this.eSummary?this.eSummary:"",
                eValue:this.eContent?this.eContent:"",
                id:this.eId?this.eId:""*/


            }
        },
        computed:{
            errcode:function(){
               return  this.$store.state.admin.errcode;
            },
        /*   articleValues:function(){
                //this.summaryValue =
                return this.$store.state.admin.articleValue  ;
            },*/
            code:{
                get : function(){
                    var  articleValues = this.$store.state.admin.articleValue;
                    this.eValue = articleValues!=null?articleValues.dmtxt:"";
                    return articleValues!=null?articleValues.code:"";
                },
               set:function(value){
                 //   this.code = value;
               }

            },
            summaryValue:{
               get:function () {
                   var  articleValues = this.$store.state.admin.articleValue
                   return  articleValues!=null?articleValues.summary:"";
               },
                set:function(value){
                 //  this.summaryValue = value;
                }

            },
            title:{
                get :function(){
                    var  articleValues = this.$store.state.admin.articleValue
                    return  articleValues!=null?articleValues.title:"";
                },
                set:function(title){

                }
            },
           eValue:{
               get :function(){
                   var  articleValues = this.$store.state.admin.articleValue
                   return  articleValues!=null?articleValues.dmtxt:"";
               },
               set:function(title){

               }
           },
            id:function(){
                var  articleValues = this.$store.state.admin.articleValue
                return  articleValues!=null?articleValues.id:"";
              //  return this.eId;
            }
        },
       methods:{
           simpCodestr($event){
               this.code = $event.target.value.replace(/[^0-9a-zA-Z-_]+/g,'');

           },
           checkCodestr($event){
               this.code = $event.target.value.replace(/[^0-9a-zA-Z-_]+/g,'');
               var code = util.trim(this.code);
                this.$store.dispatch('checkCode',{code:code,id:this.id});

           },
           changeSummary($event){
               console.log(arguments)
               /*something = $event.target.value*/
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
                   this.errcode = '请输入编码';
                   return ;
               }
               var formdata = new FormData();
               formdata.append('content',render );
               formdata.append('dmtxt',value );
               formdata.append('code', this.code);
               formdata.append('title', this.title);
               formdata.append('id', this.id);
               formdata.append('summary', this.summaryValue);
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
      /*  beforeUpdate(){

        },*/
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
       created(){
           console.log("xes")
         /*  if( this.$route.name=='adminedit'){
               let params = this.$route.params;
               if(params.code!=""){
                   let param ={code:params.code};
                   this.$store.dispatch('editArticle',param)
               }
           }else{
               this.$store.state.admin.articleValue = null;
           }
           console.log(this.$store.state.admin.articleValue)   ;*/
           /*let article = this.$store.state.admin.articleValue;
           if(article){
               this.code = article.code;
               this.title = article.title;
               this.summaryValue = article.summary;
               this.eValue = article.content;
           }*/
       }
       /* props:['editorValue'],*/
      /*  computed:{
            editorValue:
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