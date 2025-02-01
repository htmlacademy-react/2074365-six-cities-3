import {JSX} from 'react';

function OfferUserStatus({text}: { text: string }): JSX.Element {
  return (
    <span className="offer__user-status">{text}</span>
  );
}

export default OfferUserStatus;
