import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { SidebarProvider } from './components/ui/sidebar.tsx'
import { Toaster } from "@/components/ui/sonner"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TooltipProvider>
          <App />
          <Toaster />
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>,
)
