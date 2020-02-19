// pages/village/village.js
import { reqUrl } from '../../utils/common.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioList: [],
    diskList: [],
    navList: [{ id: 1, name: '电台' }, { id: 2, name: '新碟' },],
    activeId: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = {}
    params.url = '/program/recommend'
    reqUrl(params).then((res) => {
      this.setData({
        radioList: res.data.programs
      })
    });
    let diskParams = {}
    diskParams.url = '/top/album?offset=0&limit=10'
    reqUrl(diskParams).then((res) => {
      console.log(res)
      this.setData({
        diskList: res.data.albums
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

  // 导航切换
  navChange(event) {    
    this.setData({
      activeId: event.currentTarget.dataset.id
    })
  }
})