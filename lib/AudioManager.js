// 管理全局唯一统一的背景播放器
import { reqUrl } from '../utils/common.js'

const audio = wx.getBackgroundAudioManager();

export default class AudioManager {

  // 使用静态变量保存，方便后去代码
  static audio = audio;

  // 当前播放音乐
  static song = {};

  // 当前播放的歌单
  static songs = [];

  // 设置当前播放的歌曲歌单
  static setSong(song) {
    if (song.url !== null) {
      // 播放器的属性
      const audioAttr = {
        src: song.url, // 歌曲url
        title: song.name // 歌曲名称
        // singer: song.singer,  // 歌手名称
        // coverImgUrl: song.cover // 封面
      };

      // AudioManager.saveSong(song)

      // 设置到 audio 播放器上 如果设置了src 会自动播放
      Object.assign(audio, audioAttr);
      audio.onEnded(() => {  //监听音乐自然播放结束
        let index = wx.getStorageSync('songIndex');
        let songs = wx.getStorageSync('playList');
        let addIndex = (index + 1) === songs.songs.length ? 1 : index + 1;
        wx.setStorageSync('songIndex', addIndex)
        let params = {}
        params.url = '/song/url?id=' + songs.songs[index].id
        reqUrl(params).then((res) => {
          let midData = {};
          midData.name = songs.songs[index - 1].name;
          midData.url = res.data.data[0].url;
          this.setSong(midData);
        });
      })
    }
  }

  // 暂停音乐
  static stopSong() {
    audio.pause()
  }

  // 播放音乐
  static playSong() {
    audio.play()
  }
  // 自动播放下一曲
  
  // 构造方法
  constructor() {
   
  }
  
}