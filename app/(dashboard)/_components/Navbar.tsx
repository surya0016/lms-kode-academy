import React from 'react'
import SearchBar from './SearchBar'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './MobileSidebar'
import { NavbarRoutes } from '@/components/navbar-routes'

const Navbar = () => {
  return (
    <div className='border-b flex items-center p-4 justify-between  shadow-sm'>
        <MobileSidebar />
        <NavbarRoutes />
    </div>
  )
}

export default Navbar