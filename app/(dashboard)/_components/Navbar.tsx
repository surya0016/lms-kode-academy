import React from 'react'
import SearchBar from './SearchBar'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './MobileSidebar'
import { NavbarRoutes } from '@/components/navbar-routes'

const Navbar = () => {
  return (
    <div className='border-b dark:bg-slate-950  bg-white flex items-center p-4 justify-between  shadow-sm'>
        <MobileSidebar />
        <NavbarRoutes />
    </div>
  )
}

export default Navbar