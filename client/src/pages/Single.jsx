// import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import moment from 'moment'
import RelatedPosts from '../components/RelatedPosts'
import { privateRequest, publicRequest } from '../requestMethod'
import { getContentText } from '../helper/parsContent'

const BASE_URL = import.meta.env.VITE_BASE_URL

const Single = () => {
  const [post, setPost] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await publicRequest.get(`/posts/${id}`)
        setPost(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  }, [id])

  const deletePost = async () => {
    console.log('post id to delete', post.id)
    try {
      if (window.confirm('are you sure?')) {
        await privateRequest.delete(`/posts/${post.id}`)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="single">
      <div className="single__left">
      {console.log('post ', post)}
        <div className="single__left__image">
          <img src={`${BASE_URL}/${post.image}`} alt="single-image" />
        </div>
        <div className="single__left__user">
          <div className="user">
            <img src={post?.userImage} alt="avatar" />
          </div>
          <div className="meta">
            <p className="username">{post?.name}</p>
            <p className="date">{moment(post?.date).fromNow()}</p>
          </div>
          { currentUser?.email === post?.email &&
            (
            <div className="icones">
              <Link to={'/write'} state={post} className="link"><i className="ri-edit-line"></i></Link>
              <i className="ri-delete-bin-2-line" onClick={deletePost}></i>
          </div>)
          }
        </div>
        <h1 className="title">{post.title}</h1>
        <p className="content">
          {getContentText(post.content)}
        </p>
      </div>
      <div className="single__right">
        <RelatedPosts category={post.category_id} />
      </div>
    </div>
  )
}

export default Single
