'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { steps } from "@/constants/consts"
import { useSteps } from "@/context/ctx-event-steps"
import { useEventCategories } from "@/hooks/use-event-categories"
import { formSchema } from "@/lib/schema"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const processForm: SubmitHandler<Inputs> = data => {
  console.log(data)
}

type Inputs = z.infer<typeof formSchema>


export default function EventCreationForm() {
  const { categories, loading } = useEventCategories()
  const { currentStep, setCurrentStep, setPreviousStep, delta } = useSteps();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      category: "",
      description: "",
      city: "",
      address: "",
      reference: "",
      start_date: undefined,
      end_date: undefined,
      //entries: [{ ticket_name: "", quantity: 1, price: 0 }]
    },
  })

  const { trigger } = form;
  //const trigger = form.trigger;

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })
    // const output = await form.trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      // if (currentStep === steps.length - 2) {
      //   // await handleSubmit(processForm)()
      //   await form.handleSubmit(onSubmit)
      // }
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(1)
    console.log(values)
  }

  type FieldName = keyof z.infer<typeof formSchema>

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='space-y-8'
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Name of the event</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />

                    </FormControl>
                    <FormMessage className='absolute' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Category</FormLabel>
                    {/* <CategoriesCombo {...field} /> */}
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {loading ? (
                            <SelectItem value="0">Loading categories...</SelectItem>
                          ) : (
                            categories.map((category: any) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className='absolute' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Description of the event</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage className='absolute' />
                  </FormItem>
                )}
              />
              <div className='flex space-x-4'>
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // disabled={(date) =>
                            //   date > new Date() || date < new Date("1900-01-01")
                            // }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // disabled={(date) =>
                            //   date > new Date() || date < new Date("1900-01-01")
                            // }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? '20%' : '-20%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='space-y-8'
            >
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>City</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="lima">Lima</SelectItem>
                          <SelectItem value="arequipa">Arequipa</SelectItem>
                          <SelectItem value="cajamarca">Cajamarca</SelectItem>
                          <SelectItem value="ancash">Áncash</SelectItem>
                          <SelectItem value="huancavelica">Huancavelica</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className='absolute' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage className='absolute' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Reference</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage className='absolute' />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
          {/* 
      {currentStep === 2 && (
        <motion.div
          initial={{ x: delta >= 0 ? '20%' : '-20%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='space-y-8'
        >
          {entries.map((entry) => (
            <div key={entry.id} className="grid grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  //name="ticket_name"
                  name={`entries.${entry.id}.ticket_name`}
                  render={({ field }) => (
                    <FormItem className='relative'>
                      <FormLabel htmlFor={`nombre-${entry.id}`}>Ticket name</FormLabel>
                      <FormControl>
                        <Input id={`nombre-${entry.id}`} placeholder="" {...field} />
                      </FormControl>
                      <FormMessage className='absolute' />
                    </FormItem>
                  )}
                />

              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  //name="quantity"
                  name={`entries.${entry.id}.quantity`}
                  render={({ field }) => (
                    <FormItem className='relative'>
                      <FormLabel htmlFor={`cantidad-${entry.id}`}>Quantity</FormLabel>
                      <FormControl>
                        <Input id={`cantidad-${entry.id}`} type='number' placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage className='absolute' />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  //name="price"
                  name={`entries.${entry.id}.price`}
                  render={({ field }) => (
                    <FormItem className='relative'>
                      <FormLabel htmlFor={`precio-${entry.id}`}>Price</FormLabel>
                      <FormControl>
                        <Input id={`precio-${entry.id}`} placeholder="0.00" step='0.01' {...field} />
                      </FormControl>
                      <FormMessage className='absolute' />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <Button variant="default" onClick={addEntry}>
              <PlusIcon className="mr-2" />
              Agregar entrada
            </Button>
            <Button variant="destructive" onClick={removeLastEntry} className="ml-2">
              <TrashIcon className="mr-2" />
              Eliminar última entrada
            </Button>
          </div>

        </motion.div>
      )} */}

          <Button type="submit">Submit</Button>
        </form>
      </Form >

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
    </>
  )
}
