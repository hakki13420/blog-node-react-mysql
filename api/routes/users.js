const { conn } = require('../config')
const router = require('express').Router()

// all users
router.get('/', (req, res) => {
  const sql = 'SELECT name, email FROM users'
  conn.query(sql, (err, data) => {
    if (err) return res.status(500).json(err)
    if (data) {
      return res.status(200).json(data)
    }
  })
})

// add user
router.post('/', (req, res) => {
  const { name, email, password } = req.body
  if (name && email && password) {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?)'
    conn.query(sql, [name, email, password], (err, data, fields) => {
      if (err) return res.status(400).json(err)
      if (data) {
        return res.status(201).json(data)
      }
    })
  }
})

// update user
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { name, email, password } = req.body
  if (!id) {
    return res.status(400).json('bad id')
  }
  const sql = 'UPDATE users SET name=?, email=?, password=? WHERE id=?'
  conn.query(sql, [name, email, password, id], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data) {
      console.log('update data', data)
      return res.status(200).json(data)
    }
  })
})

// remove user

router.delete('/:id', (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json('bad id')
  const sql = 'DELETE FROM users WHERE id=?'
  conn.query(sql, [id], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data) return res.status(204).json(data)
  })
})

module.exports = router
