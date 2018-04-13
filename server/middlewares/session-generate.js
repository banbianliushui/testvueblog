/**
 * Created by xiaozhu on 2018/3/11.
 */
/*处理同一个账号多次登录，产生多个session，但不同步（登录状态不一致）
* 处理一：一个账号只能登录一次，剔除前一次的session
* 处理二：
* */
    var  sessions={}
    var key = 'session_id'
    var EXPIRES = 20*60*1000;
    var generate = function(){
        var session = {};
        session.id = (new Date()).getTime()+Math.random();
        session.cookie={
            expire:(new Date()).getTime()+EXPIRES
        };
        sessions[session.id] = session;
        return session;
    }

    var checkSession = function(req,res,next){
        var id =req.cookies[key];
        if(!id){
            req.session = generate();

        }else{
            var session = sessions[id];
            if(session){
                if(session.cookie.expire>(new Date()).getTime()){
                    session.cookie.expire = new Date().getTime()+EXPIRES;
                    req.session = session
                }else{
                    delete sessions[id];

                    req.session = generate();
                }
            }else{
                req.session = generate();
            }
        }

        var cookies = res.getHeader('Set-Cookie');
        var session = serialize(key,req.session.id,{ expires: new Date(Date.now() + EXPIRES),path:'/' });
        // domain  httpOnly: true,
        cookies = Array.isArray(cookies)? cookies.concat(session): cookies != null ? [cookies,session]:[session];
        res.clearCookie(key, { path: '/' });
        res.setHeader('Set-Cookie',cookies);

        // res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
        /*var writeHead = res.writeHead;
        res.writeHead= function () {
            var cookies = res.getHeader('Set-Cookie');
            var session = serialize(key,req.session.id);
            cookies = Array.isArray(cookies)? cookies.concat(session):[cookies,session];
            res.setHeader('Set-Cookie',cookies);
            return writeHead.apply(this,arguments)
        }*/
        next();//此处是不是不能传参数，否则不能到下一个函数？待测试
    }
    function setSession(sid,fieldname,value){
        var session = sessions[sid];
        if(session!=null)
        session[fieldname]=value;
    }
    function serialize(name,val,opt){
        var pairs = [name+ '=' +val];  //encode(val)
        opt = opt||{};
        if(opt.maxAge)pairs.push('Max-Age='+opt.maxAge);
        if(opt.domain)pairs.push('Domain='+opt.domain);
        if(opt.path)pairs.push('Path='+opt.path);
        if(opt.expires)pairs.push('Expires='+opt.expires.toUTCString());
        if(opt.httpOnly)pairs.push('HttpOnly');
        if(opt.secure)pairs.push('Secure');
        return pairs.join(";");
    }

module.exports ={
    checkSession:checkSession,
    setSession:setSession
}
