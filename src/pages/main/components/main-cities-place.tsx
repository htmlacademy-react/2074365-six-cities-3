import {JSX, useState} from 'react';
import Card from '@/components/card.tsx';
import {offersMock} from '@/mock/offers-mock.tsx';
import {Nullable} from 'vitest';


function MainCitiesPlace(): JSX.Element {

  const [, setActiveOffer] = useState<Nullable<string>>(null);

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
