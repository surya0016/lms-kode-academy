"use client"

import FileUpload from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Attachment, Course } from '@prisma/client'
import axios from 'axios'
import { File, Loader2, Pencil, PlusCircle, Trash2Icon} from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

interface AttachmentProps {
  initialData:Course & { attachments: Attachment[] };
  courseId: string
}

const formSchema = z.object({
  url:z.string().url().min(1)
})

const Attachment = ({
  initialData, courseId
}:AttachmentProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [deletingId, setDeletingId] = useState<string|null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      url: initialData?.imageUrl || ""
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async(values:z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values)
      toast.success("Attachment updated")
      setIsEditing(!isEditing)
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    }
    console.log(values)
  }

  const onDelete = async(id:string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment Deleted")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong while deleting")
    } finally {
      setDeletingId(null)
    }
  }
  
  return (
    <div className="mt-6 border dark:text-white dark:bg-slate-900 bg-slate-100 rounded-md p-4">
      <div className="font-semibold mb-2 flex items-center justify-between">
        Course Attachments
        <Button variant="ghost" onClick={()=>setIsEditing(!isEditing)}>
          {isEditing && (
            <>
              Cancel
            </>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className='w-4 h-4 mr-2'/>
              Add a file
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="w-4 h-4 mr-2"/>
              Edit Attachment
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {
            initialData.attachments.length > 0 && (
              <div className="space-y-2">
                {initialData.attachments.map((attachment)=>(
                  <div 
                  key = {attachment.id}
                  className="flex items-center justify-between p-3 w-full border-sky-200 border text-sky-700 rounded-md bg-sky-100"
                  >
                    <File className="h-4 w-4 mr-2 flex-shrink-0"/> 
                    <p className="text-sm line-clamp-1">
                      {attachment.name}
                    </p>
                    {deletingId === attachment.id && (
                      <div>
                        <Loader2 className="h-4 w-4 animate-spin"/>
                      </div>
                    )}
                    {deletingId !== attachment.id && (
                      <button
                        onClick={()=>onDelete(attachment.id)}
                        className='ml-auto hover:opacity-75 transition'
                      >
                        <Trash2Icon className="h-4 w-4 "/>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )
          }
        </>
      )}{isEditing && (
      <div className="">
        <FileUpload 
          endpoint='courseAttachment'
          onChange={(url)=>{
            if(url){
              onSubmit({url: url})
              console.log(initialData.imageUrl)
            }
          }}
        />
        <div className="text-sx text-muted-foreground mt-4">
          Add anything your stundents might need to complete the course
        </div>
      </div>
      )}
    </div>
  )
}

export default Attachment