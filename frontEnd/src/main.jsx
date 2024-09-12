import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SignUp from './Components/SignUp'
import Video from './Components/Video'
import LogSign from './Layouts/LogSign'
import Login from './Components/Login'
import Home from './Layouts/Home'
import {Provider} from 'react-redux'
import { store } from './Redux/Store'

const router = createBrowserRouter([
  {
      path: '/',
      element: <Home/>,
      children: [
        {
          path: '',
          element: <Video/>
        }
      ]
  },
  {
    path: "/user/",
    element: <LogSign/>,
    children: [
      {
        path: 'register',
        element: <SignUp/>
      },
      {
        path: 'login',
        element: <Login/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
