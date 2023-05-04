require('dotenv').config()
const { conn } = require('../config')
const bcrypt = require('bcrypt')

const users = [
  {
    id: 1,
    name: 'hakki rabah',
    email: 'rabah@gmail.com',
    password: 'rabah',
    image: 'https://picsum.photos/id/20/80'
  },
  {
    id: 2,
    name: 'hakki soufiane',
    email: 'soufiane@gmail.com',
    password: 'soufiane',
    image: 'https://picsum.photos/id/21/80'
  },
  {
    id: 3,
    name: 'hakki youcef',
    email: 'youcef@gmail.com',
    password: 'youcef',
    image: 'https://picsum.photos/id/22/80'
  },
  {
    id: 4,
    name: 'hakki yassine',
    email: 'yassine@gmail.com',
    password: 'yassine',
    image: 'https://picsum.photos/id/23/80'
  },
  {
    id: 5,
    name: 'hakki widad',
    email: 'widad@gmail.com',
    password: 'widad',
    image: 'https://picsum.photos/id/24/80'
  },
  {
    id: 6,
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
    image: 'https://picsum.photos/id/25/80'
  }
]

const sql = 'DELETE from USERS'

conn.query(sql, (err) => {
  if (err) console.log(err)
  console.log('all rows are deleted from users')

  users.forEach((user, index) => {
    const q = 'INSERT INTO users (name, email, password, image) VALUES (?, ?, ? ,?)'
    const values = [user.name, user.email, bcrypt.hashSync(user.password, 12), user.image]
    conn.query(q, [...values], (err, data) => {
      if (err) console.log(err)
      if (data) console.log(`add the row number ${index + 1}`)
    })
  })
})

process.exit()
