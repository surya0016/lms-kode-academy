"use client"

import { IconType } from 'react-icons/lib'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import React, { Key } from 'react'
import qs from "query-string"

interface CategoryItemProps {
  icon?: IconType,
  value?: string
  label?: string
}

const CategoryItem = ({
  icon: Icon,
  value,
  label
}: CategoryItemProps) => {
  const pathname = usePathname()
  const  router = useRouter()
  const params = useSearchParams()

  const currentCategoryId = params.get("categoryId")
  const currentTitle = params.get("title")

  const isSelected = currentCategoryId === value

  const onClick = () => {
    console.log(currentCategoryId)
    console.log("Clicked");
    
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        title: currentTitle,
        categoryId: isSelected ? null : value,
      }
    },{ skipNull: true, skipEmptyString: true})
    
    router.push(url)
  }

  return (
    <button 
      onClick={onClick} 
      className={cn(
        "py-2 px-3 text-sm border dark:border-slate-700 border-slate-200  rounded-full flex items-center gap-x-1 hover:border-sky-700",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800 "
        )} 
      type='button'>

      {Icon && <Icon size={20}/>}
      <div className="truncate">
        {label}
      </div>
    </button>
  )
}

export default CategoryItem