/**
 * Created by xiaozhu on 2017/8/5.
 */
import {GET_ARTICLEDETAIL} from '../types'
import api from '../../api/api'
var state = {
    articleValue :''
}

var mutations = {
    [GET_ARTICLEDETAIL]( state,result){
        state.articleValue = result;
    }
}

var actions = {
   articleDetail : function ({commit},param) {
        api.getArticleByCode(param).then(function(value){
            var data = ""
            if(value&&value.success){
                data = value.data&& value.data&& value.data[0];
            }
            commit(GET_ARTICLEDETAIL,data?data :"")
        })
   }
}

module.exports = {
    state:state,
    mutations:mutations,
    actions:actions
}
