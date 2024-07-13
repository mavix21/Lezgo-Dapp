'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight } from 'lucide-react'
// import { FormDataSchema } from '@/lib/schema'
import { formSchema } from '@/lib/schema'

// const processForm: SubmitHandler<Inputs> = data => {
//   console.log(data)
// }



// type Inputs = z.infer<typeof formSchema>

const steps = [
  {
    id: 'Step 1',
    name: 'Event Details',
    fields: ['username']
  },
  {
    id: 'Step 2',
    name: 'Location',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  {
    id: 'Step 3',
    name: 'Ticket Details',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  { id: 'Step 4', name: 'Complete' }
]

export default function EventPage() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   reset,
  //   trigger,
  //   formState: { errors }
  // } = useForm<Inputs>({
  //   resolver: zodResolver(formSchema)
  // })

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  type FieldName = keyof z.infer<typeof formSchema>

  const next = async () => {
    const fields = steps[currentStep].fields
    // const output = await trigger(fields as FieldName[], { shouldFocus: true })
    const output = await form.trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        // await handleSubmit(processForm)()
        await form.handleSubmit(onSubmit)
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }


  return (
    <div className='bg-background text-foreground flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0 mb-8'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-l-4  py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium  transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-primary'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-foreground py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-muted-foreground transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          <div className='mt-8 pt-5'>
            <div className='flex justify-between'>
              <Button size="icon" disabled={currentStep === 0} onClick={prev}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" disabled={currentStep === steps.length - 1} onClick={next}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

        </form>
      </Form>

      {/* <Button type="submit">Submit</Button> */}
    </div>
  )
}