// pages/video/video.js
import { reqUrl } from '../../utils/common.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    currentId: 243123,
    videoList: []
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
    let user = wx.getStorageSync('USER');
    if(!user) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else {
      let params = {}
      params.url = '/video/group/list'
      reqUrl(params).then((res) => {
        if (res.statusCode === 200) {
          this.setData({
            navList: res.data.data
          })
        } else if (res.statusCode === 301) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
        
      
        this.getVideo(res.data.data[50].id);
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
  // 根据ID请求相应视频
  getVideo(id) {
    wx.showLoading({
      title: '加载中',
    })
    let detParams = {};
    let user = wx.getStorageSync('USER');
    let cookie = wx.getStorageSync('COOKIE');
    detParams.token = user.token;
    detParams.cookie = cookie;
    detParams.url = '/video/group?id=' + id
    reqUrl(detParams).then((ret) => {
      this.setData({
        videoList: ret.data.datas
      })
      wx.hideLoading()
    })
  },

  change(e) {
    this.setData({
      currentId: e.currentTarget.dataset.id
    })
    this.getVideo(e.currentTarget.dataset.id)
  }
})