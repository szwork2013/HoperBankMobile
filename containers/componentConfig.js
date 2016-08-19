/*
* 保存常用nav，tabBar高度
* 因为使用iscroll设置高度的时候需要，获取navigator之类的高度来确定iScroll的高度导致获取高度会出现因为加载顺序而导致的获取到的高是NaN的问题*/
export default {
    windowHeight:$(document).height(),
    navHeight:51,
    tabBarHeight:45,
    financialNavHeight:45,
    isScrollClick:iScrollClick()
}
function iScrollClick(){
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
    if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
    if (/Silk/i.test(navigator.userAgent)) return false;
    if (/Android/i.test(navigator.userAgent)) {
        var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
        return parseFloat(s[0]+s[3]) < 44 ? false : true
    }
}