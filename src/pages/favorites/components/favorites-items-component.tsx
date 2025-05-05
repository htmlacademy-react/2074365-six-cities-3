import {JSX, memo} from 'react';
import FavoritesLocations from './favorites-locations-component.tsx';
import Card from 'components/card-component.tsx';
import {Offer} from '@/types/offer.ts';

type FavoritesItemsProps = {
  city: string;
  offers: Offer[];
}

function FavoritesItemsComponent({city, offers}: FavoritesItemsProps): JSX.Element {

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

const FavoritesItems = memo(FavoritesItemsComponent);
export default FavoritesItems;
