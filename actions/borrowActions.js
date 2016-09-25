import fetch from 'isomorphic-fetch'
import API from '../api'


/*申请借款表单发送，不用通知store*/
export function borrowApply(opt){
    var url=API.borrow.cooperation;
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                referrerName:opt.referrerName,
                sex:opt.sex,
                phone:opt.phone,
                province:opt.province,
                city:opt.city,
                company:opt.company,
                money:opt.money,
                cycle:opt.cycle
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'borrowApplyJsonp',
            success: function(data){
                opt.callback && opt.callback(data);
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}


/*验证身份证，不用通知store*/
export function asyncCheckId(opt){
    var url=API.authentication.certification1;
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                userId:opt.userId,
                name:opt.name,
                pid:opt.pid
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'asyncCheckIdJsonp',
            success: function(data){
                opt.callback && opt.callback(data);
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}

/*获取城市列表，不用通知store*/
export function fetchCity(province,cb){
    var url=API.authentication.city;
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                provinceName:province
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchCityJsonp',
            success: function(data){
                cb && cb(data);
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}