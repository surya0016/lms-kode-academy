"use client"

import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import ConfirmModal from "@/components/confirm-modal";
import { useRouter } from "next/navigation";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished
}:ChapterActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const onClick = async () => {
    try {
      setIsLoading(true)

      if(isPublished){
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
        toast.success("Chapter unpublished")
        router.refresh()
      }else{
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
        toast.success("Chapter published")
        router.refresh()
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async() => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
      toast.success("Chapter Deleted")
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)
    } catch (error) {
      toast.error("Something went wrong")
      setIsLoading(false)
    }
  }
  return ( 
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant={"outline"}
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal
        onConfirm={onDelete}
      >
        <Button size={"sm"} disabled={isLoading}>
          <div className="flex justify-center items-center">
            {isLoading ? <Loader2 className="animate-spin h-4 w-4"/> : <Trash className="h-4 w-4"/>}
          </div>
        </Button>
      </ConfirmModal>
    </div>
  )
}

export default ChapterActions