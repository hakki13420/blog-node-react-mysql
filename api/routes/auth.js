const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const router = require('express').Router()
const { conn } = require('../config')

router.post('/register', (req, res) => {
  const { name, email, password } = req.body
  // check existing user
  const sql1 = 'SELECT * FROM users WHERE email=?'
  conn.query(sql1, [email], async (err, data) => {
    if (err) return res.json(err)
    if (data.length) return res.status(409).json('user already exist')
    // hach password
    const hashedPassword = await bcrypt.hash(password, 12)
    // insert the user
    const sql = 'INSERT INTO users (name, email, password) VALUES (?,?,?)'
    conn.query(sql, [name, email, hashedPassword], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(201).json(data)
    })
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  const sql = 'SELECT * FROM users WHERE email=?'
  conn.query(sql, [email], async (err, data) => {
    if (err) return res.status(400).json(err)
    if (!data[0]) return res.status(400).json('false email')
    else {
      const comparePassword = await bcrypt.compare(password, data[0].password)
      if (!comparePassword) return res.status(400).json('false password')

      const token = jwt.sign({
        id: data[0].id,
        name: data[0].name
      }, process.env.JWT_SECRET)

      res.cookie('access', token, {
        httpOnly: true
      })
        .status(200).json({
          id: data[0].id,
          name: data[0].name,
          email: data[0].email
        })
    }
  })
})

router.get('/logout', (req, res) => {
  res.clearCookie('access')
    .status(200).json('user has been logout')
})

module.exports = router
