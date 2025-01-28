import {JSX} from 'react';
import OfferReviewsForm from './offer-reviews-form.tsx';
import OfferReviewsList from './offer-reviews-list.tsx';

function OfferReviews(): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
      <OfferReviewsList/>
      <OfferReviewsForm/>
    </section>
  );
}

export default OfferReviews;
