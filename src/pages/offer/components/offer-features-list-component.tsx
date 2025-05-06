import {JSX, memo} from 'react';
import {pluralize} from '@/utils/string-helper.ts';
import {capitalizeFirstLetter} from '@/utils/sort-helper.ts';

type OfferFeaturesProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
};

function OfferFeaturesListComponent({type, bedrooms, maxAdults}: OfferFeaturesProps): JSX.Element {
  const bedroomsCount = pluralize(bedrooms, 'Bedroom');
  const adultsCount = `Max ${pluralize(maxAdults, 'adult')}`;

  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">
        {capitalizeFirstLetter(type)}
      </li>
      <li className="offer__feature offer__feature--bedrooms">
        {bedroomsCount}
      </li>
      <li className="offer__feature offer__feature--adults">
        {adultsCount}
      </li>
    </ul>
  );
}

const OfferFeaturesList = memo(OfferFeaturesListComponent);

export default OfferFeaturesList;
