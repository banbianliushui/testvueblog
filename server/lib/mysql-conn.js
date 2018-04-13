/**
 * Created by xiaozhu on 2017/7/15.
 */
var  mysql = require('mysql');
var connection ;
function connect(){
    connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        port : 3306,
        password:'495021518',
        database:'mybblog'/*,
         charset:''*/,
        charset :"UTF8_GENERAL_CI",
         timezone:'local'
        // timezone:"08:00"

    });
    connection.connect(handleError);
    connection.on('error',handleError);
}
function handleError(err){
    if(err!=null&&err.code==="PROTOCOL_CONNECTION_LOST"){
        //http://cnodejs.org/topic/516b77e86d382773064266df
        connect();
    }else if(err!=null){
        console.error('error connecting:'+err.stack);

    }
}
connect();
exports.connection =connection;