// pages/today/today.js
const db = wx.cloud.database();
const today = db.collection('zhiwei');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    monthday: "",
    yueRi: "",
    tasks: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let month = this.getMonth()
    let monthDay = this.getTime()
    let yueRi = this.getFullTime()
    let lasttoday = this.getlastyeartoday()
    today.where({
      startTime: lasttoday,
    }).get().then(res=>{
      console.log(res.data)
      this.setData({
        monthDay: monthDay,
        yueRi: yueRi,
        tasks: res.data
      })
    })
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
  getlastyeartoday(){
    let date = new Date()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let lasttoday = new Date(2019,month-1,day)
    let timestamp = lasttoday.getTime()
    console.log(timestamp)
    return timestamp
  },
   //获取月日
   getTime() {
    let date = new Date()
    let month = date.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let day = date.getDate()
    if (day < 10) {
      day = '0' + day
    }
    let monthDay = '' + month + day
    console.log(monthDay)
    return monthDay
  },
  //获取月份呢
  getMonth() {
    let date = new Date()
    let month = date.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    return month
  },
  //获取标准的月日
  getFullTime() {
    let date = new Date()
    let month = date.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let day = date.getDate()
    if (day < 10) {
      day = '0' + day
    }
    let monthDay = month + '月' + day + '日'
    console.log(monthDay)
    return monthDay
  },
})