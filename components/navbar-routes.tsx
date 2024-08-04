"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { DarkModeToggle } from "./toggle-dark-mode";

export const NavbarRoutes = () => {
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith("/teacher")
  const isPlayerPage = pathname?.startsWith("/chapter")

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
            <Button variant="ghost" size="sm" className="mt-1">
              <LogOut className="h-4 w-4 mr-1 "/>
              Exit
            </Button>
        </Link>
      ): (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher Mode
          </Button>
        </Link>
      )}
      <DarkModeToggle className="mx-2"/>
      <UserButton
        afterSwitchSessionUrl="/"
      />
    </div>
  )
}