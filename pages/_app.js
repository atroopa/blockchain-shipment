import '@/styles/globals.css'

// INTERNAL IMPORTS
import {TrackingProvider} from '../context/Tracking';

export default function App({ Component, pageProps }) {
  return (
    <>
      <TrackingProvider>
      <Component {...pageProps} />
      </TrackingProvider>
    </>
  ) 
}
