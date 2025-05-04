import {JSX, memo} from 'react';
import Card from 'components/card-component.tsx';
import {Nullable} from 'vitest';
import {Offer} from '@/types/offer.ts';

type MainCitiesPlaceProps = {
  offers: Offer[];
  onOfferActionId: (id: Nullable<string>) => void;
}

function MainCitiesPlaceComponent({offers, onOfferActionId}: MainCitiesPlaceProps): JSX.Element {
  const sizes = {width: 260, height: 200};

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((value) => (
        <Card
          offer={value}
          classType='city'
          sizeImage={sizes}
          onCardHover={onOfferActionId}
          key={value.id}
        />
      ))}
    </div>
  );
}

const MainCitiesPlace = memo(MainCitiesPlaceComponent);
export default MainCitiesPlace;
