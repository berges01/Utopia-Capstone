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

async function insertNum(sensorId, count) {
    buffer = Buffer.from(count, "base64")
    decimalCount = buffer.readUInt8(0)
    const result = await connection.query('INSERT INTO TrailUserData (trail_name, people_count) VALUES (?, ?)', [sensorId, decimalCount], (error, results, fields) => {
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
    switch(day) {
        case "Sunday":
            const sunday = await new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TrailUserData WHERE DAYOFWEEK(current_time) = 1;`, (error, results, fields) => {
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve(results)
                })
            })
            return sunday
        case "Monday":
            const monday = await new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TrailUserData WHERE DAYOFWEEK(current_time) = 2;`, (error, results, fields) => {
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve(results)
                })
            })
            return monday
        case "Tuesday":
            const tuesday = await new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TrailUserData WHERE DAYOFWEEK(current_time) = 3;`, (error, results, fields) => {
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve(results)
                })
            })
            return tuesday 
        case "Wednesday":
            const wednesday = await new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TrailUserData WHERE DAYOFWEEK(current_time) = 4;`, (error, results, fields) => {
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve(results)
                })
            })
            return wednesday
        case "Thursday":
            const thursday = await new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TrailUserData WHERE DAYOFWEEK(current_time) = 5;`, (error, results, fields) => {
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve(results)
                })
            })
            return thursday   
        case "Friday":
            const friday = await new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TrailUserData WHERE DAYOFWEEK(current_time) = 6;`, (error, results, fields) => {
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve(results)
                })
            })
            return friday
        case "Saturday":
            const saturday = await new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TrailUserData WHERE DAYOFWEEK(current_time) = 7;`, (error, results, fields) => {
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve(results)
                })
            })
            return saturday 
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
            const murdock = await new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TrailUserData WHERE device_location = Murdock;`, (error, results, fields) => {
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