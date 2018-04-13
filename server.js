    var path = require('path')
    var express = require('express')
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');

    var articleRouter = require('./server/routers/articles');
    var userRouter = require('./server/routers/user');
    var adminRouter  = require("./server/routers/admin") ;
    var app = express();
    /*var multer  = require('multer');
    var upload = multer({ dest: 'uploadfiles/' })*/

    //https://github.com/expressjs/body-parser
    //添加 body-parser 中间
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.use(cookieParser());
    function dateTimeFormat(date){
        return date.getTime()
    }
    Date.prototype.toJSON = function () {
        return this.getTime();
    }
    Date.prototype.toJSON = function () {
        return dateTimeFormat(this)
    }
    /* 后台返回时间数据格式化 http://www.cnblogs.com/xiaozhuyuan/p/7397953.html*/


    // const serverInfo =
    //     `express/${require('express/package.json').version} ` +
    //     `vue-server-renderer/${require('vue-server-renderer/package.json').version}`
    app.use('/a',articleRouter)
    app.use('/',userRouter)
    //app.set('views',path.join(__dirname,'./src'))
    ////app.engine('html',)
    app.use('/adm', adminRouter);
    app.use(express.static(path.join(__dirname,'src/public')))
    app.use('/files',express.static(path.join(__dirname,'server/uploadfiles')))
    app.get('/*',(req,res)=>{

        const s = Date.now();
        res.setHeader("Content-Type","text/html")
        //  response.writeHead(200, {“Content-Type”: “text/html”})
        /*   res.setHeader("Server",serverInfo)*/
     /*   if(req.method =="GET"&&( req.originalUrl!=''||req.originalUrl!='/')){
            return res.status(404).end('404 | Page Not Found')
        }*/
        /*const errorHandler = err =>{
            if(err&&err.code ===404){
                res.status(404).end('404 | Page Not Found')
            }else{
                res.status(500).end('500 | Internal Server Error')
                console.error(`error during render : ${req.url}`)
            }
        }*/


        return res.sendFile(__dirname+'/src/public/index.html')
            // renderer.renderToStream({url:req.url}).on('error',errorHandler)
            //     .on('end',() => console.log(`whole request: ${Date.now() - s}ms`))
            //     .pipe(res)
    })


    const port = process.env.PORT || 8080;
    app.listen(port,()=>{
        console.log(`server started at localhost:${port}`)
    })



