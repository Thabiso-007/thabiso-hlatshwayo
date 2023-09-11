import Head from 'next/head'
import React from 'react'

import Gude from '../components/gude/Gude'
import ExpressStoreAPI from '../components/express-store-api/ExpressStoreAPI'
//import Contact from '../components/contact/Contact'
import Fyur from '../components/fyur/Fyur'
import Thabiso from '../components/thabiso/Thabiso'
//import Movie from '../components/movie/Movie'
import Calculator from '../components/calculator/Calculator'
import Weather from '../components/weather/Weather'
import Executant from '../components/executant/Executant'

import api from '../public/assets/projects/api.png'
import gude from '../public/assets/projects/gude.png'
//import contact from '../public/assets/projects/phone.png'
import fyur from '../public/assets/projects/fyur.png'
import thabiso from '../public/assets/projects/thabiso.png'
import calculator from '../public/assets/projects/calculator.png'
import weather from '../public/assets/projects/weather.png'
import executant from '../public/assets/projects/executant.png'

const Projects = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className={'h-20'}></div>
      <div className={'w-full'}>
        <div className={'max-w-[1240] mx-auto px-2 py-16'}>
            <p className={'text-xl tracking-widest uppercase text-[#D4AF37] text-center font-bold'}>Projects</p>
            <h2 className={'py-4 text-center'}>What I have built</h2>
            <div className={'grid md:grid-cols-2 gap-8'}>
                {/* <Gude title="Express" backgroundImg={gude} projectURL={'/projects/express'}/> */}
                <ExpressStoreAPI title="Express-store-api" backgroundImg={api} projectURL={'/projects/express-api'}/>
                {/* <Contact title="Contact" backgroundImg={contact} projectURL={'/projects/contacts'}/> */}
                <Fyur title="Fyer" backgroundImg={fyur} projectURL={'/projects/fyur'}/>
                <Thabiso title="thabiso" backgroundImg={thabiso} projectURL={'/projects/thabiso'}/>
                <Calculator title="calculator" backgroundImg={calculator} projectURL={'/projects/calculator'}/>
                <Weather title="calculator" backgroundImg={weather} projectURL={'/projects/weather-forecast'}/>
                <Executant title="Executant" backgroundImg={executant} projectURL={'/projects/executant'} />
            </div>
        </div>
    </div>
    </>
  )
}

export default Projects