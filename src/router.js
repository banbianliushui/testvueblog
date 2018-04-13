/**
 * Created by xiaozhu on 2017/8/13.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home/index.vue'
import Search from './components/Home/search.vue'
import Login from './components/Login/login.vue'
import Article from './components/Article/articledetail.vue'
import Admin from './components/Admin/admin.vue'
Vue.use(Router)

const Glean ={template:'<div>sdfdf glean</div>'}

const routes =[
    {path:'/',name:'home',component:Home},
    {path:'/glean',name:'glean',component:Glean},
    {path:'/login',name:'login',component:Login},
    {path:'/search',name:'search',component:Search},
    {path:'/article/:code',name:'article',component:Article},
    {path:'/admin',name:'admin',component:Admin,
        meta:{
            requireAuth:true
        }
    },
    {path:'*',component:{
        template:'<div>404 page</div>'
    }}
]
const router = new Router({
    mode:'history',
    routes
})

export default router
