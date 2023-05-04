const { conn } = require('../config')
const express = require('express')
const { isAuthenticated, isAuthorized } = require('../middlewares/middlewares')

const router = express.Router()

// get all posts
router.get('/', (req, res) => {
  const sql = req.query.cat
    ? 'SELECT posts.id, posts.title, posts.content, posts.image, posts.date, users.name, categories.category FROM posts INNER JOIN users ON posts.user_id=users.id INNER JOIN categories ON posts.category_id=categories.id WHERE posts.category_id=?'
    : 'SELECT posts.id, posts.title, posts.content, posts.image, posts.date, users.name, categories.category FROM posts INNER JOIN users ON posts.user_id=users.id INNER JOIN categories ON posts.category_id=categories.id'
  conn.query(sql, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(data)
  })
})

// add post
router.post('/', isAuthenticated, (req, res) => {
  const q = 'INSERT INTO posts (title, content, image, date, category, user_id) VALUES (?,?,?,?,?,?)'
  const values = [
    req.body.title,
    req.body.content,
    req.body.image,
    req.body.date,
    req.body.category,
    req.body.user_id

  ]
  conn.query(q, [...values], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data) return res.status(201).json(data)
  })
})

// get post
router.get('/:id', (req, res) => {
  const sql = 'SELECT posts.*, users.name, users.email, users.image AS userImage, categories.id AS category_id, categories.category FROM posts INNER JOIN users ON posts.user_id= users.id INNER JOIN categories ON posts.category_id=categories.id WHERE posts.id=?'
  conn.query(sql, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(data[0])
  })
})

// delete post
router.delete('/:id', isAuthenticated, isAuthorized, (req, res) => {
  const sql = 'DELETE FROM posts WHERE id=? AND user_id=?'
  conn.query(sql, [req.params.id, req.user_id], (err, data) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(data)
  })
})

// update post
router.put('/:id', isAuthenticated, isAuthorized, (req, res) => {
  console.log('body image', req.body.image)
  const q = req.body.image
    ? 'UPDATE posts SET title=?, content=?, image=?, date=?, user_id=?, category_id=? WHERE id=?'
    : 'UPDATE posts SET title=?, content=?, date=?, user_id=?, category_id=? WHERE id=?'
  const VALUES = req.body.image
    ? [
        req.body.title,
        req.body.content,
        req.body.image,
        req.body.date,
        req.body.user_id,
        req.body.category_id,
        req.params.id

      ]
    : [
        req.body.title,
        req.body.content,
        req.body.date,
        req.body.user_id,
        req.body.category_id,
        req.params.id

      ]
  conn.query(q, VALUES, (err, data) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(data)
  })
})

module.exports = router
