// pages/mine/mine.js
import { reqUrl } from '../../utils/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNav: [
      { url: '/images/music.png', name: '本地音乐'},
      { url: '/images/down.png', name: '下载管理' },
      { url: '/images/video.png', name: '我的电台' },
      { url: '/images/star.png', name: '我的收藏' },
      { url: '/images/focus.png', name: '关注新歌' }
      ],
    newSongs: [],
    name: '点击登录',
    userInfo: {},
    avatarUrl: '/images/avatar.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = {}
    params.url = '/personalized/newsong'
    reqUrl(params).then((res) => {
      console.log(res)
      this.setData({
        newSongs: res.data.result
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let user = wx.getStorageSync('USER');
    if(user) {
      this.setData({
        userInfo: user,
        name: user.profile.nickname,
        avatarUrl: user.profile.avatarUrl
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  login() {
    if(!this.data.userInfo.account) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  }
})