/**
 * Created by xiaozhu on 2018/3/4.
 */
module.exports = {
    checkLogin : function (req,res,next){

        if(!req.session.islogin){
           /* const type = req.getHeader("X-Requested-With")==null?"":request.getHeader("X-Requested-With");*/
            if (req.xhr) {
                res.setHeader("REDIRECT", "REDIRECT");//告诉ajax这是重定向
                res.setHeader("CONTEXTPATH", '/login');//重定向地址
               // res.setStatus();
                return res.send({success:true,data:{isauth:false}})
              //  return false;
            }else{//如果不是ajax请求，则直接重定向
                return res.redirect('/login');
              //  return false;
            }
           // return res.redirect('/login');
           // return res.send({success:true,data:{isauth:false}})
        }
        next()
    },
    checkNotLogin:function(req,res,next){
        if(req.session&&req.session.islogin){//已登录
           // return res.redirect('back')//返回之前页
        }
        next()
    }
}