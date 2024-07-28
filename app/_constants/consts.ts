export const LOCAL_STORAGE = {
  ACCOUNT: 'account',
  WALLET: 'wallet',
};

export const ENV = {
  NODE: process.env.NEXT_PUBLIC_NODE_ADDRESS,
  DNS_API_URL: process.env.NEXT_PUBLIC_DNS_API_URL,
  DNS_NAME: process.env.NEXT_PUBLIC_DNS_NAME,
};

export const steps = [
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
