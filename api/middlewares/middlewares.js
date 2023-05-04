const fs = require('fs')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const { conn } = require('../config')

module.exports.unknow = (req, res) => {
  return res.status(404).json('page not found 404')
}

module.exports.isAuthenticated = (req, res, next) => {
  console.log('req is auth', req.params.id)
  console.log('req is auth', req.cookies)
  const token = req.cookies.access
  console.log('token', token)

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) return res.status(401).json('bad token')
      console.log('data token', data)
      if (data) {
        req.user_id = data.id
        return next()
      }
    })
  } else return res.status(401).json('you have to authenticate')
}

module.exports.isAuthorized = (req, res, next) => {
  console.log('id in req', req.params.id)
  console.log('user_id authorized', req.user_id)
  if (req.user_id) {
    const q = 'SELECT * FROM posts WHERE id=?'
    conn.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err)
      if (data) {
        console.log('post to delete ', data[0].id)
        if (req.user_id !== data[0].user_id) return res.status(403).json('user inauthorized')
        if (req.user_id === data[0].user_id) return next()
      }
    })
  }
}

const folderName = () => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

module.exports.createFolder = (req, res, next) => {
  if (!fs.existsSync(`./uploads/${folderName()}`)) {
    fs.mkdirSync(`./uploads/${folderName()}`, { recursive: true })
  }
  next()
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/${folderName()}`)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

module.exports.upload = multer({ storage })
