"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formatPrice } from '@/lib/format'
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

interface PriceFormProps {
  initialData:Course
  courseId: string
}

const formSchema = z.object({
  price:z.coerce.number(),
})

const PriceForm = ({
  initialData, courseId
}:PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    } 
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async(values:z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success("Price updated")
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
        Course Price
        <Button variant="ghost" onClick={()=>setIsEditing(!isEditing)}>
          {isEditing ? (
            <>
              Cancel
            </>
          ):(
            <>
              <Pencil className="w-4 h-4 mr-2"/>
              Edit Price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.price && "text-slate-500 italic"
        )}>
          {
            initialData.price ? formatPrice(initialData.price) : "No Price"
          }
        </p>
      )}{isEditing && (
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 mt-43'
        >
          <FormField
            control={form.control}
            name="price"
            render={({field})=>(
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    disabled={isSubmitting}
                    placeholder="Set a price for your course"
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

export default PriceForm