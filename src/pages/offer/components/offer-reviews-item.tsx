import {JSX} from 'react';
import {format, parseISO} from 'date-fns';
import {Comment} from '@/types/offer.tsx';


function OfferReviewsItem({review}: { review: Comment }): JSX.Element {
  const {
    rating,
    comment,
    date
  } = review;

  const {
    avatarUrl,
    name
  } = review.user;

  const ratingInPercent = (rating / 5) * 100;
  const parseDate = parseISO(date);
  const formattedDate = format(parseDate, 'MMMM yyyy');

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${ratingInPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime="2019-04-24">{formattedDate}</time>
      </div>
    </li>
  );
}

export default OfferReviewsItem;
