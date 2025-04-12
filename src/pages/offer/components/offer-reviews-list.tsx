import {JSX} from 'react';
import OfferReviewsItem from './offer-reviews-item.tsx';
import {Comments} from '@/types/offer.tsx';


function OfferReviewsList({comments}: { comments: Comments }): JSX.Element {

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

export default OfferReviewsList;
