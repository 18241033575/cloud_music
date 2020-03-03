// pages/login/login.js
import {
  reqUrl
} from '../../utils/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  getPhone() {
    console.log(1)
  },
  getAccountInput(e) {
    this.account = e.detail.value;
  },
  getAccountValue() {
    this.getSaveSearchValue('account', this.account)
  },
  getPasswordInput(e) {
    this.password = e.detail.value.trim();
  },
  getPasswordValue() {
    this.getSaveSearchValue('password', this.password)
  },
  // 存值入栈
  getSaveSearchValue(name, value) {
    var data = {};
    data[name] = value;
    this.setData(data)
  },

  login() {

    if (/^1[3456789]\d{9}$/.test(this.data.account) && this.data.password) {
      let params = {}
      params.url = '/login/cellphone?phone=' + this.data.account + '&password=' + this.data.password
    
        reqUrl(params).then((res) => {
          if (res.statusCode === 200) {
            try {
              wx.setStorageSync('USER', res.data);
              wx.setStorageSync('COOKIE', res.header["Set-Cookie"]);
              wx.showToast({
                title: '登录成功',
                icon: 'none',
                duration: 2000
              })
              wx.switchTab({
                url: "/pages/mine/mine"
              })
            } catch (e) {
              wx.showToast({
                title: '本地信息设置失败',
                icon: 'none',
                duration: 2000
              })
            }

          }else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        });
    } else {
      wx.showToast({
        title: '手机号或密码错误',
        icon: 'none',
        duration: 2000
      })
    }
  },
  back() {
    wx.switchTab({
      url: "/pages/home/home"
    })
  }
})