import { SearchIcon } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='border '>
      {/* <span className='flex'><SearchIcon className='h-4 w-4 opacity-50'/><span>Search</span></span> */}
      <input type="text" className='p-2' placeholder="Search"/>
    </div>
  )
}

export default SearchBar