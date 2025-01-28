import {JSX} from 'react';
import {OfferListItem} from '../types/offer.tsx';
import {Classes} from '../constants/constants.tsx';
import clsx from 'clsx';
import Badge from './badge.tsx';

type CitiesCardProp = {
  offer: OfferListItem;
  classType: 'city' | 'favorite' | 'offer';
  sizeImage: { width: number; height: number };
}

function Card({offer, classType, sizeImage}: CitiesCardProp): JSX.Element {
  const cardClasses = Classes[classType];

  const {
    title,
    type,
    price,
    previewImage,
    isFavorite,
    isPremium,
    rating
  } = offer;

  const ratingInPercent = (rating / 5) * 100;

  return (
    <article className={`${cardClasses.wrapper} place-card`}>
      {isPremium && <Badge text={'Premium'} classType={'city'}/>}
      <div className={`${cardClasses.imageWrapper} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width={sizeImage.width} height={sizeImage.height} alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{`${price}`}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={clsx('place-card__bookmark-button', 'button', isFavorite && 'place-card__bookmark-button--active')} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingInPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
