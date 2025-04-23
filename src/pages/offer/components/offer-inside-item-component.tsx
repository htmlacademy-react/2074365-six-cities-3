import {JSX, memo} from 'react';


function OfferInsideItemComponent({item}: { item: string }): JSX.Element {

  return (
    <li className="offer__inside-item">{item}</li>
  );
}

const OfferInsideItem = memo(OfferInsideItemComponent);
export default OfferInsideItem;
