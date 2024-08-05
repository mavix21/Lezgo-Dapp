import {
  bigserial,
  numeric,
  pgTable,
  text,
  varchar,
} from 'drizzle-orm/pg-core';

const venues = pgTable('venue', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  latitude: numeric('latitude', { precision: 10, scale: 6 }),
  longitude: numeric('longitude', { precision: 10, scale: 6 }),
  formattedAddress: varchar('formatted_address', { length: 255 }),
  placeId: text('place_id'),
});

export default venues;
