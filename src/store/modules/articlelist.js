/**
 * Created by xiaozhu on 2017/8/5.
 */
import {GET_ARTICLELIST} from '../types'
import api from '../../api/api.js'
var state= {
    articlelist:null,
    total:0
}

var mutations= {
    [GET_ARTICLELIST](state,results){
        if(results.success){
            state.articlelist=results.data.rows;
            state.total = results.data.total;
        }
    }
}
var actions={
    getArticleList({commit}){
        api.getArticleList({}).then(function(value){
            console.log("value==",value)
            commit(GET_ARTICLELIST,value);
        })
    }
}


export default {
    state :state,
    mutations:mutations,
    actions:actions
}