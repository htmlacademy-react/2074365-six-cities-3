import {JSX, memo, useEffect, useMemo, useRef} from 'react';
import {ActiveMarkerIcon, Classes, DefaultMarkerIcon} from '../constants/constants.ts';
import {Offers} from '@/types/offer.tsx';
import leaflet, {layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '@/hooks/use-map.tsx';
import {useAppSelector} from '@/hooks';
import {getActiveOfferId} from '@/store/map-process/map-process.selectors.ts';


type LocationMapProps = {
  classType: 'city' | 'offer';
  offers: Offers;
}

function LocationMapComponent({classType, offers}: LocationMapProps): JSX.Element {
  const activeOfferId = useAppSelector(getActiveOfferId);
  const offerClasses = useMemo(() => Classes[classType], [classType]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const {location} = useMemo(() => offers[0].city, [offers]);
  const map = useMap({location: location, containerRef: mapContainerRef});

  const offerLocations = useMemo(() => offers.map((offer) => ({
    id: offer.id,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
    isActive: offer.id === activeOfferId
  })), [offers, activeOfferId]);

  useEffect(() => {
    if (map) {
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [map, location.latitude, location.longitude, location.zoom]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offerLocations.forEach(({lat, lng, isActive}) => {
        leaflet
          .marker({lat, lng}, {
            icon: isActive ? ActiveMarkerIcon : DefaultMarkerIcon
          })
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offerLocations]);

  return <section className={`${offerClasses.map} map`} ref={mapContainerRef}/>;
}

const LocationMap = memo(LocationMapComponent);
export default LocationMap;
