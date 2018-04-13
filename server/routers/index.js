/**
 * Created by xiaozhu on 2017/7/15.
 */
/*暂时没有用*/
import articleListRouter from "articles"
import userRouter from "user"
import adminRouter from "admin"
var express = require('express');
var router = express.Router();

router.get('./',function(req,res){
    articlesAction.getArticleList(req,res)
   // res.send()
})
app.use('./a', articleListRouter)
app.use('./', userRouter)
app.use('./adm', adminRouter)
