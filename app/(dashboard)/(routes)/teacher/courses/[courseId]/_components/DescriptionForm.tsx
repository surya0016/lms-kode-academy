"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@prisma/client'
import axios from 'axios'
import { Loader2, Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

interface DescriptionFormProps {
  initialData:Course
  courseId: string
}

const formSchema = z.object({
  description:z.string().min(1, {
    message:"Description is required"
  })
})

const DescriptionForm = ({
  initialData, courseId
}:DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    } 
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async(values:z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success("Description updated")
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
        Course Description
        <Button variant="ghost" onClick={()=>setIsEditing(!isEditing)}>
          {isEditing ? (
            <>
              Cancel
            </>
          ):(
            <>
              <Pencil className="w-4 h-4 mr-2"/>
              Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.description && "text-slate-500 italic"
        )}>
          {initialData.description || "No Description" }
        </p>
      )}{isEditing && (
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 mt-43'
        >
          <FormField
            control={form.control}
            name="description"
            render={({field})=>(
              <FormItem>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="e.g. 'This course is about...'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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

export default DescriptionForm