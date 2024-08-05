'use client';

import { useRef, useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useApiIsLoaded,
} from '@vis.gl/react-google-maps';
import MapHandler from '@/app/(services)/maps/_components/map-handler';
import { PlacesAutocomplete } from '@/app/(services)/maps/_components/PlacesAutocomplete';

export default function Intro() {
  const position = { lat: -12.095857144713383, lng: -77.03658540486107 };
  const [open, setOpen] = useState(false);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
      <div className="relative h-svh">
        <Map
          defaultZoom={17}
          defaultCenter={position}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          reuseMaps={true}
        >
          <AdvancedMarker
            position={selectedPlace?.geometry?.location}
            onClick={() => setOpen(true)}
            draggable={true}
          ></AdvancedMarker>

          {open && (
            <InfoWindow
              position={selectedPlace?.geometry?.location}
              onCloseClick={() => setOpen(false)}
            >
              <p>{selectedPlace?.formatted_address ?? 'Hola'}</p>
              <p>{selectedPlace?.geometry?.location?.toString()}</p>
              <p>{selectedPlace?.geometry?.location?.lng()}</p>
              <p>{selectedPlace?.geometry?.location?.lat()}</p>
            </InfoWindow>
          )}

          <PlacesAutocomplete onPlaceSelect={setSelectedPlace} />

          <MapHandler place={selectedPlace} />
        </Map>
      </div>
    </APIProvider>
  );
}
