import {JSX} from 'react';
import Card from '@/components/card.tsx';
import {offersMock} from '@/mock/offers-mock.tsx';
import {Nullable} from 'vitest';

type OfferNearPlacesProps = {
  setActiveOffer: (id: Nullable<string>) => void;
}

function OfferNearPlaces({setActiveOffer}: OfferNearPlacesProps): JSX.Element {
  const handleHover = (id?: string) => {
    setActiveOffer(id || null);
  };

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offersMock.slice(0, 3).map((value) => (
          <Card
            offer={value}
            classType='offer'
            sizeImage={{width: 260, height: 200}}
            onCardHover={handleHover}
            key={value.id}
          />
        ))}
      </div>
    </section>
  );
}

export default OfferNearPlaces;
