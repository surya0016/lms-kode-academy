import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  variant?: "default" | "success";
  size?: "default" | "sm";
  value: number
}

const colorByVariant = {
  default: "text-sky-700 dark:text-sky-300",
  success: "text-emerald-700 dark:text-emerald-300",
}

const sizeByVariant = {
  default: "text-sm",
  success: "text-xs",
}

const CourseProgress = ({
  variant,
  size, 
  value
}: CourseProgressProps) => {

  return (
    <div>
      <Progress
        className="h-2"
        value={value}
        variant={variant}
      />
      <p className={cn(
        "font-medium mt-2 text-sky-700",
        colorByVariant[variant || "default"],
        sizeByVariant[variant || "default"],
      )}>
        {Math.round(value)}% Complete
      </p>
    </div>
  )
}

export default CourseProgress