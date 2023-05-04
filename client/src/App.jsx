import React from 'react'
import './styles/main.scss'
import {
  createBrowserRouter,
  RouterProvider,

  Outlet
} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Write from './pages/Write'
import Single from './pages/Single'

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: < Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/write',
        element: <Write />
      },
      {
        path: '/post/:id',
        element: <Single />
      }
    ]

  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])

function App () {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
