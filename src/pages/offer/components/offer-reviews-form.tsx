import {ChangeEvent, FormEvent, Fragment, JSX} from 'react';
import {Rating} from '@/constants/constants.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {setReviewComment, setReviewRating} from '@/store/action.ts';
import {addCommentAction} from '@/store/api-actions.ts';


const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;
const DEFAULT_RATING = 0;

function OfferReviewsForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const reviewState = useAppSelector((state) => state.review);
  const isReviewLoading = useAppSelector((state) => state.isReviewLoading);

  const handleSubmit = () => {
    if (!currentOffer || !reviewState.rating || !reviewState.comment) {
      return;
    }
    dispatch(addCommentAction({
      offerId: currentOffer.id,
      comment: reviewState.comment,
      rating: reviewState.rating,
    }));
  };

  return (
    <form className="reviews__form form"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        handleSubmit();
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {Rating.map(({rating, title}) => {
          const id = `${rating}-stars`;
          return (
            <Fragment key={rating}>
              <input className="form__rating-input visually-hidden" name="rating" value={`${rating}`} id={id}
                type="radio"
                disabled={isReviewLoading}
                checked={reviewState.rating === rating}
                onChange={() => {
                  dispatch(setReviewRating(rating));
                }}
              />
              <label htmlFor={id} className="reviews__rating-label form__rating-label" title={title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewState.comment}
        disabled={isReviewLoading}
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => {
          dispatch(setReviewComment(target.value.slice(DEFAULT_RATING, MAX_REVIEW_LENGTH)));
          target.textContent = reviewState.comment;
        }}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit"
          disabled={reviewState.rating === DEFAULT_RATING || reviewState.comment.length < MIN_REVIEW_LENGTH || isReviewLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default OfferReviewsForm;
