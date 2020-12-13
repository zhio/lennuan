// pages/today/today.js
const db = wx.cloud.database();
const today = db.collection('zhiwei');
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    monthday: "",
    yueRi: "",
    tasks: null,
    list: [
        {
            id: '2019',
            name: '2019年',
            open: false,
            pages: []
        },
        {
            id: '2018',
            name: '2018年',
            open: false,
            pages: []
        },
        {
            id: '2017',
            name: '2017年',
            open: false,
            pages: []
        },
        {
            id: '2016',
            name: '2016年',
            open: false,
            pages: []
        },
        {
            id: '2015',
            name: '2015年',
            open: false,
            pages: []
        }
    ]
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
       
    let monthDay = this.getTime()
    let yueRi = this.getFullTime()
    let yearList = [2019,2018,2017,2016,2015]
    let dayList = []
    for (let i = 0, len = yearList.length; i < len; ++i){
      dayList.push(this.getlastyeartoday(yearList[i]))
    }
    today.where({
      startTime: _.in (dayList)
    }).get().then(res=>{
      console.log(res.data)
      for (let j =0; j<res.data.length;++j){
        if (res.data[j].startTime == dayList[0]){
          this.data.list[0].pages.push(res.data[j])
        }
        if (res.data[j].startTime == dayList[1]){
          this.data.list[1].pages.push(res.data[j])
        }
        if (res.data[j].startTime == dayList[2]){
          this.data.list[2].pages.push(res.data[j])
        }
        if (res.data[j].startTime == dayList[3]){
          this.data.list[3].pages.push(res.data[j])
        }
        if (res.data[j].startTime == dayList[4]){
          this.data.list[4].pages.push(res.data[j])
        }
      }
      this.setData({
        date :date,
        monthDay: monthDay,
        yueRi: yueRi,
        list:  this.data.list
      })
    })
  },
  kindToggle: function (e) {
    const id = e.currentTarget.id,
    list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
        if (list[i].id == id) {
            list[i].open = !list[i].open
        } else {
            list[i].open = false
        }
    }
    this.setData({
        list: list
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
  getlastyeartoday(keynum){
    let date = new Date()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let lasttoday = new Date(keynum,month-1,day)
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