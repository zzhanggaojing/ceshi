let utils = require('../../utils/utils')
Page({
  data: {
    
    email: '491308652@qq.com',
    qq: '491308652',
    swiperHeight: 'auto',
    bannerImgList: [
      {
        //src: 'https://raw.githubusercontent.com/zhangliwen1101/Images/master/img/weather.jpg',
        title: '作业测试 别翻了',
      },
      {
        //src: 'https://raw.githubusercontent.com/zhangliwen1101/Images/master/img/weather.jpg',
        title: '作业测试 别看了！',
      },
      {
        //src: 'https://raw.githubusercontent.com/zhangliwen1101/Images/master/img/wait.jpg',
        title: '你傻不傻 还翻？',
      },
    ],
  },
  onLoad () {
    this.initSwiper()
  },
  previewImages (e) {
    let index = e.currentTarget.dataset.index || 0
    let urls = this.data.bannerImgList
    let arr = []
    let imgs = urls.forEach(item => {
      arr.push(item.src)
    })
    wx.previewImage({
      current: arr[index],
      urls: arr,
      success: function (res) { },
      fail: function (res) {
        console.error('previewImage fail: ', res)
      }
    })
  },
  initSwiper () {
    let systeminfo = getApp().globalData.systeminfo
    if (utils.isEmptyObject(systeminfo)) {
      wx.getSystemInfo({
        success: (res) => {
          this.setSwiperHeight(res)
        },
      })
    } else {
      this.setSwiperHeight(systeminfo)
    }
  },
  setSwiperHeight (res) {
    this.setData({
      swiperHeight: `${(res.windowWidth || res.screenWidth) / 375 * 200}px`
    })
  },
  copy(e) {
    let dataset = (e.currentTarget || {}).dataset || {}
    let title = dataset.title || ''
    let content = dataset.content || ''
    wx.setClipboardData({
      data: content,
      success () {
        wx.showToast({
          title: `已复制${title}`,
          duration: 2000,
        })
      },
    })
  },
})