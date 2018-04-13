/**
 * Created by xiaozhu on 2018/3/14.
 */
var adminAction = require("../data/admin");
var articleAction = require("../data/article");
module.exports={
    saveEssay:function(req,res){
       // var code = req.param;
        adminAction.save(req.body,function(result){
            res.send(result)
        })
    },
    saveFile:function(req,res){
        var param = req.file;
        var d = {
            filename:param.filename,
            originalname:param.originalname,
            path:'files/'+req.file.filename,
            serverpath:param.path,
            size:param.size/1024
        };
        adminAction.saveFile(d,function(results){
            if(results.success){
                results.data={url:param.path};
                res.send({success:true,data:{url:'files/'+req.file.filename}})
            }

        });
    },
    queryAllEssay:function(req,res){
        // var code = req.param;

        if(!req.session.islogin){
            res.send({success:false,isauth:false});
            return;
        }
        articleAction.articles.getArticleList(req.param,function(result){
            res.send(result);
        })
    },

}