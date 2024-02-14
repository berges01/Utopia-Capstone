const mysql = require('mysql')
require('dotenv').config()

const dbUser = process.env.MYSQLUSER
const dbPassword = process.env.MYSQLPASS
const dbHost = process.env.MYSQLHOST

const connection = mysql.createConnection({
    connectionLimit: 8,
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: 'HistoricalTrailData'
})

function insertNum(sensorId, count) {
    buffer = Buffer.from(count, "base64")
    decimalCount = buffer.readUInt8(0)
    connection.query('INSERT INTO TrailUserData (trail_name, people_count) VALUES (?, ?)', [sensorId, decimalCount], (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error.stack)
        }
        console.log('Query results: ', results)
    })
}

async function getDb(id) {
    try {
        const results = await new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ${id}`, (error, results, fields) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(results)
            })
        })
        return results
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    insertNum,
    getDb,
}