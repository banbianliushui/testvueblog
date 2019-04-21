/**
 * Created by xiaozhu on 2017/7/15.
 */
var mysqlcon = require("../lib/mysql-conn");
var connection=mysqlcon.connection;
exports.articles={
    saveArticle:function(artobj,callback){

        var query=connection.query('insert into article set ?',artobj,function(err,rows,fields){
            if(err){
                console.error('error saveArticle:'+err.stack);
                callback({success:false,code:"error insert article"});
                throw err;
            }
            callback({success:true});
        });
        console.log(query.sql);
       connection.end();
    },
    getArticleByCode:function(param,callback){
        let code = param.code;
        let type = param.type;
        if(code!=null&&typeof code === "string"){
            code.replace(/[\'|\"]/g,"");
            //code=connection.escape(code);//字符串自动加转义
            console.log("code=",code);

            new Promise(function (resolve, reject){
                connection.query('select  id,title,summary,'+(type=='edit'?'dmtxt':'content')
                    +',category,categoryname,description,' +
                    'picurl,createtime,updatetime' +
                    ',state,publishtime,readcount,replycount,likecount,code from article where code= ?',[code],
                    function(err,results,fields){
                    if(err){
                        callback({success:false,message:"查询错误",data:null});
                        throw err;
                        reject(err);
                    }
                    resolve(results);
                   // callback({success:true,data:{rows:rows}});//,fields:fields
                });
            }).then(function(data){
                return   new Promise(function(resolve, reject) {
                    var id;
                    if (data && data.length > 0) {
                        id = data[0].id
                    } else {
                        resolve(data);
                        return ;
                    }
                    var sql = " select tagid,tagname from tagrecord ";
                    sql += " where articleid=" + connection.escape(id);
                    connection.query(sql, function (error, results, fields) {
                        if (error) {
                            callback({success: false, message: "查询错误", data: null});
                            throw error;
                            reject(error);
                        }
                        data&& data[0]&&( data[0].tags = results) ;
                        resolve(data)

                    });
                });
            }).then(function(data){
                callback({success:true,data:data});
            }).catch(function(error){
                // connection.end();
                if (error){
                    callback({success:false,message:"查询错误",data:null});
                    throw error;
                }
            })
        }else{
            console.log("error code not string");
            callback({success:false,code:"error code not string"});
        }
    },
    checkCode:function(param,callback){
        let code = param&&param.code;
        var id = param&&param.id&&(+param.id);
        if(typeof code === "string"){
            code.replace(/[\'|\"]/g,"");
            console.log("code=",code);
            connection.query('select  id from article where code= ?',[code],
                function(err,results,fields){
                    if(err){
                        callback({success:false,message:"查询错误",data:null});
                        throw err;
                    }
                    if(results&&results.length>0&&results[0].id!==+id){
                        callback({success:true,data:false});//已经存在
                    }else{
                        callback({success:true,data:true});
                    }

                });

        }else{

            callback({success:false,code:"error code not string"});
        }
    },
    getArticleList:function(param,callback){

        var sql ="select id,title,summary,category,categoryname,description,picurl,createtime,updatetime" +
            ",state,publishtime,readcount,replycount,likecount,code from article  where deleted =0  " +
            "  ";
        var countsql ="select count(id) count from article  where deleted =0  ";
        var condition="";
        var tagcond="";
        var timecond="";
        var limitcond="";
        if(param!=null){
            if(param.state!=null){
                sql += " and state ="+connection.escape(param.state);
                countsql += " and state ="+connection.escape(param.state);
            }
            if(param.tagids!=null){
                tagcond=" and id in  ( select articleid from tagrecord where  tagid in ("
                    +connection.escape(param.tagids)+") )";
                // condition+=' id = ' + connection.escape(tagid);
            }
            if(param.page!=null && param.pagesize!=null){
                var statrow =( param.page-1)* param.pagesize;
                var endrow = ( param.page)* param.pagesize-1;
                limitcond = " limit "+ startrow+","+endrow+";";
            }

        }
        sql =sql+tagcond+" ORDER BY createtime DESC "+limitcond;
        countsql=countsql+tagcond+" ORDER BY createtime DESC";

        new Promise(function (resolve, reject){
            connection.query(countsql, function(error, results, fields){
                if (error){
                    callback({success:false,message:"查询错误",data:null});
                    throw error;
                    reject(error);
                }

                resolve(results);
            });
        }).then(function(totalarr){
          return   new Promise(function(resolve, reject){
              var total = totalarr[0].count;
              connection.query(sql, function (error, results, fields) {
                  if (error){
                      callback({success:false,message:"查询错误",data:null});
                      throw error;
                      reject(error);
                  }
                  //connection.end();
                  resolve({rows:results,total:total});
              });
            })

        }).then(function(data){
            return   new Promise(function(resolve, reject){
                var count=0;
                for(let k =0;k<data.total;k++){
                    var sql = " select tagid,tagname from tagrecord ";
                    sql+= " where articleid="+connection.escape(data.rows[k].id);
                    connection.query(sql, function (error, results, fields) {
                        if (error){
                            callback({success:false,message:"查询错误",data:null});
                            throw error;
                            reject(error);
                        }
                        data.rows[k].tags=results;
                        //connection.end();
                        count++;
                        if(count==data.total){
                            resolve(data)
                        }
                    });
                }
            })
        }).then(function(data){
            callback({success:true,data:data});
        }).catch(function(error){
           // connection.end();
            if (error){
                callback({success:false,message:"查询错误",data:null});
                throw error;
            }
        })
        console.log(sql);
    }
};