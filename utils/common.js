export let reqUrl =(param)=> {
  return new Promise((resolve, reject) => {
    const host = 'https://www.lantutu.wang';
      wx.request({
        url: host + param.url,
        data: '',
        header: {
          token: param
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: resolve,
        fail: reject
      })
  })
}
