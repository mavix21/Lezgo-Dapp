export const CREATE_EVENT_STEPS = [
  {
    id: 'Step 1',
    name: 'Event Details',
    fields: ['name', 'category', 'description', 'start_date', 'end_date'],
  },
  {
    id: 'Step 2',
    name: 'Location',
    fields: ['city', 'address', 'reference'],
  },
  {
    id: 'Step 3',
    name: 'Ticket Details',
    fields: ['ticket_name', 'quantity', 'price'],
  },
  { id: 'Step 4', name: 'Complete' },
];
