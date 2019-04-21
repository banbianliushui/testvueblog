/**
 * Created by xiaozhu on 2017/7/15.
 */


var articlemod = require("../data/article");

exports.articlesAction={
    getArticle:function(req,res){
        articlemod.articles.getArticleByCode(req.params,function(result){
            res.send(result)
        })
    },
    getEditArticle:function(req,res){
        var code = req.params.code;
        //var params = req.body;
        var params ={code:code,type:'edit'};
        articlemod.articles.getArticleByCode(params,function(result){
            res.send(result)
        })
    },
    getArticleList:function (req,res) {

        if(!req.session.islogin){
            req.param.state = 2;
        }
        articlemod.articles.getArticleList(req.param,function(result){
            res.send(result);
        })
    },
    checkCode:function(req,res){
        var code = req.body;
        articlemod.articles.checkCode(code,function(result){
            res.send(result)
        })
    }
}