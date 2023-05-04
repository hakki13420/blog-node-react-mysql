// import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/authContext'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import moment from 'moment'
import { useLocation, useNavigate } from 'react-router-dom'
import noImage from '../assets/images/noImage.png'
import { privateRequest } from '../requestMethod'
import ListCategories from '../components/ListCategories'
const BASE_URL = import.meta.env.VITE_BASE_URL

const Write = () => {
  const state = useLocation().state
  const [inputs, setInputs] = useState({
    title: state ? state.title : '',
    cat: state ? state.category_id : ''
  })
  console.log('state    ', state)
  const [file, setFile] = useState(null)
  const [value, setValue] = useState(state ? state.content : '')
  const [src, setSrc] = useState(noImage)

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (state) {
      setSrc(`${BASE_URL}/${state.image}`)
    } else {
      setSrc(noImage)
      setInputs({ title: '', cat: '' })
      setValue('')
      setFile(null)
    }
  }, [state])

  const handelChangeInput = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handelChangeFile = (e) => {
    setFile(e.target.files[0])

    // const src =
    setSrc(URL.createObjectURL(e.target.files[0]))

    // document.getElementById('preview-post-image').src = src
  }

  const deleteFile = () => {
    setFile(null)
    document.getElementById('preview-post-image').src = noImage
  }

  const uploadFile = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await privateRequest.post('/upload', formData)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const submitForm = async (e) => {
    e.preventDefault()
    let urlImage = null
    console.log('file name', state?.image.split('/')[2])
    console.log('file name File', file?.name)
    if (state?.image.split('/')[2] !== file?.name && file?.name) urlImage = await uploadFile()
    const data = {
      title: inputs.title,
      content: value,
      date: moment().format('YYYY-MM-DD'),
      category: inputs.cat,
      user_id: currentUser.id,
      category_id: inputs.cat
    }
    if (urlImage) data.image = urlImage
    console.log('url image', urlImage)
    try {
      !state
        ? await privateRequest.post('/posts', data)
        : await privateRequest.put(`/posts/${state.id}`, data)

      navigate('/')
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        window.localStorage.clear()
        navigate('/login', { state: { error: 'your token is invalid' } })
      }
      console.log(error)
    }
  }

  return (
    <div className='writePost'>
      <div className="writePost__left">
        <input type="text" name='title' value={inputs.title} placeholder='the title...' onChange={handelChangeInput} />
      <div className="editor-wrapper">
        <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
      </div>
      </div>

      <div className="writePost__right">
        <div className="option">
          <h1>publish</h1>
          <div className="option-container">
          <div className="option__left">
            <span><b>status : </b>Draft</span>
            <span><b>visibility : </b>Public</span>
            <label className="link" htmlFor="file">upload image</label>
            <input style={{ display: 'none' }} type="file" id="file" name="file" onChange={handelChangeFile} />
            {
              file && <div className="link-name">
                <p>{file?.name}</p>
                <span onClick={deleteFile}>&times;</span>
              </div>
            }
          </div>

          <div className="option__right">
            <img src={src} id="preview-post-image" alt="preview-post-image" />
          </div>
          </div>
          <div className="buttons">
            <button>save as draft</button>
            <button onClick={submitForm}>{state ? 'Update' : 'Publish'}</button>
          </div>
        </div>

        <ListCategories handelChangeInput={handelChangeInput} cat={inputs.cat}/>
      </div>
    </div>
  )
}

export default Write
