import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className="pt-36 px-12">
        <h1 className='font-bold text-6xl'>{title}</h1>
        <p className='p-6 text-lg w-1/3'>{overview}</p>
        <div className=''>
            <button className='cursor-pointer bg-gray-500/50 text-white p-3 px-8 text-xl rounded-lg'>
      ▶
     Play</button>
            <button className='cursor-pointer mx-2 bg-gray-500/50 text-white p-3 px-8 text-xl rounded-lg'>ℹ️More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;