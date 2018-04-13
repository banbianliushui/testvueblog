/**
 * Created by xiaozhu on 2017/7/15.
 */

var express = require("express");

var articlesAction = require("../action/article.js");
const checkSession = require('../middlewares/session-generate').checkSession;
var router = express.Router();

router.post("/alist",checkSession,function(req,res){

    articlesAction.articlesAction.getArticleList(req,res);
})

router.post("/dt/:code",function(req,res){

    //var code = req.params.code;
    articlesAction.articlesAction.getArticle(req,res);
})
router.post("/checkcode/:code",function(req,res){

   // var code = req.params.code;
    articlesAction.articlesAction.checkCode(req,res);
})
module.exports =router;