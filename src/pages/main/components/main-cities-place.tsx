import {JSX} from 'react';
import Card from '@/components/card.tsx';
import {offersMock} from '@/mock/offers-mock.tsx';
import {Nullable} from 'vitest';

type MainCitiesPlaceProps = {
  onCardActionId: (id: Nullable<string>) => void;
}

function MainCitiesPlace({onCardActionId}: MainCitiesPlaceProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersMock.map((value) => (
        <Card
          offer={value}
          classType='city'
          sizeImage={{width: 260, height: 200}}
          onCardHover={onCardActionId}
          key={value.id}
        />
      ))}
    </div>
  );
}

export default MainCitiesPlace;
