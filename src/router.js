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
import Mainlist from './components/Admin/mainlist.vue'
import essayEditor from './components/Admin/essayeditor.vue'
Vue.use(Router)

const Glean ={template:'<div>sdfdf glean</div>'}

const routes =[
    {path:'/',name:'home',component:Home},
    {path:'/glean',name:'glean',component:Glean},
    {path:'/login',name:'login',component:Login},
    {path:'/search',name:'search',component:Search},
    {path:'/article/:code',name:'article',component:Article},
    {path:'/admin',name:'admin',component:Admin,
        children:[/*{
            path:':/code',
            component:Admin
        },*/{
            path:'essaylist',
            name:'adminlist',
            component:Mainlist
        },{
            path:'add',
            name:'adminadd',
            component:essayEditor
        },{
            path:'edit/:code',
            name:'adminedit',
           /* params: { userId },*/
            component:essayEditor/*,
            beforeRouteEnter (to, from, next) {
                // 在渲染该组件的对应路由被 confirm 前调用
                // 不！能！获取组件实例 `this`
                // 因为当守卫执行前，组件实例还没被创建
                next();
            }*/
        }],
        meta:{
            requireAuth:true
        }
    },
   /* {path:'/admin/:code',name:'adminedit',component:Admin,
        meta:{
            requireAuth:true
        }
    },*/
    {path:'*',component:{
        template:'<div>404 page</div>'
    }}
]
const router = new Router({
    mode:'history',
    routes
})

export default router
