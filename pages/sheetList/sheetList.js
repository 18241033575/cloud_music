import { reqUrl } from '../../utils/common.js'

// pages/sheetList/sheetList.js
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
    let params = {}
    params.url = '/playlist/detail?id=' + options.id;
    reqUrl(params).then((res) => {
      this.setData({
        songs: res.data.playlist
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
  // 播放歌曲
  play(e) {
    let id = e.currentTarget.dataset.id;
    if (id) {
      wx.setStorageSync('playList', { id: id, songs: this.data.songs.tracks })
    } else {
      wx.setStorageSync('playList', { id: this.data.songs.tracks[0].id, songs: this.data.songs.tracks })
    }
    wx.navigateTo({
      url: '/pages/playSong/playSong',
    })
  }
})