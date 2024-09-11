import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
        <div className="mycontainer flex justify-around items-center px-4 py-5">
        <div className='logo font-bold'>
        <span className='text-green-500'> &lt;</span>   
       
        Pass
       
            <span className='text-green-500'>OP/&gt;</span>
            
            </div>
        {/* <ul className=''>
            <li className='flex gap-4'>
                <a href="#" className='hover:font-bold'>Home</a>
                <a href="#" className='hover:font-bold'>Contact</a>
                <a href="#" className='hover:font-bold'>About</a>
            </li>
        </ul> */}
        <button className='text-white flex gap-3 items-center'>
          github
          <img className='invert w-7'  src="/icons/github.png" alt="" />
        </button>

        </div>
       

    </nav>
  )
}

export default Navbar