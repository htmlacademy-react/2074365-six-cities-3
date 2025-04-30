import {ChangeEvent, FormEvent, Fragment, JSX, useCallback, useState} from 'react';
import {Rating} from '@/constants/constants.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {addCommentAction} from '@/store/api-actions.ts';
import {toast} from 'react-toastify';
import {useParams} from 'react-router-dom';
import {getErrorMessage, getReviewLoadingStatus} from '@/store/comments-data/comments-data.selectors.ts';


const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;
const DEFAULT_RATING = 0;
const RATING_FIELD_NAME = 'rating';
const COMMENT_FIELD_NAME = 'comment';
const EMPTY = '';

function OfferReviewsFormComponent(): JSX.Element {
  const {id} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const isReviewLoading = useAppSelector(getReviewLoadingStatus);
  const errorMessage = useAppSelector(getErrorMessage);

  const [reviewState, setReviewState] = useState({
    rating: DEFAULT_RATING,
    comment: EMPTY,
  });

  const handleChange = useCallback((evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    if (name === COMMENT_FIELD_NAME && value.length > MAX_REVIEW_LENGTH) {
      return;
    }

    setReviewState((prev) => ({
      ...prev,
      [name]: name === RATING_FIELD_NAME ? Number(value) : value,
    }));
  }, []);

  const handleSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (
      !id ||
      reviewState.rating === DEFAULT_RATING ||
      reviewState.comment.length < MIN_REVIEW_LENGTH
    ) {
      return;
    }

    dispatch(
      addCommentAction({
        offerId: id,
        comment: reviewState.comment,
        rating: reviewState.rating,
      })
    )
      .unwrap()
      .then(() => {
        setReviewState({
          rating: DEFAULT_RATING,
          comment: EMPTY,
        });
        toast.success('Отзыв успешно отправлен!');
      })
      .catch(() => {
        toast.error('Не удалось отправить отзыв');
      });
  }, [dispatch, id, reviewState]);

  return (
    <form
      className="reviews__form form"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {Rating.map(({rating, title}) => (
          <Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={`${rating}`}
              id={`${rating}-stars`}
              type="radio"
              disabled={isReviewLoading}
              checked={reviewState.rating === rating}
              onChange={handleChange}
            />
            <label
              htmlFor={`${rating}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
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
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewState.comment}
        disabled={isReviewLoading}
        onChange={handleChange}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button" type="submit"
          disabled=
            {
              reviewState.comment.length < MIN_REVIEW_LENGTH
              || reviewState.comment.length > MAX_REVIEW_LENGTH
              || reviewState.rating === DEFAULT_RATING
              || isReviewLoading
            }
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default OfferReviewsFormComponent;
