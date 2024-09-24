import React, { useRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const container = useRef(null);
  const hamburger = useRef(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if(menu && hamburger) {
      hamburger.current.classList.remove('w-0');
      hamburger.current.classList.add('w-[100%]');
    }
    else {
      hamburger.current.classList.remove('w-[100%]');
      hamburger.current.classList.add('w-0');
    }

  }, [menu])

  return (
    <nav ref={container} className='navbar w-full h-[10vh] flex items-center px-[var(--spacing-sm)] sm:px-[var(--spacing-lg)] justify-between relative'>
      <h1 className='font-custom1 text-4xl'>SneakHeads</h1>
      <div className="options hidden sm:flex uppercase gap-16 font-custom3">
        <NavLink to='/' className="">Home</NavLink>
        <NavLink to='/mens' className="">Mens</NavLink>
        <NavLink to='/womens' className="">Womens</NavLink>
        <NavLink to='/collections' className="">Collections</NavLink>
      </div>
      <div className="icons text-2xl hidden sm:flex gap-5">
        {/* <i className="ri-shopping-cart-2-line"></i> */}
        <NavLink to='/signup' ><i className="ri-account-circle-line cursor-pointer"></i></NavLink>
      </div>

      <i className="ri-menu-3-line text-2xl sm:hidden cursor-pointer" onClick={() => setMenu(!menu)}></i>
      <div ref={hamburger} className="hamburger sm:hidden flex flex-col absolute top-0 right-0 w-0 h-screen overflow-hidden justify-center bg-[#f0f0f0] text-4xl gap-10 transition-all duration-300 font-custom3">
          <i className="close-btn ri-close-line absolute top-3 right-3 cursor-pointer" onClick={() => setMenu(!menu)}></i>
          <NavLink to='/' className="w-full text-center">Home</NavLink>
          <NavLink to='/mens' className="w-full text-center">Mens</NavLink>
          <NavLink to='/womens' className="w-full text-center">Womens</NavLink>
          <NavLink to='/collections' className="w-full text-center">Collections</NavLink>
      </div>
    </nav>
  )
}

export default Navbar;