/**
 * Created by xiaozhu on 2018/3/4.
 */
var usersmodel = require("../data/user");
var util = require("../util/util.js")
const setSession = require('../middlewares/session-generate').setSession;

exports.userAction={

    sigin:function(req,res) {

        var param = req.body;
        param.password = util.trim(param.password);
        param.username = util.trim(param.username);
        if (param.password == "" || param.username == "") {
            res.send({success: false, err: '账号或密码错误'})
        } else {
            new Promise(function (resolve, reject) {
                usersmodel.users.getUserByName(param, function (result) {
                    if (result.success) {
                        if (!result.data || !result.data.rows||result.data.rows.length <= 0) {
                            reject({success: false, data: null, err: '账号或密码错误'});
                            return ;
                           // res.send({success: false, err: '账号或密码错误'})
                        } else {
                            var row = result.data.rows[0];
                            if (param.username == row.nickname && param.password == row.password) {
                                var loginparam = {
                                    visitip: req.ip,
                                    visittime: new Date(),
                                    nickname: row.nickname
                                }

                                resolve(loginparam);
                                return ;
                            } else {
                            }
                        }
                    } else {
                       // reject({success: false, data: null, err: '账号或密码错误'})
                    }
                    reject({success: false, data: null, err: '账号或密码错误'})
                })
            }).then(function (results) {

                return new Promise(function (resolve, reject) {
                    usersmodel.users.updateLoginUser(results, function (result) {
                        if(result.success){
                            resolve(results);
                        }else{
                            reject(results);
                        }
                    })
                })

            },function(result){

            }).then(function (result) {
                var sid =req.cookies&&req.cookies.session_id ;
                if(sid!=null){
                    setSession(sid,'islogin',true);
                    setSession(sid,'nickname',result.nickname)
                }
                //res.cookie("islogin", 1);
                var d =  {};
                d.data = {isauth:true,username:result.nickname};
                d.success=true;
                res.send(d)
            }, function ( result ) {
                res.send(result)
            }).catch(function () {
                res.send({success: false, data: null, err: '错误'})
            })


        }
    }

}
