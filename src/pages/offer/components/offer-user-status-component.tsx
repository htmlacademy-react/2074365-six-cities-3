import {JSX} from 'react';

function OfferUserStatusComponent({text}: { text: string }): JSX.Element {
  return (
    <span className="offer__user-status">{text}</span>
  );
}

export default OfferUserStatusComponent;
