/**
 * Created by xiaozhu on 2018/3/14.
 */
const express = require('express')
const  router = express.Router();
const checkNotLogin = require('../middlewares/check').checkNotLogin;
const checkLogin = require('../middlewares/check').checkLogin;
var adminAction = require("../action/admin.js");
const checkSession = require('../middlewares/session-generate').checkSession;

var multer  = require('multer')
var upload = multer({ dest: 'server/uploadfiles/' })

router.post('/upload',checkSession,checkLogin,upload.single('image'),function(req,res,next){
    //存入数据库和缓存文件夹，或某个专门文件  req.files
    adminAction.saveFile(req,res);
   // res.send({success:true,data:{url:'uploadfiles/'+req.file.filename}})
})

router.post('/save',checkSession,checkLogin,multer().array(),function(req,res,next){
    //存入数据库和缓存文件夹，或某个专门文件
    //{value,render}
    adminAction.saveEssay(req,res)

})

router.post('/queryall',checkSession,checkLogin,multer().array(),function(req,res,next){

    adminAction.queryAllEssay(req,res)
})
module.exports =router;