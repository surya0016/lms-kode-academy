import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface SidebarItemProps {
  icon:LucideIcon
  href:string
  label:string
}

const SidebarItem:React.FC<SidebarItemProps> = ({
  icon: Icon,
  href,
  label
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = 
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`)

  const onClick = () => {
    router.push(href)
  }
  return (    
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-zinc-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 dark:hover:text-zinc-300 hover:bg-slate-300/20",
        isActive && "text-sky-700 dark:text-zinc-300 bg-sky-200/20 dark:bg-sky-100/20 hover:bg-sky-200/20 dark:hover:text-white hover:text-sky-700",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon 
          size={22}
          className={cn(
            "text-zinc-500",
            isActive && "text-sky-700 dark:text-white"
          )}
        />
        {label}
      </div>
      <div className={cn(
        "ml-auto opacity-0 border-2 border-sky-600 dark:border-white h-full transition-all",
        isActive && "opacity-100"
      )}/>
    </button>
  )
}

export default SidebarItem