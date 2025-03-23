import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import Login from './Pages/LogIn.jsx'
import SignUp from './Pages/SignUp.jsx'

const routes=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
    <Route path='/' element={<Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/home' element={<Home/>}/>
    


  </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
