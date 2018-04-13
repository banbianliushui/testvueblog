/**
 * Created by xiaozhu on 2018/3/3.
 */
var mysqlcon = require("../lib/mysql-conn");
var connection=mysqlcon.connection;
exports.users={
    signin:function(req,res){//登录
        //记录登录
        res.send({success:false})
    },
    signout(req,res){//登出

    },
    getUserByName:function(param,callback){
        if(param){

            var sql=    connection.query('select id,nickname,password from user where nickname= ?',[param.username]
                ,function(err,rows,fields){
                if(err){
                    callback({success:false,code:"error "});
                    throw err;
                }
                callback({success:true,data:{rows:rows}});//,fields:fields
            });
            // console.log(sql);
        }else{
            console.log("error code not string");
            callback({success:false,code:"error code not string"});
        }
       // connection.end();
    },
    updateLoginUser:function(param,callback){

        connection.query('INSERT INTO visitor SET ?',param, function (error, results, fields) {
            if (error){
                callback({success:false,code:"error "});
                throw error;
                return ;
            }
            callback({success:true});
        });
    },
    updateUser:function(param,callback){//更新登录时间等
     //   res.send({success:true})
        callback({success:true});
    }
}