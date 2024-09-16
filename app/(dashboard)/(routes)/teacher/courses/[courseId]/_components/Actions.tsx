"use client"

import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import ConfirmModal from "@/components/confirm-modal";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti.store";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const Actions = ({
  disabled,
  courseId,
  isPublished
}:ActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore()
  const router = useRouter()

  const onClick = async () => {
    try {
      setIsLoading(true)

      if(isPublished){
        await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success("Course unpublished")
        router.refresh()
      }else{
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success("Course published")
        confetti.onOpen();
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
      await axios.delete(`/api/courses/${courseId}`)
      toast.success("Course Deleted")
      router.refresh()
      router.push(`/teacher/courses`)
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

export default Actions