//index.js
//获取应用实例
const time = require("../../utils/time.js");
const token = "R39JH4rmpBJNqexP"
var app = getApp()
Page({
  data: {
    conditionCode: {
      100: "./image/100.svg",
      101: "./image/101.svg",
      102: "./image/104.svg",
      103: "./image/103.svg",
      104: "./image/104.svg",
      200: "./image/200.svg",
      201: "./image/200.svg",
      202: "./image/200.svg",
      203: "./image/200.svg",
      204: "./image/200.svg",
      205: "./image/201.svg",
      206: "./image/201.svg",
      207: "./image/201.svg",
      208: "./image/201.svg",
      209: "./image/201.svg",
      210: "./image/201.svg",
      211: "./image/201.svg",
      212: "./image/201.svg",
      213: "./image/201.svg",
      300: "./image/300.svg",
      301: "./image/301.svg",
      302: "./image/302.svg",
      303: "./image/302.svg",
      304: "./image/304.svg",
      305: "./image/305.svg",
      306: "./image/306.svg",
      307: "./image/301.svg",
      308: "./image/308.svg",
      309: "./image/305.svg",
      310: "./image/310.svg",
      311: "./image/310.svg",
      312: "./image/308.svg",
      313: "./image/304.svg",
      400: "./image/400.svg",
      401: "./image/401.svg",
      402: "./image/402.svg",
      403: "./image/402.svg",
      404: "./image/304.svg",
      405: "./image/304.svg",
      406: "./image/306.svg",
      407: "./image/402.svg",
      500: "./image/500.svg",
      501: "./image/501.svg",
      502: "./image/502.svg",
      503: "./image/503.svg",
      504: "./image/503.svg",
      507: "./image/503.svg",
      508: "./image/503.svg",
      900: "./image/900.svg",
      901: "./image/900.svg",
      999: "./image/900.svg",
    },
    location: "none",
    city: "上地",
    summary: "多云",
    localTemperature: "1",
    days: [],
    suggestion: [],
    suggestionIcon: {
      air: "./image/life/air.svg",
      cw: "./image/life/cw.svg",
      sport: "./image/life/sport.svg",
      drsg: "./image/life/drsg.svg",
      flu: "./image/life/flu.svg",
      uv: "./image/life/uv.svg",
      trav: "./image/life/trav.svg",
      comf: "./image/life/comf.svg",
    },
    realtime: {},
    updatetime: "",
    detail: {},
    detailIcon: {
      windy: "./image/detail/windy.svg",
      barometer: "./image/detail/barometer.svg",
      temperature: "./image/detail/temperature.svg",
      humidity: "./image/detail/humidity.svg",
    },
    show: true,
    prompt: "Loading ...", // 页面的初始数据
    lodingsrc: "./image/location/umbrella.svg",
    air: {
      aqi: 'AQI',
      co: '一氧化碳',
      no2: '二氧化氮',
      o3: '臭氧',
      pm10: 'PM10',
      pm25: 'PM2.5',
      qlty: '空气质量',
      so2: '二氧化硫',
    },
    hourly: []
  },
  getUserLocation() {
    wx.getLocation({
        type: 'wgs84',
        success :(res) =>{
          let latitude = res.latitude
          let longitude = res.longitude
          this.getCaiyunRealtime(longitude,latitude)
          this.getCaiyunWeather(longitude,latitude)
          this.decodingGps(res.longitude, res.latitude)
        },
        fail: () => {
          this.add()
      }
    })
  },
  // getUserLocation() { // 获取用户当前经纬度
  //   wx.getLocation({
  //     type: 'gcj02',
  //     success: (res) => {
  //       this.decodingGps(res.longitude, res.latitude)
  //     },
  //     fail: () => {
  //       this.add()
  //     }
  //   })
  // },
  decodingGps(x, y) { // 解析经纬度到到地址
    wx.request({
      url: 'https://restapi.amap.com/v3/geocode/regeo',
      data: {
        location: x + "," + y,
        key: '6bcab73e18c29692d1678e027e7be25a',
      },
      header: { 'content-type': 'application/json' },
      success: (res) => {
        console.log(res)
        this.setData({
          location: res.data.regeocode.addressComponent.district
        })
      },
      fail: () => {
        this.add()
      }
    })
  },

  getCaiyunRealtime(x,y) {
    wx.request({
      url: 'https://api.caiyunapp.com/v2.5/'+token+'/'+x+','+y+'/realtime.json',
      success: (res)=>{
        console.log(res.data)
        let realtimeData = res.data.result
        let updateTime = res.data.server_time
        this.setData({
                  summary: realtimeData.realtime.skycon,
                  localTemperature: realtimeData.realtime.temperature,
                  realtime: realtimeData.realtime,
                  updatetime: time.formatTime(updateTime,'Y.M.D h:m:s')
                })

      },
      fail: ()=>{
        this.add()
      }
    })
  },
  getCaiyunWeather(x,y) {
    wx.request({
      url: 'https://api.caiyunapp.com/v2.5/'+token+'/'+x+','+y+'/weather.json',
      success: (res)=>{
        console.log(res)
      },
      fail: ()=>{
        this.add()
      }
    })
  },
  onPullDownRefresh: function () { // 页面相关事件处理函数--监听用户下拉动作
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000)
    if (!this.data.show) {
      this.getUserLocation()
    }
  },
  onLoad: function () { // 生命周期函数--监听页面加载
    this.getUserLocation()
    wx.showShareMenu({ // 转发
      withShareTicket: true
    })
  },
  onShow: function () { // 生命周期函数--监听页面显示
    let dataFromSearch = wx.getStorageSync('data');
    if (dataFromSearch) {
      this.setData({
        location: dataFromSearch
      })
      wx.removeStorageSync('data')
      if (this.data.location === "auto") {
        this.getUserLocation()
      } else if (this.data.location) {
        this.getWeather()
        this.getNowWeather()
        this.getLifestyle()
        this.getHourly()
        // this.getAir()　
      }
    }
  },
  add: function () { // 转跳到搜索页面
    wx.navigateTo({
      url: '/pages/search/index'
    })
  }
})
