// pages/photodetail/photodetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoDetails: {
      name: '',
      length: 0,
      size: 0
    },
    value: []
  },

  //导入
  daoruClick() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res);
        wx.getStorage({
          key: 'photoSet',
          success: (res2) => {
            const oldValue = JSON.parse(res2.data)
            console.log(oldValue);
            oldValue.filter(item => item.name == this.data.photoDetails.name)[0].photos.push(...res.tempFiles)
            wx.setStorage({
              key: 'photoSet',
              data: JSON.stringify(oldValue)
            })
            wx.switchTab({
              url: '/pages/photo/photo',
            })
          }
        })
      }
    })
  },

  // 预览图片
  previewImage() {
    const current = this.data.value[0].photos[0].path
    const urls = this.data.value[0].photos.map(item => item.path)
    wx.previewImage({
      current, // 当前显示图片的 http 链接
      urls // 需要预览的图片 http 链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      photoDetails: { name: options.name, length: +options.length, size: options.size }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.getStorage({
      key: 'photoSet',
      success: (res2) => {
        const oldValue = JSON.parse(res2.data)
        console.log(oldValue);
        const value = oldValue.filter(item => item.name == this.data.photoDetails.name)
        this.setData({
          value
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})