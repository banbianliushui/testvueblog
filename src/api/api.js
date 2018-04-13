/**
 * Created by xiaozhu on 2017/8/5.
 */
/*import fetch from './fetch.js'*/
import axios from 'axios'
import router from '../router'
axios.interceptors.response.use(function (response) {
    // token 已过期，重定向到登录页面
    if(response.data.data&&response.data.data.isauth===false){
        router.push({path:'/login'})
    }
    /*if (response.data.code == 4){
            localStorage.clear()
        router.replace({
            path: '/signin',
            query: {redirect: router.currentRoute.fullPath}
        })
    }*/
    return response
}, function (error) {
    // Do something with response error
    return Promise.reject(error)
})
export default{
    getArticleList:function( param ){
       /* return fetch("/a/alist",param).then(function(data){
            return data.json();
        })*/

        return   axios.post("/a/alist",param).then(function(data){
            return new Promise(function(resolve){ resolve(data.data)});
        })
    },
    signin:function(param){
        console.log('api请求',param)

      /*  var formData = new FormData();
        formData.append("username",param.name);
        formData.append("password", param.password); // 数字 123456 会被立即转*/
      return   axios.post("/sigin",param).then(function(data){
            return new Promise(function(resolve){ resolve(data.data)});
        })
    },
    isLogin:function (param) {
        return   axios.get("/isLogin",{
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        }).then(function(data){
            return new Promise( function(resolve){
                resolve(data.data)
            });
        })/*.catch(error => {
            console.log(error);
            location.href = "/login";
        });*/

    },
    saveEssay:function(param){
        return  axios({
            url: '/adm/save',
            method: 'post',
            data: param,
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        }).then((data) => {
                    alert('保存成功！')
        })
    },
    saveEssayImg:function (param) {
        return  axios({
            url: '/adm/upload',
            method: 'post',
            data: param,
            headers: { 'Content-Type': 'multipart/form-data','X-Requested-With': 'XMLHttpRequest' },
        }).then(function(data){
            return new Promise( function(resolve){

                resolve(data.data)
            });
        })
    },
    getArticleByCode:function(param){
        return  axios({
            url: '/a/dt/'+param.code,
            method: 'post'
        }).then(function(data){
            return new Promise( function(resolve){

                resolve(data.data)
            });
        })
    },
    checkArticleCode:function (param) {
        return  axios({
            url: '/a/checkcode/'+param.code,
            method: 'post'
        }).then(function(data){
            return new Promise( function(resolve){
                resolve(data.data)
            });
        })
    },
    queryAdminList:function( param ){
        return   axios.post("/adm/queryall",param).then(function(data){
            return new Promise(function(resolve){ resolve(data.data)});
        })
    },

}