"use client"

import FileUpload from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@prisma/client'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface ImageFormProps {
  initialData:Course
  courseId: string
}

const formSchema = z.object({
  imageUrl:z.string().min(1, {
    message:"Image is required"
  })
})

const ImageForm = ({
  initialData, courseId
}:ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      imageUrl: initialData?.imageUrl || ""
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async(values:z.infer<typeof formSchema>) => {
    console.log(values)
  }
  
  return (
    <div className="mt-6 border dark:text-white dark:bg-slate-900 bg-slate-100 rounded-md p-4">
      <div className="font-semibold flex items-center justify-between">
        Course Image
        <Button variant="ghost" onClick={()=>setIsEditing(!isEditing)}>
          {isEditing && (
            <>
              Cancel
            </>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className='w-4 h-4 mr-2'/>
              Add an imgae
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="w-4 h-4 mr-2"/>
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center mt-4 h-60 bg-slate-200 dark:bg-slate-800 rounded-md ">
            <ImageIcon className='h-8 w-8 mr-2'/>
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="upload"
              fill
              src={initialData.imageUrl}
              className='object-cover rounded-md'
            />
          </div>
        )
      )}{isEditing && (
      <div className="">
        <FileUpload 
          endpoint='courseImage'
          onChange={(url)=>{
            if(url){
              onSubmit({imageUrl: url})
            }
          }}
        />
        <div className="text-sx text-muted-foreground mt-4">
          16:9 aspect ration recommended
        </div>
      </div>
      )}
    </div>
  )
}

export default ImageForm