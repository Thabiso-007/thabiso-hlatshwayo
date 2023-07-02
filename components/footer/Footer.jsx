import Link from 'next/link'
import React, { useEffect, useState} from 'react'
import { IoIosArrowDropupCircle } from 'react-icons/io'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  const [toTop, setToTop] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setToTop(true)
      } else {
        setToTop(false)
      }
    }) 
  },[])

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behaviour: 'smooth'
    })
  }

  return (
    <>
      <div className={'mt-10'}>
        <div className={'flex justify-center py-12'}>
          {toTop && (
            <div onClick={scrollUp} className={'rounded-full shadow-lg shadow-gray-700 p-3 cursor-pointer hover:scale-105 ease-in duration-75'}>
              <IoIosArrowDropupCircle size={30}/>
            </div>
          )}
        </div>
      </div>
      <div className={'bg-grey-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20'}>
        <div className={'p-5'}>
          <ul>
            <p className={'text-[#fff] font-bold text-3xl pb-6'}>
              Thabiso <span className={'text-[#D4AF37]'}>Hlatshwayo</span>
            </p>
            <div className={'flex gap-6 pb-5'}>
              <Link href={'https://www.instagram.com/thabiso.timzo.dev/'}><FaInstagram className={'text-2xl cursor-pointer hover:text-[#D4AF37]'} /></Link>
              <Link href={'https://twitter.com/thabiso_dev'}><FaTwitter className={'text-2xl cursor-pointer hover:text-[#D4AF37]'} /></Link>
              <Link href={'https://github.com/Thabiso-007'}><FaGithub className={'text-2xl cursor-pointer hover:text-[#D4AF37]'} /></Link>
              <Link href={'https://www.linkedin.com/in/thabiso-hlatshwayo-8a4079198/'}><FaLinkedin className={'text-2xl cursor-pointer hover:text-[#D4AF37]'} /></Link>
            </div>
          </ul>      
        </div>
        <div className={'p-5'}>
          <ul>
            <p className={'text-[#D4AF37] font-bold text-2xl pb-4'}>Links</p>
            <li className={'text-grey-500 text-md pb-2 text-semibold hover:text-[#D4AF37] cursor-pointer'}>
              <Link href={'/'}>Home</Link>
            </li>
            <li className={'text-grey-500 text-md pb-2 text-semibold hover:text-[#D4AF37] cursor-pointer'}>
              <Link href={'/about'}>About</Link>
            </li>
            <li className={'text-grey-500 text-md pb-2 text-semibold hover:text-[#D4AF37] cursor-pointer'}>
              <Link href={'/skills'}>Skills</Link>
            </li>
            <li className={'text-grey-500 text-md pb-2 text-semibold hover:text-[#D4AF37] cursor-pointer'}>
              <Link href={'/projects'}>Projects</Link>
            </li>
            <li className={'text-grey-500 text-md pb-2 text-semibold hover:text-[#D4AF37] cursor-pointer'}>
              <Link href={'/contact'}>Contacts</Link>
            </li>
          </ul>
        </div>
        <div className={'p-5'}>
          <ul>
            <p className={'text-[#D4AF37] font-bold text-2xl pb-4'}>Project links</p>
            <li className={'text-grey-500 text-md pb-2 text-semibold hover:text-[#D4AF37] cursor-pointer'}>
              <Link href={'/projects/gude'}>Express store</Link>
            </li>
            <li className={'text-grey-500 text-md pb-2 text-semibold hover:text-[#D4AF37] cursor-pointer'}>
              <Link href={'/projects/calculator'}>Calculator</Link>
            </li>
            <li className={'text-grey-500 text-md pb-2 text-semibold hover:text-[#D4AF37] cursor-pointer'}>
              <Link href={'/projects/fyur'}>Fyur</Link>
            </li>
            <li className={'text-grey-500 text-md pb-2 text-semibold hover:text-[#D4AF37] cursor-pointer'}>
              <Link href={'/projects/thabiso'}>Thabiso</Link>
            </li>
          </ul>
        </div>
        {/* <div className={'p-5'}>
          <ul>
            <p className={'text-[#D4AF37] font-bold text-2xl pb-4'}>API Documentation</p>
            <li className={'text-grey-500 text-md pb-2 text-semibold hover:text-[#D4AF37] cursor-pointer'}>
              <Link href={'/docs/express'}>Express API Documentation</Link>
            </li>
            <li className={'text-grey-500 text-md pb-2 text-semibold hover:text-[#D4AF37] cursor-pointer'}>
              <Link href={'/docs/trivia'}>Trivia API Documentation</Link>
            </li>
          </ul>
        </div> */}
      </div>
      <div className={'flex flex-col justify-center items-center text-center p-5 bg-slate-800'}>
        <p className={'font-bold'}>Copyright © {new Date().getFullYear()} Thabiso Hlatshwayo</p> 
      </div>
    </>
  )
}

export default Footer