Page({
    onClick:function(){
        console.log("Button is click")
        wx.cloud.callFunction({
            name: "baidubk"
        }).then(console.log)
    }
})