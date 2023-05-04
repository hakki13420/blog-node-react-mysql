require('dotenv').config()
const { conn } = require('../config')

const categories = [
  {
    id: 1,
    category: 'frontend'
  },
  {
    id: 2,
    category: 'backend'
  },
  {
    id: 3,
    category: 'cms'
  },
  {
    id: 4,
    category: 'others'
  }
]

const sql = 'DELETE from categories'

conn.query(sql, (err) => {
  if (err) console.log(err)
  console.log('all rows are deleted from categories')

  categories.forEach((category, index) => {
    const q = 'INSERT INTO categories (category) VALUES (?)'

    conn.query(q, [category.category], (err, data) => {
      if (err) console.log(err)
      if (data) console.log(`add the row number ${index + 1}`)
    })
  })
})
