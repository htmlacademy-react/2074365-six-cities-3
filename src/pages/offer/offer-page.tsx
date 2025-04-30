import {JSX, memo, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PageNotFound from '../error/page-not-found.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {Helmet} from 'react-helmet-async';
import {fetchCommentsAction, fetchNearbyOffersAction, fetchOfferAction} from '@/store/api-actions.ts';
import SpinnerComponent from 'components/spinner/spinner-component.tsx';
import OfferGallery from '@/pages/offer/components/offer-gallery-component.tsx';
import OfferUserStatusComponent from '@/pages/offer/components/offer-user-status-component.tsx';
import OfferFeaturesListComponent from '@/pages/offer/components/offer-features-list-component.tsx';
import OfferInsideList from '@/pages/offer/components/offer-inside-list-component.tsx';
import OfferDescriptionComponent from '@/pages/offer/components/offer-description-component.tsx';
import clsx from 'clsx';
import BookmarkButton from 'components/bookmark-button-component.tsx';
import BadgeOfferMark from 'components/badge-offer-mark-component.tsx';
import LocationMap from 'components/location-map-component.tsx';
import OfferNearPlaces from '@/pages/offer/components/offer-near-places-component.tsx';
import OfferReviewsList from '@/pages/offer/components/offer-reviews-list-component.tsx';
import {AuthorizationStatus} from '@/constants/constants.ts';
import OfferReviewsFormComponent from '@/pages/offer/components/offer-reviews-form-component.tsx';
import {calculateRatingInPercent} from '@/utils/calculation-helper.ts';
import {getAuthorizationStatus} from '@/store/user-process/user-process.selectors.ts';
import {
  getNearest,
  getNearestLoadingStatus,
  getOffer,
  getOfferLoadingStatus
} from '@/store/offer-data/offer-data.selectors.ts';
import {
  getComments,
  getCommentsLoadingStatus,
  getCountComments
} from '@/store/comments-data/comments-data.selectors.ts';


const DEFAULT_START_INDEX = 0;
const NEAREST_OFFERS_COUNT = 3;

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoading = useAppSelector(getOfferLoadingStatus);
  const isCommentsLoading = useAppSelector(getCommentsLoadingStatus);
  const isNearestLoading = useAppSelector(getNearestLoadingStatus);
  const countComments = useAppSelector(getCountComments);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const {id} = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchCommentsAction(id));
    }
    setIsInitialLoad(false);
  }, [dispatch, id]);

  const currentOffer = useAppSelector(getOffer);
  const nearestOffers = useAppSelector(getNearest);
  const nearestFirstThreeOffers = nearestOffers.slice(DEFAULT_START_INDEX, NEAREST_OFFERS_COUNT);
  const comments = useAppSelector(getComments);

  if (isInitialLoad || isDataLoading || isNearestLoading) {
    return <SpinnerComponent/>;
  }

  if (!currentOffer) {
    return <PageNotFound/>;
  }

  const dataMap = [currentOffer, ...nearestFirstThreeOffers];

  const {
    images,
    rating,
    goods,
    price,
    title,
    isPremium,
  } = currentOffer;

  const {
    isPro,
    name,
    avatarUrl
  } = currentOffer.host;

  const ratingInPercent = calculateRatingInPercent(rating);

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className="offer">
        <OfferGallery images={images}/>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium && <BadgeOfferMark text='Premium' classType='offer'/>}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{title}</h1>
              <BookmarkButton
                width="31"
                height="33"
                classType={'offer'}
                offerId={currentOffer.id}
              />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: `${ratingInPercent}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <OfferFeaturesListComponent/>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <OfferInsideList goods={goods}/>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div
                  className={clsx('offer__avatar-wrapper', `${isPro && 'offer__avatar-wrapper--pro'}`, 'user__avatar-wrapper')}
                >
                  <img
                    className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{name}</span>
                {isPro && <OfferUserStatusComponent text="Pro"/>}
              </div>
              <OfferDescriptionComponent/>
            </div>
            {isCommentsLoading
              ? <SpinnerComponent/>
              : (
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot;
                    <span className="reviews__amount">{countComments}</span>
                  </h2>
                  <OfferReviewsList comments={comments}/>
                  {AuthorizationStatus.Auth === authorizationStatus && <OfferReviewsFormComponent/>}
                </section>
              )}
          </div>
        </div>
        <LocationMap
          classType="offer"
          offers={dataMap}
          activeOfferId={currentOffer.id}
        />
      </section>
      <div className="container">
        <OfferNearPlaces offers={nearestFirstThreeOffers}/>
      </div>
    </main>
  );
}

const Offer = memo(OfferPage);
export default Offer;
