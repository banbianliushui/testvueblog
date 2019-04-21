<template>
    <div class="nav-outer">
        <ul class="nav-ul clearfix">
            <li><router-link to="/" class="nav-item" :class="{'active':$route.name=='home'}">主页</router-link></li>
            <li><router-link to="/glean" class="nav-item" :class="{'active':$route.name=='glean'}">相册</router-link></li>
            <li v-if="isauth"><router-link to="/admin" class="nav-item" :class="{'active':$route.name.indexOf('admin')!=-1}">管理</router-link></li>
            <!--<li  v-bind:class="{'active':isHome}" v-on:click="homeClick" >首页</li>-->
            <!--<li  v-bind:class="{'active':isGleaning}" v-on:click="gleanClick"  >拾遗</li>-->
            <!--<li  v-bind:class="{'active':isDaily}"  v-on:click="dailyClick" >{{msg}}</li>-->
        </ul>
        <div class="nav-search"><router-link to="/search" class="nav-item" :class="{'active':$route.name=='search'}">所有文章 • 标签</router-link></div>
    </div>
</template>
<script>
    import {mapState,mapActions} from 'vuex'
    export default{
        data (){
            return {
                msg:'日记',
                isHome:true,
                isGleaning:false,
                isDaily:false,
                isSignin:false

            }
        },
        computed:{
            ...mapState({
                isauth: state => state.user.isauth
            })
        },
        methods:{

//            homeClick:function(event){
//                this.isHome = true;
//                this.isGleaning = false;
//                this.isDaily=false;
//            },
//            gleanClick:function(event){
//                this.isHome = false;
//                this.isGleaning = true;
//                this.isDaily=false;
//            },
//            dailyClick:function(event){
//                this.isHome = false;
//                this.isGleaning = false;
//                this.isDaily=true;
//
//
//            }
        }

    }

</script>
<style>
    .nav-outer{
        position: fixed;
        left: 0px;
        top: 0px;
        bottom: 0px;
        width: 180px;
        background: white;


    }
    .nav-item{

    }
    .nav-item.active{
       /* color: #c6ea08;*/
        color:#efd30b;
    }
    a{
        text-decoration: none;
        color: #505050;
    }
    a:visited{
        text-decoration: none;
    }
    .nav-ul{

       /* background: white;
        margin: 0;
        padding: 10px;*/

        /*background: white;*/
        margin: 0;
        padding: 0px 20px 10px 10px;
        text-align: right;
        margin-top:100px;
        /* float: left; */
      /*  position: fixed;
        left: 0px;
        top: 0px;
        bottom: 0px;
        width: 250px;*/
    }
    .nav-ul li{
        list-style-type: none;
        padding: 8px 0px;
      /*  float:left;*/
       /* margin: 0px 10px;
        padding: 5px 10px;
        cursor:pointer;
        margin-bottom:-1px;*/
     /*   border-top: 2px dashed #ffffff;*/
       /* border-bottom: 1px solid transparent;*/
    }
   /* .nav-ul li.active{

        border-top: 2px dashed #c9d652;
        border-bottom: 1px solid white;
    }*/
    .nav-ul li:hover{
       /* background: #e0eedf;*/
    }
    .nav-search{
        font-size: 12px;
        text-align: right;
        margin-top:  20px;
        padding-right:  10px;
        margin-bottom: 30px;
    }
</style>