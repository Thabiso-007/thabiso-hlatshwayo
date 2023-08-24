import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

import next from '../../../public/assets/skills/nextjs.png'
import tailwind from '../../../public/assets/skills/tailwind-css.png'
import typescript from '../../../public/assets/skills/typescript.png'

const Index = () => {
  return (
    <div>
        <Head>
            <title>Weather-forecast</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/logo.png" />
        </Head>
      
        <div className={'w-full'}>
        <div className={'w-screen h-[25vh] lg:h-[40vh relative]'}>
          <div className={'absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/50 z-10'}>
            <div className={'absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%]'}>
              <Link href={'/projects'}>
                <div className={'ml-5 mb-5 text-2xl cursor-pointer w-3 h-3 rounded-full hover:text-[#D4AF37]'}>
                  <BsFillArrowLeftCircleFill />
                </div>
              </Link>
              <h2 className={'text-[#fff] text-center'}>Weather forecast</h2>
              <div className={'flex justify-center gap-4 mt-5'}>
                <Image src={next} alt={''} width={'20'} height={'15'}/>
                <Image src={tailwind} alt={''} width={'20'} height={'15'}/>
                <Image src={typescript} alt={''} width={'20'} height={'15'}/>
              </div>
            </div>
          </div>
        </div>
        <div className={'h-10'}></div>
        <div className={'max-w-[1240px mx-auto p-10 pt-20'}>
          <div className={'col-span-4'}>
            <p>Project</p>
            <h3 className={'mt-2'}>Overview</h3>
            <p className={'mt-2'}>
            A weather forecast is simply a scientific estimate of future weather condition.
            Weather condition is the state of the atmosphere at a given time expressed in terms 
            of the most significant weather variables. The significant weather variables being forecast 
            differ from place to place.
            </p>
            <div className={'mt-10'}>
              <Link Link 
                href={'https://github.com/Thabiso-007/weather-forecast'}
                className={'px-6 py-3 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200'}
              >
                Source Code
              </Link>
            </div>
            <div className={'mt-10'}>
              <Link Link 
                href={'https://weather-forecast-three-snowy.vercel.app/'}
                className={'px-6 py-3 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200'}
              >
                View project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index