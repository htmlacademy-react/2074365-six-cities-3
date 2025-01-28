import {JSX} from 'react';
import Header from '../../components/header.tsx';
import HeaderNav from '../../components/header-nav.tsx';
import OfferGallery from './components/offer-gallery.tsx';
import OfferInsideList from './components/offer-inside-list.tsx';
import OfferReviews from './components/offer-reviews.tsx';
import OfferFeaturesList from './components/offer-features-list.tsx';
import OfferDescription from './components/offer-description.tsx';
import OfferNearPlaces from './components/offer-near-places.tsx';
import {OfferDetail} from '../../types/offer.tsx';
import LocationMap from '../../components/location-map.tsx';
import Badge from '../../components/badge.tsx';


function Offer({offer}: { offer: OfferDetail }): JSX.Element {
  const Pro = 'Pro';
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
    <div className="page">
      <Header>
        <HeaderNav/>
      </Header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={images}/>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && <Badge text={'Premium'} classType={'offer'}/>}
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
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">{name}</span>
                  <span className="offer__user-status">{isPro && Pro}</span>
                </div>
                <OfferDescription/>
              </div>
              <OfferReviews/>
            </div>
          </div>
          <LocationMap classType={'offer'}/>
        </section>
        <div className="container">
          <OfferNearPlaces/>
        </div>
      </main>
    </div>
  );
}

export default Offer;
