"use client"

import { Editor } from '@/components/Editor'
import { Preview } from '@/components/Preview'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chapter, Course } from '@prisma/client'
import axios from 'axios'
import { Loader2, Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

interface ChapterAccessFormProps {
  initialData:Chapter
  courseId: string
  chapterId: string
}

const formSchema = z.object({ 
  isFree:z.boolean().default(false)
})

const ChapterAccessForm = ({
  initialData, courseId, chapterId
}:ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree
    }
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async(values:z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success("Chapter updated")
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
        Chapter Access 
        <Button variant="ghost" onClick={()=>setIsEditing(!isEditing)}>
          {isEditing ? (
            <>
              Cancel
            </>
          ):(
            <>
              <Pencil className="w-4 h-4 mr-2"/>
              Edit Access
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.isFree && "text-slate-500 italic"
        )}>
          {initialData.isFree ? (
            <>This is chapter is free for preview</> 
          ):(
            <>This chapter is not free</>
          )}
        </div>
      )}{isEditing && (
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 mt-43'
        >
          <FormField
            control={form.control}
            name="isFree"
            render={({field})=>(
              <FormItem  className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4 border">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormDescription>
                    Check this box if you want to make this chapter free for preview
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button disabled={!isValid || isSubmitting} type="submit">
            {
              isSubmitting ? <>Saving <Loader2 className="animate-spin h-4 w-4 ml-1"/></>: "Save"
            }
            </Button>
          </div>
        </form>
      </Form>
      )}
    </div>
  )
}

export default ChapterAccessForm