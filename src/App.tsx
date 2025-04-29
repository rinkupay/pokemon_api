import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import MainLayout from './components/Layout/MainLayout'
import Lists from './pages/Lists/LIsts'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:<Lists />
      },
      {
        path:"/lists",
        element:<Lists />
      },
      
    ]

  }
])

function App() {
  const queryClient = new QueryClient();

  return   (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} >
        </RouterProvider>
        </QueryClientProvider>
        </>
  )
   
  
}

export default App
