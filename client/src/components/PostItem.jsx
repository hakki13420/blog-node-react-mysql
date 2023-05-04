import React from 'react'
import { Link } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_BASE_URL

/* eslint-disable react/prop-types */
const PostItem = ({ item }) => {
  return (
    <div className="postItem">
        <div className="postItem__poster">
            <img src={`${BASE_URL}/${item.image}`} alt="poster" />
        </div>
        <h5 className="title">{item.title}</h5>
        <Link to={`/post/${item.id}`}><button>Read More</button></Link>
    </div>
  )
}

export default PostItem
