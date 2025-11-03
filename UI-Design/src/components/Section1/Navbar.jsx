import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between uppercase items-center px-18 py-8'>
        <h4 className='bg-black text-white px-5 py-3 rounded-full'>Target Audience</h4>
        <button className='bg-gray-200 px-4 py-2 uppercase rounded-full tracking-widest text-sm'>Digital Banking Platform</button>
    </div>
  )
}

export default Navbar