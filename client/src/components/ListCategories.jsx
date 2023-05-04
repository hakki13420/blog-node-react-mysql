import React, { useEffect, useState } from 'react'
import { publicRequest } from '../requestMethod'
import Category from './Category'

const ListCategories = ({ handelChangeInput, cat }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await publicRequest('/categories')
        setCategories(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getCategories()
  }, [])

  return (
    <div className="option">
          <h1>categories</h1>
          {
            categories?.map(category => <Category key={category.id} handelChangeInput={handelChangeInput} cat={cat} category={category} />)
          }

    </div>
  )
}

export default ListCategories
