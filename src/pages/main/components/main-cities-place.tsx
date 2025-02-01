import {JSX} from 'react';
import Card from '@/components/card.tsx';
import {offersMock} from '@/mock/offers-mock.tsx';


function MainCitiesPlace(): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersMock.map((value) => (
        <Card
          offer={value}
          classType='city'
          sizeImage={{width: 260, height: 200}}
          key={value.id}
        />
      ))}
    </div>
  );
}

export default MainCitiesPlace;
