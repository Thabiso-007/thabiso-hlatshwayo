import Image from 'next/image'
import React from 'react'

import tailwind from '../../public/assets/skills/tailwind-css.png'

const Tailwind = () => {
  return (
    <div className={'p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300'}>
        <div className={'grid grid-cols-2 gap-4 justify-center items-center'}>
            <div className={'m-auto'}>
                <Image
                    src={tailwind}
                    alt='' 
                    width={'84'} 
                    height={'84'} 
                />
            </div>
            <div className={'flex flex-col items-center justify-center'}>
                <h3>Tailwind CSS</h3>
            </div>
        </div>
     </div>
  )
}

export default Tailwind