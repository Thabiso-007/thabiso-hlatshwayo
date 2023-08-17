import React from 'react'
import Image from 'next/image'

import { data } from '../../utils/data'

const TeckStack = () => {
  return (
    <>
        {data.map((item) => (
            <div  key={item.id} className={'p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300'}>
                <div className={'grid grid-cols-2 gap-4 justify-center items-center'}>
                    <div className={'m-auto'}>
                        <Image
                            src={item.image}
                            alt='' 
                            width={'64'} 
                            height={'64'} 
                        />
                    </div>
                    <div className={'flex flex-col items-center justify-center'}>
                        <h3>{item.name}</h3>
                    </div>
                </div>
            </div>
        ))}
    </>
  )
}

export default TeckStack