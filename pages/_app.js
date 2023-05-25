import '@/styles/globals.css'

// INTERNAL IMPORTS
import {TrackingProvider} from '../context/Tracking';
import { Navbar, Footer } from '@/components';

export default function App({ Component, pageProps }) {
  return (
    <>
      <TrackingProvider>
      <Navbar />
      <Component {...pageProps} />
      </TrackingProvider>
      <Footer/>
    </>
  ) 
}
