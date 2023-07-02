import Image from 'next/image'
import React from 'react'

import mysql from '../../public/assets/skills/mysql.png'

const MySQL = () => {
  return (
    <div className={'p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300'}>
        <div className={'grid grid-cols-2 gap-4 justify-center items-center'}>
            <div className={'m-auto'}>
                <Image
                    src={mysql}
                    alt='' 
                    width={'100'} 
                    height={'100'} 
                />
            </div>
            <div className={'flex flex-col items-center justify-center'}>
                <h3>MySQL</h3>
            </div>
        </div>
     </div>
  )
}

export default MySQL