import {JSX, memo} from 'react';
import OfferReviewsItem from './offer-reviews-item-component.tsx';
import {Comments} from '@/types/offer.tsx';


function OfferReviewsListComponent({comments}: { comments: Comments }): JSX.Element {

  return (
    <ul className="reviews__list">
      {comments.map((item) => (
        <OfferReviewsItem
          review={item}
          key={item.id}
        />
      ))}
    </ul>
  );
}

const OfferReviewsList = memo(OfferReviewsListComponent);
export default OfferReviewsList;
