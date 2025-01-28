import {JSX} from 'react';


function OfferInsideItem({item}: { item: string }): JSX.Element {
  return (
    <li className="offer__inside-item">{item}</li>
  );
}

export default OfferInsideItem;
