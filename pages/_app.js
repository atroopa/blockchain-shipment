import '@/styles/globals.css'

// INTERNAL IMPORTS
 import  {TrackingProvider} from '@/context/Tracking.js';
import { Navbar, Footer } from '@/components';

export default function App({ Component, pageProps }) {
  return (
    <div>
      <TrackingProvider>
        <Navbar/>
        <Component {...pageProps} />
      </TrackingProvider>
  
    </div>
  ) 
}
