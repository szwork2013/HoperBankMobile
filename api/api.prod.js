var domain='http://api.hoperbank.com/hpmobile/v1/',
    fuiouCharge = 'https://jzh.fuiou.com/app/500002.action',
    fuiouWithDraw='https://jzh.fuiou.com/app/500003.action';

var API = {
    ossBannerDomain:'http://oss-cn-shenzhen.aliyuncs.com/hopertest/',
    fuiouURI:{
        charge:fuiouCharge,
        withdraw:fuiouWithDraw
    },
    index:domain+'index',
    media:{
        list:domain+"discover/newslist",
        detail:domain+'discover/newslist/detail'
    },
    knowledge:{
        list:domain+"discover/knowledgelist",
        detail:domain+'discover/knowledgelist/detail'
    },
    product:{
        list:domain+'product/list',
        detail:domain+'productDetail.json',
        record:domain+'product/detail/record',
        buy:domain+'product/buy',
        cancel:domain+ 'product/cancel',
        reBuy:domain+'product/rebuy',
        confirm:domain +'product/confirm',
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
    reset:{
        password:domain+'reset/password'
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
        creditorlist:domain+'user/investment/record/creditorlist',
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
    },
    question:domain+'question/surveyInterface'
}
export default API;