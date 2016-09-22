module.exports = {

  logged:function(){
        return localStorage.logged
  },

  getToken: function () {
    return localStorage.token
  },

  logout: function (cb) {
    delete localStorage.logged
    if (cb) cb()
  },

  loggedIn: function () {
    return !!localStorage.token
  },

};
