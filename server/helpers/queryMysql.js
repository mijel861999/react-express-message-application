const connectionMysql = require("../mysql/mysql")

const getDataWithQuery = (query, data) => {
    return new Promise((resolve, reject) => {

        if(data) {
            connectionMysql.query(query, data, (err, results, fields) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        } else {
            connectionMysql.query(query,(err, result, fields) => {
            if(err) {
                return reject(err)
            }

            return resolve(result)
        })
        } 
    })
}

module.exports = getDataWithQuery