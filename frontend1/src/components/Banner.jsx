import React from 'react'

const Banner = ({ data, color }) => {
  return (
    <div className='w-full h-[10vh] relative flex justify-center items-center overflow-hidden my-5'>
        <div className='absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 -z-10 text-8xl tracking-[.5em] text-nowrap text-zinc-700 uppercase font-extrabold'>{data}</div>
        <h1 style={{ color:`${color}`}} className='z-20 text-center text-6xl uppercase tracking-wider font-semibold'>{data}</h1>
    </div>
  )
}

export default Banner