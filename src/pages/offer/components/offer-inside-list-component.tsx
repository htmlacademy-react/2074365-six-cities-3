import {JSX, memo} from 'react';
import OfferInsideItem from './offer-inside-item-component.tsx';


function OfferInsideListComponent({goods}: { goods: string[] }): JSX.Element {

  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {goods?.map((item) =>
          <OfferInsideItem item={item} key={item}/>
        )}
      </ul>
    </div>
  );
}

const OfferInsideList = memo(OfferInsideListComponent);
export default OfferInsideList;
