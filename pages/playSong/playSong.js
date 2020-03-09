import { reqUrl } from '../../utils/common.js'
import  AudioManager  from '../../lib/AudioManager.js'
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
    currentId: 0,
    songName: '',
    playFlag: true,
    playMode: 0,
    currentIndex: 1,
    listenFlag: false
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
    this.getMusicUrl(data.id);
    // 获取播放模式
    let mode = wx.getStorageSync('playMode');
    this.setData({
      playMode: mode
    });

    // 获取当前播放背景
    let index = wx.getStorageSync('songIndex');
    this.setData({
      currentId: index
    });
    this.setBgUrl(this.data.songList[this.data.currentIndex - 1].id); 
    if (this.listenFlag) {
      setInterval(() => {
        let index = wx.getStorageSync('songIndex');
        if (index !== this.data.currentIndex) {
          this.setData({
            currentIndex: index
          })
          console.log(index);
          this.setBgUrl(this.data.songList[index - 1].id)
        }
      }, 3000)
    }
    this.listenFlag = true;
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
    console.log(this.data.currentId)
    for (let i = 0; i < this.data.songList.length; i++) {
      if (this.data.songList[i].id === this.data.currentId) {
        this.setData({
          bgUrl: this.data.songList[i].album.blurPicUrl,
          bgBlurUrl: this.data.songList[i].album.picUrl,
          songName: this.data.songList[i].name,
          currentIndex: i + 1
        })
        wx.setNavigationBarTitle({
          title: this.data.songList[i].name,
        })
      }
    }
  },
  // 请求音乐链接
  getMusicUrl(id) {
    let params = {}
    params.url = '/song/url?id=' + id
    reqUrl(params).then((res) => {
      let midData = {};
      midData.name = this.data.songName;
      midData.url = res.data.data[0].url;
      AudioManager.setSong(midData)
    });
  },
  // 播放模式切换
  modeChange() {
    this.setData({
      playMode: (this.data.playMode + 1) % 3
    })
    wx.setStorageSync('playMode', this.data.playMode)
  },
  // 播放/暂停歌曲
  playChange() {
    if(this.data.playFlag) {
      AudioManager.stopSong();
    }else {
      AudioManager.playSong();
    }
    this.setData({
      playFlag: !this.data.playFlag
    })
  },
  // 上一曲
  prevSong() {
    this.setData({
      currentIndex: (this.data.currentIndex - 1) < 1 ? this.data.songList.length : this.data.currentIndex - 1,
    
    })
    this.setData({
      songName: this.data.songList[this.data.currentIndex - 1].name,
      currentId: this.data.songList[this.data.currentIndex - 1].id
    })
    wx.setStorageSync('songIndex', this.data.currentIndex);
    this.getMusicUrl(this.data.songList[this.data.currentIndex - 1].id);
    this.setBgUrl(this.data.songList[this.data.currentIndex - 1].id);
  },
  // 下一曲
  nextSong() {
    this.setData({
      currentIndex: (this.data.currentIndex + 1) === this.data.songList.length ? 1 : (this.data.currentIndex + 1)
    })
    console.log(this.data.currentIndex)
    this.setData({
      songName: this.data.songList[this.data.currentIndex - 1].name,
      currentId: this.data.songList[this.data.currentIndex - 1].id
    })
    wx.setStorageSync('songIndex', this.data.currentIndex);
    this.getMusicUrl(this.data.songList[this.data.currentIndex - 1].id);
    this.setBgUrl(this.data.songList[this.data.currentIndex - 1].id);
  },
  // 设置当前索引值
})