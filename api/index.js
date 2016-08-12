var domain,
    fuiouCharge='',
    fuiouWithDraw = '';
/*
* @EVN
* 1为生产
* 2为公测
* */
const ENV = 2;
switch (ENV){
    case 1:
        domain='http://api.hoperbank.com/hpmobile/v1/';
        fuiouCharge = 'https://jzh.fuiou.com/app/500002.action';
        fuiouWithDraw='https://jzh.fuiou.com/app/500003.action';
        break;
    case 2:
        domain='http://120.25.97.109:5080/hpmobile/v1/';
        fuiouCharge='http://www-1.fuiou.com:9057/jzh/app/500002.action';
        fuiouWithDraw='http://www-1.fuiou.com:9057/jzh/app/500003.action';
        break;
    //no default
}
var API = {
    ossBannerDomain:'http://oss-cn-shenzhen.aliyuncs.com/hopertest/',
    fuiouURI:{
        charge:fuiouCharge,
        withdraw:fuiouWithDraw
    },
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
            record:domain+'product/financial/detail/record',
            findRepaymentPlan:domain+'product/financial/detail/findRepaymentPlan'
        },
        transfer:{
            list:domain+'product/transfer/list',
            detail:domain+'product/transfer/detail',
            buy:domain+'transfer/buy',
            record:domain+'product/transfer/detail/record',
            findRepaymentPlan:domain+'product/transfer/detail/findRepaymentPlan'
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