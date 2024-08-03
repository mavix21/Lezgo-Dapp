'use client';

import { Button } from '@/app/_components/ui/button';
import { Calendar } from '@/app/_components/ui/calendar';
import { DateTimePicker } from '@/app/_components/ui/datetimepicker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/_components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select';
import { useSteps } from '@/app/_context/ctx-event-steps';
import { insEvent } from '@/app/_hooks/use-event';
import { useEventCategories } from '@/app/_hooks/use-event-categories';
import { formSchema } from '@/app/_lib/schema';
import { cn } from '@/app/_lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleX,
  PlusIcon,
  TrashIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { CREATE_EVENT_STEPS } from '@/app/(services)/promoter/dashboard/_constants';
import { Label } from '@/app/_components/ui/label';
import { insEventTickets } from '@/app/_hooks/use-event-tickets';

const processForm: SubmitHandler<Inputs> = (data) => {
  console.log(data);
};

type Inputs = z.infer<typeof formSchema>;

export default function EventCreationForm() {
  const { categories, loading } = useEventCategories();
  const { currentStep, setCurrentStep, setPreviousStep, delta } = useSteps();
  const [entries, setEntries] = useState([{ id: 1 }]);

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: '',
      category: '',
      description: '',
      city: '',
      address: '',
      reference: '',
      start_date: undefined,
      end_date: undefined,
      entries: [{
        name: '',
        number_of_tickets: 0.00,
        // symbol: '',
        price: 0,
      }]
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "entries",
    control: form.control,
  })

  const { trigger } = form;
  //const trigger = form.trigger;

  //Steps
  const next = async () => {
    const fields = CREATE_EVENT_STEPS[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });
    // const output = await form.trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return;

    if (currentStep < CREATE_EVENT_STEPS.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  //Tickets
  const addEntry = () => {
    setEntries([...entries, { id: entries.length + 1 }])
  }
  const removeLastEntry = () => {
    if (entries.length > 1) {
      setEntries(entries.slice(0, entries.length - 1))
    }
  }

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log('Calling insEvent...');

      const eventId = await insEvent({
        userId: '956c4961-6635-4698-a139-1a93e93e2891',
        eventCategoryId: parseInt(values.category, 10),
        name: values.name,
        description: values.description,
        startDate: values.start_date,
        endDate: values.end_date,
        address: values.address,
        createdAt: new Date(),
      });
      //console.log(eventId, values);
      const tickets = values.entries;

      tickets.map(
        async (ticket, index) => (
          await insEventTickets({
            eventTicketId: index + 1,
            eventId: eventId[0].insertedId,
            currencyId: 'PEN',
            name: ticket.name,
            numberOfTickets: ticket.number_of_tickets,
            ticketPrice: ticket.price.toString(),
          })
        ))

      toast.success('Event has been created successfully.', {
        icon: <CircleCheck />,
      });

      // Usa un pequeño retraso para asegurar que el toast se muestre antes de la redirección
      setTimeout(() => {
        router.push('/promoter/dashboard');
      }, 1000);
    } catch (error) {
      toast.error('An error has ocurred.', {
        icon: <CircleX />,
        //description: 'Please try again later.',
      });
    }
  };

  type FieldName = keyof z.infer<typeof formSchema>;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* <form > */}
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Name of the event</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Category</FormLabel>
                    {/* <CategoriesCombo {...field} /> */}
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {loading ? (
                            <SelectItem value="0">
                              Loading categories...
                            </SelectItem>
                          ) : (
                            categories.map((category: any) => (
                              <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                              >
                                {category.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Description of the event</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start date</FormLabel>
                      <DateTimePicker
                        granularity="minute"
                        value={field.value}
                        onChange={field.onChange}
                      />
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
                      <DateTimePicker
                        granularity="minute"
                        value={field.value}
                        onChange={field.onChange}
                      />
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
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>City</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
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
                          <SelectItem value="huancavelica">
                            Huancavelica
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Reference</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />

            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? '20%' : '-20%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="space-y-8"
            >
              {
                fields.map((field, index) => {
                  return (
                    <div key={field.id} className="grid grid-cols-3 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor={`entries-${index}`}>Nombre de la entrada</Label>
                        <Input id={`entries-${index}`} placeholder="Ej. Gratis, VIP, Preventa"
                          {...form.register(`entries.${index}.name` as const, {
                            required: true
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`entries-${index}`}>Cantidad Disponible</Label>
                        <Input id={`entries-${index}`} placeholder="0" type="number"
                          {...form.register(`entries.${index}.number_of_tickets` as const, {
                            valueAsNumber: true,
                            required: true
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`entries-${index}`}>Precio</Label>
                        <div className="flex items-center">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Moneda" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PEN">S/.</SelectItem>
                              <SelectItem value="USD">$</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input id={`entries-${index}`} placeholder="0.00" type="number" step="0.01" className="ml-2"
                            {...form.register(`entries.${index}.price` as const, {
                              valueAsNumber: true,
                              required: true
                            })}
                          />
                          <Button type="button" variant="destructive" onClick={() => remove(index)} className="ml-2"
                            disabled={index === 0}>
                            <TrashIcon />
                          </Button>
                        </div>
                      </div>
                      {/* <div className="space-y-2">
                        <Button type="button" variant="destructive" onClick={() => remove(index)}>
                          <TrashIcon className="mr-2" />
                        </Button>
                      </div> */}
                    </div>
                  )
                })
              }


              {/* {entries.map((entry) => (
                <div key={entry.id} className="grid grid-cols-3 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`nombre-${entry.id}`}>Nombre de la entrada *</Label>
                    <Input id={`nombre-${entry.id}`} placeholder="Ej. Gratis, VIP, Preventa" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`cantidad-${entry.id}`}>Cantidad Disponible</Label>
                    <Input id={`cantidad-${entry.id}`} placeholder="0" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`precio-${entry.id}`}>Precio</Label>
                    <div className="flex items-center">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Moneda" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PEN">S/.</SelectItem>
                          <SelectItem value="USD">$</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input id={`precio-${entry.id}`} placeholder="0.00" type="number" step="0.01" className="ml-2" />
                    </div>
                  </div>
                </div>
              ))}*/}
              <div className="flex justify-end mt-4">
                <Button type="button" variant="default" onClick={() =>
                  append({
                    name: '',
                    number_of_tickets: 0,
                    price: 0.00,
                  })
                }>
                  <PlusIcon className="mr-2" />
                  Agregar entrada
                </Button>
                {/* <Button type="button" variant="destructive" onClick={removeLastEntry} className="ml-2">
                  <TrashIcon className="mr-2" />
                  Eliminar última entrada
                </Button> */}
              </div>
              <div className="mt-6 space-y-2"></div>
              <Button type="submit">Submit</Button>
            </motion.div>
          )}
        </form>
      </Form>

      <div className="mt-8 pt-5">
        <div className="flex justify-between">
          <Button size="icon" disabled={currentStep === 0} onClick={prev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            disabled={currentStep === CREATE_EVENT_STEPS.length - 1}
            onClick={next}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
