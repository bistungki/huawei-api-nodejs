
const huaweiLteApi = require("huawei-lte-api")
const dotenv = require('dotenv');
dotenv.config()
//  const { AntennaTypeEnum } = require("huawei-lte-api/dist/enums/device")



exports.Connection = new huaweiLteApi.Connection(process.env.URL, 5000)
exports.Modem = () => {
    return new Promise((resolve, reject) => {
        this.Connection.ready.then((r) => {
            resolve({ status: 'OK', connection: this.Connection })
        }).catch(err => {
            if (err.code === 108003) {
                resolve({ status: 'OK', code: err.code, connection: this.Connection })
            } else {
                reject({ status: 'Fail', msg: err, connection: this.Connection })
            }
        })
    })
}