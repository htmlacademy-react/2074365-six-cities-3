import {ChangeEvent, Fragment, JSX, useState} from 'react';
import {Rating} from '@/constants/constants.ts';


const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;
const DEFAULT_RATING = 0;

function OfferReviewsForm(): JSX.Element {

  const [review, setReview] = useState({
    rating: 0,
    review: '',
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setReview({
      ...review,
      [name]: value
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Rating.map(({value, label}) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={handleChange}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            review.review.length < MIN_REVIEW_LENGTH ||
            review.review.length > MAX_REVIEW_LENGTH ||
            review.rating === DEFAULT_RATING
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default OfferReviewsForm;
