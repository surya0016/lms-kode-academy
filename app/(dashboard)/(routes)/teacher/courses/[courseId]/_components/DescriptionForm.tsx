"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@prisma/client'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
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
    console.log(values)
  }
  
  return (
    <div className="mt-6 border dark:text-white dark:bg-slate-900 bg-slate-100 rounded-md p-4">
      <div className="font-semibold flex items-center justify-between">
        Description
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
                    className='bg-white'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button disabled={!isValid || isSubmitting} type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
      )}
    </div>
  )
}

export default DescriptionForm