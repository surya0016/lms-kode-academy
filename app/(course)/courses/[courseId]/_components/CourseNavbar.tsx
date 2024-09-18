import { NavbarRoutes } from '@/components/navbar-routes';
import { Chapter, Course, UserProgress } from '@prisma/client'
import React from 'react'
import CourseMobileSidebar from './CourseMobileSidebar';

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[]
  };
  progressCount: Number;
}

const CourseNavbar = ({
  course,
  progressCount
}:CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center dark:bg-slate-950 bg-white shadow-sm">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      />
      <NavbarRoutes/>
    </div>
  )
}

export default CourseNavbar