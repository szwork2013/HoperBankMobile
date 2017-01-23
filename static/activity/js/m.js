var IOSFunc;
var M = {
    getQueryString:function(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    },
    getMobile:function(){
        if(localStorage && localStorage.userId){
            return localStorage.fullMobile
        }
        return '';
    },
    getUrlMobile:function(){
        if(M.getQueryString('referrerName')){
            return M.getQueryString('referrerName')
        }
        return '';
    },
    getUserId:function(){
        if(localStorage && localStorage.userId){
            return localStorage.userId
        }
        return false;
    },
    getUrlId:function(){
        if(M.getQueryString('userId')){
            return M.getQueryString('userId')
        }
    },
    jumpTo:function(url,param){
        /*1.登录 login
         2.我的邀请 invit
         3.悦利宝D productD
         4.我的 me
         5.我的投资 myproduct
         6.理财 product
         7.去充值 recharge
         8.我的回款 mymoneyback
         9.注册 register
         */
        var env = parseInt(M.getQueryString('app')) || 0;
        switch (parseInt(env)){
            case 0:
                M.webJump(url,param || '');
                break;
            case 1:
                M.androidJump(url);
                break;
            case 2:
                M.iosJump(url);
                break;
            //no default
        }
    },
    androidJump:function(str){
        var JSInterface = window.JSInterface || false;
        if(!JSInterface){
            alert.log('android func load fail');
        }else{
            JSInterface.jumpToType(str)
        }
    },
    iosJump:function(str){
        setupWebViewJavascriptBridge(function(bridge) {
            IOSFunc = function(){
                bridge.callHandler('hpObjcCallback', {'action': str}, function(response) {})
            }
            IOSFunc()
        })
        function setupWebViewJavascriptBridge(callback) {
            var ua = window.navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge); }
                if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
            }
        }
    },
    webJump:function(str,param){
        //location.href='/financial';
        var url = '';
        switch (str){
            case "login":
                url = '/login';
                break;
            case "invit":
                url='/my/invitation';
                break;
            case "productD":
                url="/financial/product/1/10001";
                break;
            case "me":
                url="/my";
                break;
            case "myproduct":
                url="/my/investmentrecord"
                break;
            case "product":
                url="/financial"
                break;
            case "recharge":
                url="/my/charge";
                break;
            case "mymoneyback":
                url="/my/returnPlanRecordPage"
                break;
            case "register":
                url="/register"
                break;
            // no default
        }
        if(param){
            url += '?'+param
        }
        location.href=url;
    }
};






var _hmt = _hmt || [];
$(function(){
    //baidu
    var hm = document.createElement("script");
    hm.src = "http://hm.baidu.com/hm.js?5b51e86b6a28a6ed4cd8aa72173d6258";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
});


