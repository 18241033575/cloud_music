// pages/dailyRecommend/dailyRecommend.js
// 如果没有ID则为每日推荐，有歌单ID为歌单详情页
import { reqUrl } from '../../utils/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList: [],
    top: 0,
    month: '',
    day: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取日期
    let date = new Date();
    console.log(date.getDay());
    this.setData({
      month: ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
      day: (date.getDay() + 1 < 10 ? '0' + (date.getDay() + 1) : date.getDay() + 1)
    })

    // 请求数据
    let params = {}
    let user = wx.getStorageSync('USER');
    let cookie = wx.getStorageSync('COOKIE');
    params.token = user.token;
    params.cookie = cookie;


    params.url = '/recommend/songs'
    reqUrl(params).then((res) => {
      console.log(res)
      if (res.statusCode === 200) {
        this.setData({
          songList: res.data.data.dailySongs
        })
      } else if (res.statusCode === 301) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
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
  onPageScroll : function (e) {
    // this.setData({
    //   top: e.scrollTop
    // })
  },
  play(e) {
    let id = e.currentTarget.dataset.id;
    if(id) {
      wx.setStorageSync('playList', { id: id, songs: this.data.songList })
    }else {
      wx.setStorageSync('playList', { id: this.data.songList[0].id, songs: this.data.songList })
    }
    wx.navigateTo({
      url: '/pages/playSong/playSong',
    })
  }
})