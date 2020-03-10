import { reqUrl } from '../../utils/common.js'

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    commendSongs: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = {}
    params.url = '/banner'
    reqUrl(params).then((res)=>{
        this.setData({
          imgUrls: res.data.banners
        })
    });
    let songs = {}
    params.url = '/personalized?limit=6';
    reqUrl(params).then((res) => {
      this.setData({
        commendSongs: res.data.result
      })
    });
  },
  // 每日推荐
  dailyRecommend() {
    let user = wx.getStorageSync('USER');
    if (!user) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/dailyRecommend/dailyRecommend',
      })
    }
  },
  // 歌单
  songsSheet(){
    wx.navigateTo({
      url: '/pages/songsSheet/songsSheet',
    })
  },
  // 排行榜
  songsRanking() {
    wx.navigateTo({
      url: '/pages/ranking/ranking',
    })
  },
  // 电台 - 云村电台
  village() {
    wx.switchTab({
      url: '/pages/village/village',
    })
  },
  // 直播 - 视频
  video() {
    wx.switchTab({
      url: '/pages/video/video',
    })
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

  }
})