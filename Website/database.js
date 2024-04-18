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

async function insertNum(sensorId, count, date, time) {
    time = date.substring(11,19)
    buffer = Buffer.from(count, "base64")
    decimalCount = buffer.readUInt8(0)
    const result = await connection.query('INSERT INTO TrailUserData (trail_name, people_count, date, time) VALUES (?, ?, ?, ?)', [sensorId, decimalCount, date, time], (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error.stack)
        }
    })
    return(result)
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

async function getDataDay(day) {
    try {
        if (day === '') {
	    day = '2024-01-01'
	}
        const sunday = await new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM TrailUserData WHERE date = \'${day}\';`, (error, results, fields) => {
            if (error) {
                reject(error)
                return
            }
                resolve(results)
            })
        })
        return sunday
    } catch (error) {
	console.log(error)
    }
}

async function getDataLocation(location) {
    switch(location) {
        case "CTB":
            const CTB = '\"CTB 45A\"'
            const ctb = await new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TrailUserData WHERE device_location = ${CTB}`, (error, results, fields) => {
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve(results)
                })
            })
            return ctb
        case "Murdock":
	    const murdockCanalTrail = '\"Murdock Canal Trail\"'
            const murdock = await new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TrailUserData WHERE device_location = ${murdockCanalTrail};`, (error, results, fields) => {
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve(results)
                })
            })
            return murdock
        default:
            const database = await new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TrailUserData;`, (error, results, fields) => {
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve(results)
                })
            })
            return database 
    }
}

module.exports = {
    insertNum,
    getDb,
    getDataDay,
    getDataLocation,
}
