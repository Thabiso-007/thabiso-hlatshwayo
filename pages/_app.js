import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

import '../styles/globals.css'
import NavBar from '../components/nav-bar/NavBar'
import Footer from '../components/footer/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
      <ToastContainer />
    </>
  )
}

export default MyApp
