// pages/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoSet: [],
    photoName: "",
    buttons: [
      { text: '取消' },
      { text: '确认' }
    ],
    dialogVisible: false
  },
    // 创建新相册
    addPhotoSet() {
      this.setData({
        dialogVisible: true   
      })
    },
    // 对话框按钮事件处理
    tapDialogButton(e) {
      console.log(e);
      if (e.detail.index === 1) {
        this.data.photoSet.push({ name: this.data.photoName, photos: [] })
        this.setData({
          photoSet: this.data.photoSet
        })
        wx.setStorage({
          key: 'photoSet',
          data: JSON.stringify(this.data.photoSet)
        })
      }
      this.setData({
        dialogVisible: false,
        photoName: "" 
      })
    },
    // 输入框数据收集
    bindKeyInput111(e) {
      this.setData({
        photoName: e.detail.value
      })
    },
    // 进入相册详情页面
    gotoPhotoDetail(d) {
      let size = 0
      size = d.target.dataset.item.photos.reduce((p ,n) => {
        return p + n.size
      }, 0)
      size = (size / (1024 * 1024)).toFixed(4)
      wx.navigateTo({
        url: `/pages/photodetail/photodetail?name=${d.target.dataset.item.name}&length=${d.target.dataset.item.photos.length}&size=${size}`
      })
      console.log(d);
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
      success: (res) => {
        this.setData({
          photoSet: JSON.parse(res.data)
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