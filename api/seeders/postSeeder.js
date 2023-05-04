require('dotenv').config()
const { conn } = require('../config')

const posts = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit, porro!',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio delectus maiores earum dolorem aliquid laudantium, quod odio sequi temporibus eaque mollitia! Doloremque laboriosam dicta tenetur suscipit est minus in, magni minima, earum odio nam odit, eligendi iusto corporis. Accusamus id saepe dignissimos eius omnis optio vel mollitia repudiandae quam expedita?',
    image: 'https://picsum.photos/id/10/800',
    date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    category: 'cms',
    user_id: 6
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit, porro!',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio delectus maiores earum dolorem aliquid laudantium, quod odio sequi temporibus eaque mollitia! Doloremque laboriosam dicta tenetur suscipit est minus in, magni minima, earum odio nam odit, eligendi iusto corporis. Accusamus id saepe dignissimos eius omnis optio vel mollitia repudiandae quam expedita?',
    image: 'https://picsum.photos/id/11/800',
    date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    category: 'back',
    user_id: 7
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit, porro!',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio delectus maiores earum dolorem aliquid laudantium, quod odio sequi temporibus eaque mollitia! Doloremque laboriosam dicta tenetur suscipit est minus in, magni minima, earum odio nam odit, eligendi iusto corporis. Accusamus id saepe dignissimos eius omnis optio vel mollitia repudiandae quam expedita?',
    image: 'https://picsum.photos/id/12/800',
    date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    category: 'others',
    user_id: 6
  },
  {
    id: 4,
    title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit, porro!',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio delectus maiores earum dolorem aliquid laudantium, quod odio sequi temporibus eaque mollitia! Doloremque laboriosam dicta tenetur suscipit est minus in, magni minima, earum odio nam odit, eligendi iusto corporis. Accusamus id saepe dignissimos eius omnis optio vel mollitia repudiandae quam expedita?',
    image: 'https://picsum.photos/id/13/800',
    date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    category: 'cms',
    user_id: 6
  },
  {
    id: 5,
    title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit, porro!',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio delectus maiores earum dolorem aliquid laudantium, quod odio sequi temporibus eaque mollitia! Doloremque laboriosam dicta tenetur suscipit est minus in, magni minima, earum odio nam odit, eligendi iusto corporis. Accusamus id saepe dignissimos eius omnis optio vel mollitia repudiandae quam expedita?',
    image: 'https://picsum.photos/id/14/800',
    date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    category: 'front',
    user_id: 7
  },
  {
    id: 6,
    title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit, porro!',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio delectus maiores earum dolorem aliquid laudantium, quod odio sequi temporibus eaque mollitia! Doloremque laboriosam dicta tenetur suscipit est minus in, magni minima, earum odio nam odit, eligendi iusto corporis. Accusamus id saepe dignissimos eius omnis optio vel mollitia repudiandae quam expedita?',
    image: 'https://picsum.photos/id/15/800',
    date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    category: 'front',
    user_id: 11
  }
]

const sql = 'DELETE FROM posts'

conn.query(sql, (err) => {
  if (err) console.log(err)
  console.log('all rows are deleted from posts')

  posts.forEach((post, index) => {
    const q = 'INSERT INTO posts (title, content, date, image, category, user_id) VALUES (?, ?, ?, ? ,?, ?)'
    const values = [post.title, post.content, post.date, post.image, post.category, post.user_id]
    conn.query(q, [...values], (err, data) => {
      if (err) console.log(err)
      if (data) console.log(`add the row number ${index + 1}`)
    })
  })
})
