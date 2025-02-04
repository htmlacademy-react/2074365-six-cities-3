import {JSX} from 'react';
import FavoritesLocations from './favorites-locations.tsx';
import Card from '@/components/card.tsx';
import {OfferListItem} from '@/types/offer.tsx';

type FavoritesItemsProps = {
  city: string;
  offers: OfferListItem[];
}

function FavoritesItems({city, offers}: FavoritesItemsProps): JSX.Element {

  return (
    <li className="favorites__locations-items">
      <FavoritesLocations city={city}/>
      <div className="favorites__places">
        {offers.filter((value) => value?.city?.name === city)
          .map((value) => (
            <Card
              offer={value}
              classType="favorite"
              sizeImage={{width: 150, height: 110}}
              key={value.id}
            />
          ))}
      </div>
    </li>
  );
}

export default FavoritesItems;
