// pages/playSong/playSong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songListBgSign: false,
    songListSign: false,
    bgUrl: '',
    bgBlurUrl: '',
    songList: [],
    currentId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let data = wx.getStorageSync('playList');
    this.setData({
      songList: data.songs,
      currentId: data.id
    });
    this.setBgUrl(data.id);
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
  // 歌曲列表 
  songList() {
    this.setData({
      songListBgSign: true
    })
    setTimeout(() => {
      this.setData({
        songListSign: true
      })
    }, 300)
  },
  // 当前播放列表取消  背景点击
  listBgCancel() {
    this.setData({
      songListSign: false
    })

    setTimeout(() => {
      this.setData({
        songListBgSign: false
      })
    }, 500)
  },
  // 播放
  playing() {
    console.log('播放音乐')
  },
  // 阻止事件冒泡
  stopProgragh() {
    console.log('阻止事件冒泡')
  },
  // 遍历设置背景色
  setBgUrl(id) {
    for (let i = 0; i < this.data.songList.length; i++) {
      if (this.data.songList[i].id === this.data.currentId) {
        this.setData({
          bgUrl: this.data.songList[i].album.blurPicUrl,
          bgBlurUrl: this.data.songList[i].album.picUrl
        })
      }
    }
  }
})