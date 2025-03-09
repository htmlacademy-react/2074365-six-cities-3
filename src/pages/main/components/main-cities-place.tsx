import {JSX} from 'react';
import Card from '@/components/card.tsx';
import {offersMock} from '@/mock/offers-mock.tsx';
import {Nullable} from 'vitest';

type MainCitiesPlaceProps = {
  setActiveOffer: (id: Nullable<string>) => void;
}

function MainCitiesPlace({setActiveOffer}: MainCitiesPlaceProps): JSX.Element {
  const handleHover = (id?: string) => {
    setActiveOffer(id || null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersMock.map((value) => (
        <Card
          offer={value}
          classType='city'
          sizeImage={{width: 260, height: 200}}
          onCardHover={handleHover}
          key={value.id}
        />
      ))}
    </div>
  );
}

export default MainCitiesPlace;
