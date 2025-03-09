import {JSX, useEffect, useRef} from 'react';
import {ActiveMarkerIcon, Classes, DefaultMarkerIcon, EmptyLocation} from '../constants/constants.tsx';
import {OfferListItem} from '@/types/offer.tsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '@/hooks/use-map.tsx';


type LocationMapProps = {
  classType: 'city' | 'offer';
  offers: OfferListItem[];
  activeOfferId?: string | null;
}

function LocationMap({classType, offers, activeOfferId}: LocationMapProps): JSX.Element {
  const offerClasses = Classes[classType];

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const city = offers.find(({id}) =>
    id === activeOfferId)?.city || offers[0].city || {city: EmptyLocation};

  const map = useMap({location: city.location, containerRef: mapContainerRef});

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: offer.id === activeOfferId ? ActiveMarkerIcon : DefaultMarkerIcon
          })
          .addTo(map);
      });
    }
  }, [activeOfferId, map, offers]);

  return <section className={`${offerClasses.map} map`} ref={mapContainerRef}/>;
}

export default LocationMap;
