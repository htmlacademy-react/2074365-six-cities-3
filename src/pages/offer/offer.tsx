import {JSX} from 'react';
import OfferGallery from './components/offer-gallery.tsx';
import OfferInsideList from './components/offer-inside-list.tsx';
import OfferReviews from './components/offer-reviews.tsx';
import OfferFeaturesList from './components/offer-features-list.tsx';
import OfferDescription from './components/offer-description.tsx';
import OfferNearPlaces from './components/offer-near-places.tsx';
import LocationMap from '@/components/location-map.tsx';
import BadgeOfferMark from 'components/badge-offer-mark.tsx';
import {useParams} from 'react-router-dom';
import {offerDetailMock} from '@/mock/offer-detail-mock.tsx';
import {OfferDetail} from '@/types/offer.tsx';
import PageNotFound from '../error/page-not-found.tsx';
import clsx from 'clsx';
import OfferUserStatus from '@/pages/offer/components/offer-user-status.tsx';


function Offer({authorizationStatus}: { authorizationStatus: string }): JSX.Element {
  const urlParams = useParams();
  const offer = offerDetailMock.find((item) => item?.id === urlParams?.id) as OfferDetail;

  if (!offer) {
    return <PageNotFound/>;
  }

  const {
    images,
    rating,
    goods,
    price,
    title,
    isPremium,
  } = offer;

  const {
    isPro,
    name,
    avatarUrl
  } = offer.host;

  const ratingInPercent = (rating / 5) * 100;

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGallery images={images}/>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium && <BadgeOfferMark text='Premium' classType='offer'/>}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{title}</h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
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
                <div className={clsx('offer__avatar-wrapper', `${isPro && 'offer__avatar-wrapper--pro'}`, 'user__avatar-wrapper')}>
                  <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="offer__user-name">{name}</span>
                {isPro && <OfferUserStatus text="Pro"/>}
              </div>
              <OfferDescription/>
            </div>
            <OfferReviews authorizationStatus={authorizationStatus}/>
          </div>
        </div>
        <LocationMap classType="offer"/>
      </section>
      <div className="container">
        <OfferNearPlaces/>
      </div>
    </main>
  );
}

export default Offer;
