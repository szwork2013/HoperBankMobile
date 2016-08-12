/*
* 保存常用nav，tabBar高度
* 因为使用iscroll设置高度的时候需要，获取navigator之类的高度来确定iScroll的高度导致获取高度会出现因为加载顺序而导致的获取到的高是NaN的问题*/
export default {
    windowHeight:$(window).height(),
    navHeight:51,
    tabBarHeight:45,
    financialNavHeight:45
}