import {JSX, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PageNotFound from '../error/page-not-found.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {Helmet} from 'react-helmet-async';
import {fetchCommentsAction, fetchNearbyOffersAction, fetchOfferAction} from '@/store/api-actions.ts';
import Spinner from 'components/spinner/spinner.tsx';
import OfferGallery from '@/pages/offer/components/offer-gallery.tsx';
import OfferUserStatus from '@/pages/offer/components/offer-user-status.tsx';
import OfferFeaturesList from '@/pages/offer/components/offer-features-list.tsx';
import OfferInsideList from '@/pages/offer/components/offer-inside-list.tsx';
import OfferDescription from '@/pages/offer/components/offer-description.tsx';
import clsx from 'clsx';
import BookmarkButton from 'components/bookmark-button.tsx';
import BadgeOfferMark from 'components/badge-offer-mark.tsx';
import LocationMap from 'components/location-map.tsx';
import OfferNearPlaces from '@/pages/offer/components/offer-near-places.tsx';
import OfferReviewsList from '@/pages/offer/components/offer-reviews-list.tsx';
import {AuthorizationStatus} from '@/constants/constants.ts';
import OfferReviewsForm from '@/pages/offer/components/offer-reviews-form.tsx';
import {calculateRatingInPercent} from '@/utils/calculation-helper.ts';


const DEFAULT_START_INDEX = 0;
const NEAREST_OFFERS_COUNT = 3;
const MAX_COMMENTS_COUNT = 10;

function Offer(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isDataLoading = useAppSelector((state) => state.isDataLoading);
  const isCommentsLoading = useAppSelector((state) => state.isCommentsLoading);
  const isNearestLoading = useAppSelector((state) => state.isNearestLoading);
  const countComments = useAppSelector((state) => state.countComments);
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

  const currentOffer = useAppSelector((state) => state.currentOffer);
  const nearestOffers = useAppSelector((state) => state.nearestOffers);
  const nearestFirstThreeOffers = nearestOffers.slice(DEFAULT_START_INDEX, NEAREST_OFFERS_COUNT);

  const comments = useAppSelector((state) => state.comments.slice(DEFAULT_START_INDEX, MAX_COMMENTS_COUNT));

  if (isInitialLoad || isDataLoading || isNearestLoading) {
    return <Spinner/>;
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
    isFavorite
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
                isFavorite={isFavorite}
                classType={'offer'}
              />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: `${ratingInPercent}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <OfferFeaturesList/>
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
                {isPro && <OfferUserStatus text="Pro"/>}
              </div>
              <OfferDescription/>
            </div>
            {isCommentsLoading
              ? <Spinner/>
              : (
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot;
                    <span className="reviews__amount">{countComments}</span>
                  </h2>
                  <OfferReviewsList comments={comments}/>
                  {AuthorizationStatus.Auth === authorizationStatus && <OfferReviewsForm/>}
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

export default Offer;
