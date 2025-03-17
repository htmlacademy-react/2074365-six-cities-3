import {JSX} from 'react';
import Card from '@/components/card.tsx';
import {OfferListItem} from '@/types/offer.tsx';


function OfferNearPlaces({offers}: { offers: OfferListItem[] }): JSX.Element {

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.slice(0, 3).map((value) => (
          <Card
            offer={value}
            classType='offer'
            sizeImage={{width: 260, height: 200}}
            key={value.id}
          />
        ))}
      </div>
    </section>
  );
}

export default OfferNearPlaces;
