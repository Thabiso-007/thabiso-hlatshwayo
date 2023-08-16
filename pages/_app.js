import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import '../styles/globals.css'
import Footer from '../components/footer/Footer';
import NavBar from '../components/nav-bar/NavBar';

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
