import React from 'react'

function NameComponent({ name, date }) {
  return (
    <div className='w-full mx-auto flex flex-row justify-between items-center'>
        <h1 className='text-zinc-800 text-2xl font-bold font-rubik'>Welcome, {name}</h1>
        <h2 className="text-zinc-800 text-base font-normal font-rubik leading-tight">{date}</h2>
    </div>
  )
}

export default NameComponent