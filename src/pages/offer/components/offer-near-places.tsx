import {JSX} from 'react';
import Card from '@/components/card.tsx';
import {OfferListItem} from '@/types/offer.tsx';

const MIN_OFFERS_TO_SHOW = 0;
const MAX_OFFERS_TO_SHOW = 3;

function OfferNearPlaces({offers}: { offers: OfferListItem[] }): JSX.Element {

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.slice(MIN_OFFERS_TO_SHOW, MAX_OFFERS_TO_SHOW).map((value) => (
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
