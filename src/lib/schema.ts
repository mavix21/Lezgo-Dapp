import { z } from 'zod';

// export const FormDataSchema = z.object({
//   firstName: z.string().min(1, 'First name is required'),
//   lastName: z.string().min(1, 'Last name is required'),
//   email: z.string().min(1, 'Email is required').email('Invalid email address'),
//   country: z.string().min(1, 'Country is required'),
//   street: z.string().min(1, 'Street is required'),
//   city: z.string().min(1, 'City is required'),
//   state: z.string().min(1, 'State is required'),
//   zip: z.string().min(1, 'Zip is required')
// })

export const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name of the event must be at least 2 characters.',
  }),
  category: z.string().min(2, {
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
  //   description: z.string().min(1, {
  //     message: 'First name is required',
  //   }),
});
