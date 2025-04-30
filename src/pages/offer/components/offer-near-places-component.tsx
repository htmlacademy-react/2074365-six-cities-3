import {JSX, memo} from 'react';
import Card from 'components/card-component.tsx';
import {Offers} from '@/types/offer.tsx';

const MIN_OFFERS_TO_SHOW = 0;
const MAX_OFFERS_TO_SHOW = 3;

function OfferNearPlacesComponent({offers}: { offers: Offers }): JSX.Element {

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

const OfferNearPlaces = memo(OfferNearPlacesComponent);
export default OfferNearPlaces;
