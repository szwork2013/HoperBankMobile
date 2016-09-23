module.exports = {

    logged:function(){
        return localStorage.logged
    },

    getToken: function () {
        return localStorage.token
    },

    login:function(localData,cb){
        localStorage.logged = true;
        for (let key in localData){
            localStorage[key]=localData[key];
        }
        cb && cb()
    },

    logout: function (cb) {
        localStorage.clear()
        cb && cb()
    },

    getItem:(str)=>{
        return localStorage[str];
    }


};
