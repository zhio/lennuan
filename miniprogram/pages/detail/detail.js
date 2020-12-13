const db = wx.cloud.database();
const today = db.collection('today');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2015-01-01', 
    message:'Hello MiNA',
    yueRi: "",
    tasks: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let monthDay = this.options.id
    let d = new Date()
    var day=d.getDate()
    var month=d.getMonth() + 1
    var year=d.getFullYear()
    let yueRi = this.options.yr
    let date = year + "-" + month + "-" + day
    today.where({
      day: monthDay,
      cover: false
    }).get().then(res=>{
      console.log(res.data)
      this.setData({
        date: date,
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