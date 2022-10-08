// index.js
// 获取应用实例
const app = getApp()

import { bg2 } from '../../assets/img/2.js'
import { bg3 } from '../../assets/img/3.js'
import { bg4 } from '../../assets/img/4.js'
import { bg5 } from '../../assets/img/5.js'
import { bg } from '../../assets/img/bg.js'
import lottie from 'lottie-miniprogram'
Page({
  data: {
    bg2,
    bg3,
    bg4,
    bg5,
    bg
  },
  onReady() {
    this.init()
  },
  init() {
    if (this.inited) {
      return
    }
    wx.createSelectorQuery().selectAll('#lottie_demo').node(res => {
      const canvas = res[0].node
      const context = canvas.getContext('2d')
      canvas.width = 300
      canvas.height = 300
      lottie.setup(canvas)
      this.ani = lottie.loadAnimation({
        loop: true,
        autoplay: true,
        animationData: require('../../assets/json/32.js'),
        rendererSettings: {
          context,
        },
      })
      this.inited = true
    }).exec()
  },
})
