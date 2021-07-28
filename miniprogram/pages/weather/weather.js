//index.js
//获取应用实例
const time = require("../../utils/time.js");
const token = "R39JH4rmpBJNqexP"
var app = getApp()
Page({
  data: {
    chineseCode:{
      "CLEAR_DAY": "晴天",
      "CLEAR_NIGHT": "晴（夜间）",
      "PARTLY_CLOUDY_DAY": "多云（白天)",
      "PARTLY_CLOUDY_NIGHT": "多云（夜间）",
      "CLOUDY": "阴",
      "LIGHT_HAZE": "轻度雾霾",
      "MODERATE_HAZE": "中度雾霾",
      "HEAVY_HAZE": "重度雾霾",
      "LIGHT_RAIN": "小雨",
      "MODERATE_RAIN": "中雨",
      "HEAVY_RAIN": "大雨",
      "STORM_RAIN": "暴雨",
      "FOG": "雾",
      "LIGHT_SNOW": "小雪",
      "MODERATE_SNOW": "中雪",
      "HEAVY_SNOW": "大雪",
      "STORM_SNOW": "暴雪",
      "DUST": "浮尘",
      "SAND": "沙尘",
      "WIND": "大风",
    },
    conditionCode: {
      "CLEAR_DAY": "./image/100.svg",
      "CLEAR_NIGHT":"./image/100.svg",
      "PARTLY_CLOUDY_DAY": "./image/101.svg",
      "PARTLY_CLOUDY_NIGHT": "./image/101.svg",
      "CLOUDY": "./image/104.svg",
      "LIGHT_HAZE": "./image/501.svg",
      "MODERATE_HAZE": "./image/501.svg",
      "HEAVY_HAZE":"./image/501.svg",
      "LIGHT_RAIN": "./image/305.svg",
      "MODERATE_RAIN":"./image/306.svg",
      "HEAVY_RAIN": "./image/310.svg",
      "STORM_RAIN": "./image/308.svg",
      "FOG":"./image/502.svg",
      "LIGHT_SNOW": "./image/400.svg",
      "MODERATE_SNOW": "./image/401.svg",
      "HEAVY_SNOW": "./image/402.svg",
      "STORM_SNOW": "./image/402.svg",
      "DUST": "./image/500.svg",
      "SAND": "./image/503.svg",
      "WIND": "./image/200.svg",
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
    alert:{},
    realtime: {},
    minutely:{},
    hourly:{},
    daily:{},
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
                  summary: this.data.chineseCode[realtimeData.realtime.skycon],
                  tianqitubiao: this.data.conditionCode[realtimeData.realtime.skycon],
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
      url: 'https://api.caiyunapp.com/v2.5/'+token+'/'+x+','+y+'/weather.json?alert=true',
      success: (res)=>{
        let url =  'https://api.caiyunapp.com/v2.5/'+token+'/'+x+','+y+'/weather.json?alert=true'
        console.log(url)
        let updateTime = res.data.server_time
        let weatherInfo = res.data.result
        let hourlyArray = {};
     
       console.log(hourlyArray)
        this.setData({
          alert: weatherInfo.alert,
          realtime: weatherInfo.realtime,
          minutely: weatherInfo.minutely,
          hourly: weatherInfo.hourly,
          daily:weatherInfo.daily,
          updatetime: time.formatTime(updateTime,'Y.M.D h:m:s')
        })

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
