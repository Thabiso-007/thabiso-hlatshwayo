import Head from 'next/head'
import React from 'react'

import ExpressStoreAPI from '../../../components/express-store-api/ExpressStoreAPI'
import Fyur from '../../../components/fyur/Fyur'
import Thabiso from '../../../components/thabiso/Thabiso'
import Calculator from '../../../components/calculator/Calculator'
import Weather from '../../../components/weather/Weather'
import Executant from '../../../components/executant/Executant'

import api from '../../../public/assets/projects/api.png'
import fyur from '../../../public/assets/projects/fyur.png'
import thabiso from '../../../public/assets/projects/thabiso.png'
import calculator from '../../../public/assets/projects/calculator.png'
import weather from '../../../public/assets/projects/weather.png'
import executant from '../../../public/assets/projects/executant.png'

const index = () => {
  return (
    <>
      <Head>
        <title>API projects</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className={'h-20'}></div>
      <div className={'w-full'}>
        <div className={'max-w-[1240] mx-auto px-2 py-16'}>
            <p className={'text-xl tracking-widest uppercase text-[#D4AF37] text-center font-bold'}>Projects</p>
            <h2 className={'py-4 text-center'}>API I have developed</h2>
            <div className={'grid md:grid-cols-2 gap-8'}>
                <ExpressStoreAPI title="Express-store-api" backgroundImg={api} projectURL={'/projects/api/express-api'}/>
            </div>
        </div>
    </div>
    </>
  )
}

export default index