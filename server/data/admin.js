/**
 * Created by xiaozhu on 2018/3/14.
 */

var mysqlcon = require("../lib/mysql-conn");
var connection=mysqlcon.connection;
module.exports  = {
    save:function(param,callback){

       if(param==null){
           callback({success:false,msg:"error "});
       }
        param.createtime=new Date();
        param.updatetime=new Date();
        if(param.state==2){
            param.publishtime=new Date();
        }
        if(param.id!=null&&param.id!=""){
            //
            //param.tags  ,tagids= ?
            if(param)
            connection.query('UPDATE article SET title = ?, summary = ?, content = ? ，code = ? WHERE id = ?',
                [param.title, param.summary,param.content,param.code, param.id], function (error, results, fields) {
                    if (error){
                        callback({success:false,msg:"error "});
                        throw error;
                        return ;
                    }
                    callback({success:true});
            });

        }
        else{
            connection.query('INSERT INTO article SET ?',param, function (error, results, fields) {
                if (error){
                    callback({success:false,msg:"error "});
                    throw error;
                    return ;
                }
                callback({success:true});
            });
        }

    },
    saveFile:function(param,callback){
        connection.query('INSERT INTO files SET ?',param, function (error, results, fields) {
            if (error){
                callback({success:false,code:"error "});
                throw error;
                return ;
            }
            callback({success:true});
        });
    }
}