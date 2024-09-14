"use client"

import FileUpload from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chapter, MuxData } from '@prisma/client'
import axios from 'axios'
import { Pencil, PlusCircle, Video } from 'lucide-react'
import MuxPlayer from "@mux/mux-player-react"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

interface ChapterVideoProps {
  initialData:Chapter & { muxData?: MuxData | null }
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  videoUrl:z.string().min(1),
})

const ChapterVideoForm = ({
  initialData, courseId, chapterId
}:ChapterVideoProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      videoUrl: initialData?.videoUrl || ""
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async(values:z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success("Video updated")
      setIsEditing(!isEditing)
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    }
    console.log(values)
  }
  
  return (
    <div className="mt-6 border dark:text-white dark:bg-slate-900 bg-slate-100 rounded-md p-4">
      <div className="font-semibold flex items-center justify-between">
        Chapter video
        <Button variant="ghost" onClick={()=>setIsEditing(!isEditing)}>
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className='w-4 h-4 mr-2'/>
              Add an Video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="w-4 h-4 mr-2"/>
              Edit Video
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.videoUrl ? (
          <div className="flex items-center justify-center mt-4 h-60 bg-slate-200 dark:bg-slate-800 rounded-md ">
            <Video className='h-8 w-8 mr-2'/>
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer
              playbackId={initialData.muxData?.playbackId || ""}
            />
          </div>
        )
      )}{isEditing && (
      <div className="">
        <FileUpload 
          endpoint='chapterVideo'
          onChange={(url)=>{
            if(url){
              onSubmit({videoUrl: url})
            }
          }}
        />
        <div className="text-sx text-muted-foreground mt-4">
          Upload this chapter&apos;s video
        </div>
      </div>
      )}
      {
        initialData.videoUrl && !isEditing && (
          <div className='text-sm text-gray-500 '>
            Videos can take few minutes to process. Refresh the page if video does not appear
          </div>
        )
      }
    </div>
  )
}

export default ChapterVideoForm