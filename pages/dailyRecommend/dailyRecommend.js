// pages/dailyRecommend/dailyRecommend.js
// 如果没有ID则为每日推荐，有歌单ID为歌单详情页
import { reqUrl } from '../../utils/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 

    let params = {}
    let user = wx.getStorageSync('USER');
    let cookie = wx.getStorageSync('COOKIE');
    params.token = user.token;
    params.cookie = cookie;

  
    // params.url = '/recommend/songs'
    // reqUrl(params).then((res) => {
    //   console.log(res)
    // });
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