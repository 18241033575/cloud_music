// pages/video/video.js
import { reqUrl } from '../../utils/common.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    currentId: 243123
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // let diskParams = {}
    // diskParams.url = '/top/album?offset=0&limit=10'
    // reqUrl(diskParams).then((res) => {
    //   console.log(res)
    //   this.setData({
    //     diskList: res.data.albums
    //   })
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
      console.log(123456)
    let user = wx.getStorageSync('USER');
    if(!user) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else {
      let params = {}
      params.url = '/video/group/list'
      reqUrl(params).then((res) => {
        this.setData({
          navList: res.data.data
        })
        let detParams = {};
        let user = wx.getStorageSync('USER');
        let cookie = wx.getStorageSync('COOKIE');
        params.token = user.token;
        params.cookie = cookie;
        params.url = '/video/group?id=' + res.data.data[50].id + '&time=' + new Date().getTime()
        reqUrl(params).then((ret) => {
          console.log(ret)
        })
      });
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

  change(e) {
    this.setData({
      currentId: e.currentTarget.dataset.id
    })
  }
})