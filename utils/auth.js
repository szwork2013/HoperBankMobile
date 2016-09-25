module.exports = {

    logged:()=>{
        return localStorage.logged
    },

    getToken: ()=>{
        return localStorage.token
    },

    login:(localData,cb)=>{
        localStorage.logged = true;
        for (let key in localData){
            localStorage[key]=localData[key];
        }
        cb && cb()
    },

    logout:(cb)=>{
        localStorage.clear()
        cb && cb()
    },

    getItem:(str)=>{
        return localStorage[str];
    }
};
