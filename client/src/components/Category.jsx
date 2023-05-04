import React from 'react'

const Category = ({ category, handelChangeInput, cat }) => {
  return (
    <div className="option-item">
        <input type="radio" name='cat' checked={cat === category.id} id='front' value={category.id} onChange={handelChangeInput} />
        <label htmlFor="front">{category.category}</label>
    </div>
  )
}

export default Category
