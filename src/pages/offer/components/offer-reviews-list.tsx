import {JSX} from 'react';
import OfferReviewsItem from './offer-reviews-item.tsx';
import {commentsMock} from '@/mock/comments-mock.tsx';


function OfferReviewsList(): JSX.Element {

  return (
    <ul className="reviews__list">
      {commentsMock.map((item) => (
        <OfferReviewsItem
          review={item}
          key={item.id}
        />
      ))}
    </ul>
  );
}

export default OfferReviewsList;
