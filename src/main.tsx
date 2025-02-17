import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from "@/components/ui/toaster"
import { Provider } from "react-redux";
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
         <App />
         <Toaster/>
      </Provider>
   </ThemeProvider>
)
