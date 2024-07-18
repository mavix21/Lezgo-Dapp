import { z } from 'zod';

const entrySchema = z.object({
  ticket_name: z.string().min(2, {
    message: 'Ticket name must be at least 2 characters.',
  }),
  quantity: z.coerce.number(),
  price: z.coerce.number(),
});

export const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name of the event must be at least 2 characters.',
  }),
  category: z.string().min(1, {
    message: 'Category is required.',
  }),
  description: z.string().min(2, {
    message: 'Description of the event must be at least 2 characters.',
  }),
  city: z.string().min(2, {
    message: 'City is required.',
  }),
  address: z.string().min(2, {
    message: 'Address must be at least 2 characters.',
  }),
  reference: z.string().min(2, {
    message: 'Reference must be at least 2 characters.',
  }),
  start_date: z.date({
    required_error: 'Start date is required.',
  }),
  end_date: z.date({
    required_error: 'End date is required.',
  }),
  //entries: z.array(entrySchema),
});

// export const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })
