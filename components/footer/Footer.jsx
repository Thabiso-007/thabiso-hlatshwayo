import Link from 'next/link'
import React, { useEffect, useState} from 'react'
import { IoIosArrowDropupCircle } from 'react-icons/io'

import { links, socials, projects } from '../../utils/links'

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
            <div onClick={scrollUp} className={'rounded-full shadow-lg shadow-gray-900 p-3 cursor-pointer hover:scale-105 ease-in duration-75'}>
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
              {socials.map(social => (
                <div key={social.id}>
                  <Link href={social.url}>
                    <social.icon className={'text-2xl cursor-pointer hover:text-[#D4AF37]'} />
                  </Link>
                </div>
              ))}
              
            </div>
          </ul>      
        </div>
        <div className={'p-5'}>
          <ul>
            <p className={'text-[#D4AF37] font-bold text-2xl pb-4'}>Links</p>
            {links.map(link => (
              <li key={link.id} className={'text-grey-500 text-md pb-2 text-semibold hover:text-[#D4AF37] cursor-pointer'}>
                <Link href={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={'p-5'}>
          <ul>
            <p className={'text-[#D4AF37] font-bold text-2xl pb-4'}>Projects</p>
            {projects.map(project => (
              <li key={project.id} className={'text-grey-500 text-md pb-2 text-semibold hover:text-[#D4AF37] cursor-pointer'}>
                <Link href={project.path}>{project.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={'flex flex-col justify-center items-center text-center p-5 bg-[#000000]'}>
        <p className={'font-bold'}>Copyright © {new Date().getFullYear()} Thabiso Hlatshwayo</p> 
      </div>
    </>
  )
}

export default Footer