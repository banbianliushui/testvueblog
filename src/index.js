/**
 * Created by xiaozhu on 2017/7/17.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import Navbar from './components/Navbar.vue'
import Articleview from './components/Home/articles.vue'
import api from './api/api.js'
import App from './components/index.vue'
import router from './router'
import './assets/css/common.css'
import store from './store/index'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import filter from './filters/filter.js'

Vue.use(mavonEditor)
Vue.use(Vuex)

Object.keys(filter).forEach(k=>Vue.filter(k,filter[k]));
// 注册



router.beforeEach((to,from,next) =>{
    if(to.matched.some(record => record.meta.requireAuth)){
        // islogin
        api.isLogin().then(function(result){
            if(result.success&&result.data.isauth){
                //addroute //
                store.commit('isauth',result.data.isauth)
                next()
            }else{
                store.commit('isauth',result.data.isauth)
                //登录
                // islogining
                next({path:'/login'})
            }
        },function(){
            console.log('d')
        });
    }else{

        next()
    }
})
router.beforeResolve(function(to,from,next){
    //所有组件内守卫和异步路由组件被解析之后
    // console.log(arguments)
    console.log("global router beforeResolve");
   if(to.name=='login'){
        store.commit('setlogining',true);

    }else{
        store.commit('setlogining',false);

    }

    next();
})

router.afterEach((to, from) => {
    // ...  this.$store.dispatch('signin',this.user)
    console.log()
})





/*
router.beforeResolve(function(to,from,next){
    //所有组件内守卫和异步路由组件被解析之后
    //https://github.com/herozhou/vue-framework-wz/blob/master/src/login.js
    // console.log(arguments)
    console.log("global router beforeResolve");
    if(to.name=='login'){
          store.commit('islogining',true);
      }else{
        store.commit('islogining',false);
      }
    next();
})
*/


var app  = new Vue({
    el:"#root",
    store:store,
    router,
    render:h=>h(App),

    data:{
       /*,
        articlelist:[{
            visit_count:'1',comment_count:'4',like_count:'2',title:"就是看到尖峰时刻",
            tags:[{id:1,text:'js'},{id:2,text:'web存储'}]
        }]*/
    },
    computed:{
        // articlelist:function(){
        //     this.$store.dispatch('articlelist');
        //
        //     return this.$store.state.articlelist;
        // }
    },
    // components:{
    //     'Navbar':Navbar,
    //     'Articleview':Articleview
    // }
})

