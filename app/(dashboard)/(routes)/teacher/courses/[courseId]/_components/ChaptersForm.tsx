"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Chapter, Course } from '@prisma/client'
import axios from 'axios'
import { Pencil, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

interface ChaptersFormProps {
  initialData:Course & {chapters: Chapter[]}
  courseId: string
}

const formSchema = z.object({
  title:z.string().min(1,{
    message:"Title is required"
  })
})

const ChaptersForm = ({
  initialData, courseId
}:ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  
  const toggleCreating = () => {
    setIsUpdating((current)=>!current)
    console.log("Clicked")
  }

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues: {
      title:"",
    } 
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async(values:z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values)
      toast.success("Chapter Created")
      toggleCreating()
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    }
    console.log(values)
  }
  
  return (
    <div className="mt-6 border dark:text-white dark:bg-slate-900 bg-slate-100 rounded-md p-4">
      <div className="font-semibold flex items-center justify-between">
        Course Chapters
        <Button variant="ghost" onClick={()=>setIsCreating(!isCreating)}>
          {isCreating ? (
            <>
              Cancel
            </>
          ):(
            <>
              <PlusCircle className="w-4 h-4 mr-2"/>
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 mt-43'
        >
          <FormField
            control={form.control}
            name="title"
            render={({field})=>(
              <FormItem>
                <FormControl>
                  <Input
                    
                    disabled={isSubmitting}
                    placeholder="e.g. 'Introduction to the course'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={!isValid || isSubmitting} type="submit">
            Create
          </Button>
        </form>
      </Form>
      )}
      {!isCreating && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.chapters.length && "text-slate-500 italic"
        )}>
          {!initialData.chapters.length && "No chapters"}
          {/* TODO:List of chapters */}
        </div>
      )}
      {
        !isCreating && (
          <p className="text-xs text-muted-foreground mt-4">
            Drag and drop to reorder the chapters
          </p>
        )
      }
    </div>
  )
}

export default ChaptersForm