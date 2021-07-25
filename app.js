const huaweiLteApi = require("huawei-lte-api")
const { AntennaTypeEnum } = require("huawei-lte-api/dist/enums/device")
const colors = require('colors');
const { Modem, Connection } = require("./hooks")

let si = ""

Modem().then(data => {

    const device = new huaweiLteApi.Device(data.connection)
    si = setInterval( async () => {
        device.signal().then(  res => {
            const d = {
                rsrq: res.rsrq,
                rsrp: res.rsrp,
                rssi: res.rssi,
                sinr: res.sinr,
            }
            const quality = String(d.rsrp).split("dBm").join("")
            if (quality >= -80) {
                console.log(String(JSON.stringify(d)).green.bold)
            } else if (quality >= -90.0) {
                console.log(String(JSON.stringify(d)).blue.bold)
            } else if (quality >= -100.0) {
                console.log(String(JSON.stringify(d)).yellow.bold)
            } else {
                console.log(String(JSON.stringify(d)).red.bold)
            }
        }).catch(err => {
            console.log("Get signal error ".bold, String(err.code).bgRed.bold)
            clearInterval(si)
        })
    }, 3000);
}).catch(err => {
    console.log("Modem Error: ", err)
    clearInterval(si)
})







