const huaweiLteApi = require("huawei-lte-api")
const { AntennaTypeEnum } = require("huawei-lte-api/dist/enums/device")
const colors = require('colors');
const { Modem, Connection, Now } = require("./hooks")

let si = ""

Modem().then(data => {

    const device = new huaweiLteApi.Device(data.connection)
    si = setInterval(async () => {
        device.signal().then(res => {
            const d = {
                rsrq: res.rsrq,
                rsrp: res.rsrp,
                sinr: res.sinr,
            }
            let quality = Math.abs(String(d.rsrq).split("dB").join(""))
            if (quality <= 9) {
                csl(String(JSON.stringify(d)).green.bold)
            } else if ( quality <= 11) {
                csl(String(JSON.stringify(d)).blue.bold)
            } else if ( quality <= 14) {
                csl(String(JSON.stringify(d)).yellow.bold)
            } else {
                csl(String(JSON.stringify(d)).red.bold)
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

const csl = (log) => {
    console.log(Now(), log)
}





