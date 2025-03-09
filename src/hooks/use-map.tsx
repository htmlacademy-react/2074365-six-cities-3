import React, {useEffect, useRef, useState} from 'react';
import leaflet, {Map} from 'leaflet';
import {TitleLayer} from '@/constants/constants.tsx';

type UseMapProps = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  containerRef: React.RefObject<HTMLElement | null>;
}


function useMap({location, containerRef}: UseMapProps): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (containerRef.current !== null && !isRenderedRef.current) {
      const inst = leaflet.map(containerRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom
      });

      leaflet
        .tileLayer(TitleLayer.TILE_LAYER_URL_PATTERN, {
          attribution: TitleLayer.TILE_LAYER_ATTRIBUTION
        })
        .addTo(inst);

      setMap(inst);
      isRenderedRef.current = true;
    }
  }, [containerRef, location]);

  return map;
}

export default useMap;
