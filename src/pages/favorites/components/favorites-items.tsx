import {JSX, useState} from 'react';
import FavoritesLocations from './favorites-locations.tsx';
import Card from '@/components/card.tsx';
import {OfferListItem} from '@/types/offer.tsx';
import {Nullable} from 'vitest';

type FavoritesItemsProps = {
  city: string;
  offers: OfferListItem[];
}

function FavoritesItems({city, offers}: FavoritesItemsProps): JSX.Element {

  const [, setActiveOffer] = useState<Nullable<OfferListItem>>(null);

  const offerStateHandler = (offer?: OfferListItem) => {
    setActiveOffer(offer || null);
  };

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
              offerStateHandler={offerStateHandler}
              key={value.id}
            />
          ))}
      </div>
    </li>
  );
}

export default FavoritesItems;
