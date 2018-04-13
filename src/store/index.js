/**
 * Created by xiaozhu on 2017/8/6.
 */
//组装并导出store
import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api.js'
import articleList from './modules/articlelist'
import article from './modules/articledetail'
import user from './modules/user'
import admin from './modules/admin'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
var store = new Vuex.Store({
   modules:{
       articleList,
       user,
       article,
       admin
   }
})

export default  store