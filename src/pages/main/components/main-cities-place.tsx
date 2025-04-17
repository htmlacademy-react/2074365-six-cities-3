import {JSX} from 'react';
import Card from '@/components/card.tsx';
import {Nullable} from 'vitest';
import {Offer} from '@/types/offer.tsx';

type MainCitiesPlaceProps = {
  offers: Offer[];
  onOfferActionId: (id: Nullable<string>) => void;
}

function MainCitiesPlace({offers, onOfferActionId}: MainCitiesPlaceProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((value) => (
        <Card
          offer={value}
          classType='city'
          sizeImage={{width: 260, height: 200}}
          onCardHover={onOfferActionId}
          key={value.id}
        />
      ))}
    </div>
  );
}

export default MainCitiesPlace;
