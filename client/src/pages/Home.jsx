// import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { publicRequest } from '../requestMethod'
import { getContentText } from '../helper/parsContent'
const BASE_URL = import.meta.env.VITE_BASE_URL

const Home = () => {
  const [posts, setPosts] = useState([])

  const location = useLocation
  const query = location().search

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await publicRequest.get(`/posts${query}`)
        setPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllPosts()
  }, [query])
  return (
    <div className="home">
      {
        posts.map(post => {
          return (
            <div className="post" key={post.id} >
              <div className="post-image">
                <img src={`${BASE_URL}/${post.image}`} alt="post-image" />
              </div>
              <div className="post-content">
                <Link to={`/post/${post.id}`} className='link'>
                  <h1 className="title">{post.title}</h1>
                </Link>
                <p className="content">
                  {[...getContentText(post?.content)?.split(' ').slice(0, 30), '...'].join(' ')}
                </p>
                <div className="button">
                  <button>
                    <Link className='link' to={`/post/${post.id}`}>
                      Read More
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home
