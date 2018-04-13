/*
/!**
 * Created by xiaozhu on 2017/8/6.
 *!/
var defrequest={
    timeout:4000,
    url:"",
    method:'POST',
    responseType:""
};
function isFormData(obj) {
    return typeof FormData !== 'undefined' && obj instanceof FormData;
}
var form = function (request, next) {

    if (isFormData(request.body)) {

        request.headers.delete('Content-Type');

    } else if (isObject(request.body) && request.emulateJSON) {

        request.body = Url.params(request.body);
        request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }

    next();
};

var ajax = function(request){
    return new Promise(function(resolve){
        request = Object.assign({},defrequest, request);
        var xhr = new XMLHttpRequest();
        var handler = function(event){};

       // xhr. open(method, url, async, username, password)
        xhr.open(request.method,request.url,true);
        if(request.timeout){
            xhr.timeout = request.timeout;
        }
        if (request.responseType && 'responseType' in xhr) {
            xhr.responseType = request.responseType;
        }
        xhr.onload =function(){};
        xhr.onabort =function(){};
        xhr.onerror = function(){};
        xhr.ontimeout = function(){};

        xhr.send()


    })

}


/!*https://segmentfault.com/a/1190000004322487*!/
function sendAjax() {
    //构造表单数据
    var formData = new FormData();
    formData.append('username', 'johndoe');
    formData.append('id', 123456);
    //创建xhr对象
    var xhr = new XMLHttpRequest();
    //设置xhr请求的超时时间
    xhr.timeout = 3000;
    //设置响应返回的数据格式
    xhr.responseType = "text";
    //创建一个 post 请求，采用异步
    xhr.open('POST', '/server', true);
    //注册相关事件回调处理函数
    xhr.onload = function(e) {
        if(this.status == 200||this.status == 304){
            alert(this.responseText);
        }
    };
    xhr.ontimeout = function(e) { ... };
    xhr.onerror = function(e) { ... };
    xhr.upload.onprogress = function(e) { ... };

    //发送数据
    xhr.send(formData);
}
*/
