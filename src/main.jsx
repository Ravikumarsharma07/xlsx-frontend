import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster, toast } from "react-hot-toast";
import Layout from './Layout.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Layout />
    <Toaster position="top-right" />
  </StrictMode>,
)
