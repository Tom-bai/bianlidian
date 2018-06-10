//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
    menu:[],
    rightmenu:[],
    selected:0,
    money:0,
    dc: 15,
    paytext:'结算'
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b1d200546416950933ee527/example/xiaobaibianlidian#!method=get', 
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          menu: res.data.data
        })
         console.log(res.data.data)
      }
    })
  },
  selected:function(e){
    this.setData({
      selected: e.currentTarget.dataset.index
    })
  },
  addbtn:function(e){
    var that = this;
    var info = that.data.menu;
    var addbtn_numb = e.currentTarget.dataset.ee
    info[that.data.selected].menuContent[addbtn_numb].numb++
    that.setData({
      money: that.data.money + that.data.menu[that.data.selected].menuContent[addbtn_numb].price,
      menu: info
    })
    console.log(that.data.menu[that.data.selected].menuContent[addbtn_numb].price)
  },
  rembtn: function (e) {
    var that = this;
    var info = that.data.menu;
    var addbtn_numb = e.currentTarget.dataset.ee
    info[that.data.selected].menuContent[addbtn_numb].numb--
    this.setData({
      money: that.data.money - that.data.menu[that.data.selected].menuContent[addbtn_numb].price,
      menu: info
    })
    console.log(info[that.data.selected].menuContent[addbtn_numb].numb--)
  },
  pay: function (e){
    var that = this;
    if(that.data.money == 0) {
      wx.showToast({
        title: '还没有选择商品',
        duration: 2000
      })
      return false
    }
    if (that.data.money < that.data.dc){
      wx.showModal({
        content: `需要支付${that.data.money + that.data.dc}元`,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }else{
      wx.showModal({
        content: `确认支付${that.data.money}元`,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  }
})
