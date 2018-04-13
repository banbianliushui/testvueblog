/**
 * Created by xiaozhu on 2017/8/5.
 */
import {LOGIN} from '../types'
import api from '../../api/api.js'

var state= {
    user:{
        username:'',
        password:""
    },
    isauth:false,
    islogining:false
}

var mutations= {
    isauth (state,results){
        state.isauth = results;


    },
    setlogining (state,results){
        state.islogining = results;
    },
    [LOGIN](state,results){

            state.isauth=results;

    }
}

var actions={
   /* setlogining({commit},param){
        commit('setlogining',param);
    },*/
    signin({commit},param){
        var user = {username:param.username,password:param.password};

        return     api.signin(user).then(function(results){

              if(results.success){
                  commit(LOGIN,results.data.isauth);
              }
              return new Promise(function(resolve){
                  resolve(results)
              })
        })
    }
}


export default {
    state :state,
    mutations:mutations,
    actions:actions
}
