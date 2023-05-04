const { conn } = require('../config')

const router = require('express').Router()

router.get('/', (req, res) => {
  const q = 'SELECT * FROM categories'
  conn.query(q, (err, data) => {
    if (err) return res.status(500).json(err)
    if (data) return res.status(200).json(data)
  })
})

module.exports = router
