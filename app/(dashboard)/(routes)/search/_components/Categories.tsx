"use client"

import { Category } from '@prisma/client'
import {
  FcCalculator,
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode
} from "react-icons/fc"
import { IconType } from 'react-icons/lib'
import CategoryItem from './CategoryItem'

interface CategoriesProps {
  items:Category[]
}

const iconMap: Record<Category["name"], IconType> = {
  "Computer Science": FcMultipleDevices,
  "Photography": FcOldTimeCamera,
  "Engineering": FcEngineering,
  "Accounting": FcSalesPerformance,
  "Fitness": FcSportsMode,
  "Music": FcMusic,
  "Filming": FcFilmReel,
  "Maths": FcCalculator,
}

const Categories = ({items}:CategoriesProps) => {
  return (
    <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
      {items.map((item)=>(
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}

export default Categories