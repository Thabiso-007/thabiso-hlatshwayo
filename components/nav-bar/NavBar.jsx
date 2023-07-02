import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  AiOutlineClose, 
  AiOutlineMenu, 
  AiFillLinkedin,
  AiFillInstagram,
  AiFillGithub,
  AiFillMail,
  AiOutlineTwitter
} from 'react-icons/ai'

import logo from '../../public/assets/logo/logo.png'
// 1:58:37
const NavBar = () => {
  const [nav, setNav] = useState(false)
  const [shadow, setShadow] = useState(false)
  const [navBg, setNavBg] = useState('#ecf0f3')
  const [linkColor, setLinkColor] = useState('#1f2937')
  const router = useRouter()

  useEffect(() => {
    if (
      router.asPath === '/projects/contacts' || 
      router.asPath === '/projects/fyur' || 
      router.asPath === '/projects/express' || 
      router.asPath === '/projects/movie' || 
      router.asPath === '/projects/thabiso' ||
      router.asPath === '/projects/trivia'
      ) {
        setNavBg('transparent')
        setLinkColor('#fff')
    } else {
      setNavBg('#3f51b5')
      setLinkColor('#fff')
    }
  },[router])

  const handleNav = () => {
    setNav(!nav)
  }

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true)
      } else {
        setShadow(false)
      }
    } 
    window.addEventListener('scroll', handleShadow)
  }, [])

  return (
    <div 
      style={{backgroundColor: `${navBg}`}}
      className={shadow ? 'fixed w-full h-[60px] shadow-xl z-[100]' : 'fixed w-full h-[60px] z-[100]'}> 
      <div 
        className={'flex justify-between items-center w-full h-full px-2 2xl:px-16'}>
        <Link href={'/'}>
          <Image 
            src={logo} 
            alt='' 
            width={'125'} 
            height={'50'}
          />
        </Link>
        <div>
          <ul style={{color: `${linkColor}`}} className={'hidden md:flex'}>
            <Link href={'/'}>
              <li className={'ml-10 text-sm uppercase hover:border-b'}>Home</li>
            </Link>
            <Link href={'/about'}>
              <li className={'ml-10 text-sm uppercase hover:border-b'}>About</li>
            </Link>
            <Link href={'/skills'}>
              <li className={'ml-10 text-sm uppercase hover:border-b'}>Skills</li>
            </Link>
            <Link href={'/projects'}>
              <li className={'ml-10 text-sm uppercase hover:border-b'}>Projects</li>
            </Link>
            <Link href={'/contact'}>
              <li className={'ml-10 text-sm uppercase hover:border-b'}>Contact</li>
            </Link>
          </ul>
          <div className={'md:hidden'} onClick={handleNav}>
            <AiOutlineMenu size={30} />
          </div>
        </div>
      </div>
      <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70' : ''}>
        <div className={
          nav 
          ? 'fixed left-0 w-[75%] sm:[60%] md:w-[45%] h-screen bg-blue-700 p-10 ease-in duration-500' 
          : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'
          }
        >
          <div className="">
            <div className={'flex w-full items-center justify-between'}>
              <Link href={'/'}>
                <Image 
                  src={logo} 
                  alt='' 
                  width={'100'} 
                  height={'50'}
                />
              </Link>
              <div onClick={handleNav} className={'rounded-full shadow-lg shadow-gray-700 p-3 cursor-pointer'}>
                <AiOutlineClose size={25} />
              </div>
              </div>
              <div className={'border-b border-grey-300 my-4'}>
                <p className={'w-[85%] md:w-[90%] py-4'}>Teams and dreams may coexist.</p>
              </div>
            </div>
            <div className={'py-4 flex flex-col'}>
              <ul className='uppercase'>
                <Link href={'/'}>
                  <li onClick={() => setNav(false)} className={'py-4 text-sm'}>Home</li>
                </Link>
                <Link href={'/about'}>
                  <li onClick={() => setNav(false)} className={'py-4 text-sm'}>About</li>
                </Link>
                <Link href={'/skills'}>
                  <li onClick={() => setNav(false)} className={'py-4 text-sm'}>Skills</li>
                </Link>
                <Link href={'/projects'}>
                  <li onClick={() => setNav(false)} className={'py-4 text-sm'}>Projects</li>
                </Link>
                <Link href={'/contact'}>
                  <li onClick={() => setNav(false)} className={'py-4 text-sm'}>Contact</li>
                </Link>
              </ul> 
            </div>
            <div className={'pt-4'}>
              <p className={'uppercase tracking-widest text-[#D4AF37]'}>Let's talk.</p>
              <div className={'flex items-center justify-between my-4 w-full sm:w-[80%]'}>
                <div className={'rounded-full shadow-lg shadow-gray-700 p-3 cursor-pointer hover:scale-105 ease-in duration-75'}>
                  <Link href={'https://www.instagram.com/thabiso.timzo.dev/'}><AiFillInstagram size={20} /></Link>
                </div>
                <div className={'rounded-full shadow-lg shadow-gray-700 p-3 cursor-pointer hover:scale-105 ease-in duration-75'}>
                  <Link href={'https://twitter.com/thabiso_dev'}><AiOutlineTwitter size={20} /></Link>
                </div>
                <div className={'rounded-full shadow-lg shadow-gray-700 p-3 cursor-pointer hover:scale-105 ease-in duration-75'}>
                  <Link href={'https://www.linkedin.com/in/thabiso-hlatshwayo-8a4079198/'}><AiFillLinkedin size={20} /></Link>
                </div>
                <div className={'rounded-full shadow-lg shadow-gray-700 p-3 cursor-pointer hover:scale-105 ease-in duration-75'}>
                  <Link href={'https://github.com/Thabiso-Timzo'}><AiFillGithub size={20}/></Link>
                </div>
                <div className={'rounded-full shadow-lg shadow-gray-700 p-3 cursor-pointer hover:scale-105 ease-in duration-75'}>
                  <Link href={'mailto:thabiso.hlatshwayo24@gmail.com'}><AiFillMail size={20}/></Link>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar