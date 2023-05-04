const mysql = require('mysql')

const conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DBNAME
})

const connect = () => {
  conn.connect(err => {
    if (err) console.log(err)
    console.log('connected to database')
  })
}

module.exports = {
  conn, connect
}
