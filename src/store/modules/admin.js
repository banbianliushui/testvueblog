import api from '../../api/api.js'
import {CHECK_ARTICLECODE,GET_EDITARTICLE,GET_ADMIN_ARTICLELIST} from '../types'
var state={
    errcode:'',
    articleValue:{},
    articleList:null,
    total:0
};

var mutations={
    [CHECK_ARTICLECODE](state,result){
        state.errcode = result;
    },
    [GET_EDITARTICLE]( state,result){
        console.log("edit",result);
        state.articleValue = result;//有可能多个赋值，之前取值时读的脏数据，然后后面覆盖的就不是最新的value
     //   state.articleValue =Object.assign({},state.articleValue,result);
    },
    [GET_ADMIN_ARTICLELIST](state,result){
        state.articleList = result.rows;
        state.total = result.total;
    }
}
var actions ={
    checkCode ({commit},param){
        api.checkArticleCode(param).then( data =>{
            console.log(data);
            if(data.success){
                if(data.data){
                    commit(CHECK_ARTICLECODE,"")
                }else{
                    commit(CHECK_ARTICLECODE,"编码已存在")
                }
            }
        })
    },
    editArticle : function ({commit},param) {
        console.log(param)

       api.getEditArticleByCode(param).then(function(value){
            var data = ""
            if(value&&value.success){
                data = value.data&& value.data&& value.data[0];
            }
            commit(GET_EDITARTICLE,data?data :"")
        })
    },
    queryAllArticle:function ({commit},param) {
        api.queryAdminList(param).then(function (value) {
            var data = ""
            if(value&&value.success){
                data = value.data&& value.data&& value.data;
                commit(GET_ADMIN_ARTICLELIST,data?data :"")
            }

        })
    }
};

module.exports={
    state:state,
    mutations:mutations,
    actions:actions
}
