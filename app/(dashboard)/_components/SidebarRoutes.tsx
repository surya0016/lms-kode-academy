"use client"

import { BarChart, CompassIcon, Layout, List } from "lucide-react"
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon:Layout,
    label:"Dashboard",
    href:"/"
  },
  {
    icon:CompassIcon,
    label:"Browse",
    href:"/search"
  },
]

const teacherRoutes = [
  {
    icon:List,
    label:"Courses",
    href:"/teacher/courses"
  },
  {
    icon:BarChart,
    label:"Analytics",
    href:"/teacher/analytics"
  },
]

const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacher = pathname?.includes("/teacher")

  const routes = isTeacher ? teacherRoutes : guestRoutes ;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route)=>(
        <SidebarItem 
          icon={route.icon}
          label={route.label}
          href={route.href}
          key={route.href}
        />
      ))}
    </div>
  )
}

export default SidebarRoutes