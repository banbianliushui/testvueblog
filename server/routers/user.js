/**
 * Created by xiaozhu on 2018/3/3.
 */

/*const sha1 = require('sha1');*/
const express = require('express')
const  router = express.Router();
const checkNotLogin = require('../middlewares/check').checkNotLogin;
const checkLogin = require('../middlewares/check').checkLogin;
const checkSession = require('../middlewares/session-generate').checkSession;
var userAction = require("../action/user.js");


router.post('/sigin',checkSession,function(req,res,next){//未登录时 checkNotLogin,

    //检查用户名密码并保存  ，如果已经登录了 剔除一个？

    if(!req.session.islogin){
        userAction.userAction.sigin(req,res);
    }else{

        res.send({success:true,data:{isauth:true}})
    }

})
router.get('/isLogin',checkSession,checkLogin,function(req,res,next){
    res.send({success:true,data:{isauth:true}})
})

/*router.get('/admin',checkSession,checkLogin,function(req,res,next){//未登录时 checkNotLogin,
    console.log(req)
  /!*  if(!req.session.logged_in){
        res.send({success:true,isLogin:false})
    }else{
        res.send({success:true,isLogin:true})
    }*!/
    res.send({success:true,data:{isauth:true}})
})*/

module.exports =router;