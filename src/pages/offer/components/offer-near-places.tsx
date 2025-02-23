import {JSX, useState} from 'react';
import Card from '@/components/card.tsx';
import {offersMock} from '@/mock/offers-mock.tsx';
import {Nullable} from 'vitest';
import {OfferListItem} from '@/types/offer.tsx';


function OfferNearPlaces(): JSX.Element {

  const [, setActiveOffer] = useState<Nullable<OfferListItem>>(null);

  const offerStateHandler = (offer?: OfferListItem) => {
    setActiveOffer(offer || null);
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
            offerStateHandler={offerStateHandler}
            key={value.id}
          />
        ))}
      </div>
    </section>
  );
}

export default OfferNearPlaces;
