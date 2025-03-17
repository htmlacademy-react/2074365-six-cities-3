import React, {useEffect, useState} from 'react';
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

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (!map) {
      const instance = leaflet.map(containerRef.current, {
        center: [location.latitude, location.longitude],
        zoom: location.zoom,
      });

      leaflet
        .tileLayer(TitleLayer.TILE_LAYER_URL_PATTERN, {
          attribution: TitleLayer.TILE_LAYER_ATTRIBUTION,
        })
        .addTo(instance);

      setMap(instance);
    } else {
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [containerRef, location, map]);

  return map;
}

export default useMap;
