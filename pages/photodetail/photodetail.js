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
    size: 0,
    value: [],
    isDelete: false,
    isEdit: true,
    changeChecked: []
  },

  checkboxChange(e) {
    const checked = e.detail.value.length
    const index = e.target.dataset.index
    const temp = [...this.data.changeChecked]
    if (temp.length == 0) {
      temp.push({
        [index]: checked
      })
    } else {
      temp.forEach(item => {
        if (Object.keys(item)[0] == index) {
          item[index] = checked
        } else {
          temp.push({
            [index]: checked
          })
        }
      })
    }
    this.setData({
      changeChecked: temp
    })
  },

  //删除
  deleteClick() {
    if (this.data.isEdit) {
      this.setData({
        isDelete: true,
        isEdit: false
      })
      return
    }

    if (this.data.isDelete) {
      this.setData({
        isDelete: false,
        isEdit: true
      })
      console.log(this.data.value);
      this.data.changeChecked.forEach(item => {
        const key = Object.keys(item)[0]
        console.log(key);
        console.log(item[key]);
        console.log(this.data.value[0].photos[key]);
        if (item[key] == 1) {
          const temp = [...this.data.value]
          temp[0].photos.splice(+key, 1)
          this.setData({
            value: temp
          })

        }
      })
      const size = (this.data.value[0].photos.reduce((p, n) => p + n.size, 0) / (1024 * 1024)).toFixed(4)
      this.setData({
        size
      })
      wx.getStorage({
        key: 'photoSet',
        success: (res2) => {
          const oldValue = JSON.parse(res2.data)
          for (let i = 0; i<oldValue.length; i++) {
            if (oldValue[i].name == this.data.photoDetails.name) {
              oldValue[i] = this.data.value[0]
              break
            }
          }
          wx.setStorage({
            key: 'photoSet',
            data: JSON.stringify(oldValue)
          })

        }
      })
    }

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
            res.tempFiles.forEach(item => {
              item.checked = false
            })
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
      photoDetails: {
        name: options.name,
        length: +options.length,
        size: options.size
      }
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
        const size = (this.data.value[0].photos.reduce((p, n) => p + n.size, 0) / (1024 * 1024)).toFixed(4)
        this.setData({
          size
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