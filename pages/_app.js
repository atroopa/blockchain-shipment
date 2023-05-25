import '@/styles/globals.css'

// INTERNAL IMPORTS
//import  {TrackingProvider} from '../context/Tracking';
import { Navbar, Footer } from '@/components';
import { ThemeContextProvider } from '../context/ThemeContext'

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeContextProvider>
        <Navbar/>
        <Component {...pageProps} />
        </ThemeContextProvider>
      <Footer/>
  
    </>
  ) 
}
