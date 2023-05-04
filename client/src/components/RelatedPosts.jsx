import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { publicRequest } from '../requestMethod'
import PostItem from './PostItem'

const postItems = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    image: 'https://picsum.photos/id/18/800'
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
    image: 'https://picsum.photos/id/19/800'
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor sit amet consectetur, adipisici',
    image: 'https://picsum.photos/id/20/800'
  },
  {
    id: 4,
    title: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
    image: 'https://picsum.photos/id/21/800'
  },
  {
    id: 5,
    title: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
    image: 'https://picsum.photos/id/22/800'
  }
]
const RelatedPosts = ({ category }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  console.log('category ', category)
  useEffect(() => {
    const getRelatedPost = async () => {
      try {
        const res = await publicRequest.get(`/posts?cat=${category}`)
        setRelatedPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getRelatedPost()
  }, [category])
  console.log('related posts', relatedPosts)
  return (
    <>
        {
          relatedPosts?.map(item => {
            return <PostItem key={item.id} item={item} />
          })
        }
    </>
  )
}

export default RelatedPosts
