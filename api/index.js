var domain;
//内测
//domain='http://120.25.97.109:5080/hpmobile/v1/';

//本地
//domain='http://192.168.1.46:8080/hpmobile/v1/';

//生产
domain='http://api.hoperbank.com/hpmobile/v1/';

//domain = 'http://192.168.1.46:8080/hpmobile/v1/';
var API = {
    ossBannerDomain:'http://oss-cn-shenzhen.aliyuncs.com/hopertest/',
    fuiouURI:'https://jzh.fuiou.com/500002.action',
    index:domain+'index',
    product:{
        list:domain+'product/list',
        detail:domain+'productDetail.json',
        record:domain+'product/detail/record',
        buy:domain+'product/buy',
        financial:{
            list:domain+'product/financial/list',
            detail:domain+'product/financial/detail',
            buy:domain+'financial/buy',
            dealrecord:domain+'product/financial/detail/record',
            findRepaymentPlan:domain+'product/financial/detail/findRepaymentPlan'
        }
    },
    activity:{
        list:domain + 'activity/list'
    },
    borrow:{
        cooperation:domain+'borrow/list',
        apply:domain+'borrow/apply'
    },
    login:domain+'login',
    regedit:{
        /*step1:domain + 'regedit/step1',
         step2:domain + 'regeditStep2.json',
         step3:domain + 'regeditStep3.json'*/
        step1:domain + 'regedit/step1',
        step2:domain + 'regedit/step2',
        step3:domain + 'regedit/step3'
    },
    authentication:{
        city:domain + 'authentication/city',
        certification1:domain + 'user/certification',
        certification2:domain + 'user/certification2'
    },
    forget:{
        password:{
            step1:domain+'forget/password/step1',
            step2:domain+'forget/password/step2',
            step3:domain+'forget/password/step3'
        }
    },
    charge:{
        step1:domain+'topup/commit'
    },
    user:{
        dealrecord:domain+'user/trade/record',
        account:domain+'user/account/data',
        investmentrecord:domain+'user/investment/record',
        returnedPlan:domain+'user/returnedPlan/record'
    },
    withdraw:domain+'withdraw/commit',
    myteam:{
        preview:domain+'user/team',
        teamList:domain+'user/team/list',
        royaltyList:domain+'user/team/royalty'
    },
    coupon:{
        preview:domain + 'user/coupon',
        detail:domain + 'user/coupon/detail'
    }

}
export default API;