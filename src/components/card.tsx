import {JSX} from 'react';
import {OfferListItem} from '../types/offer.tsx';
import {AppRoute, Classes} from '../constants/constants.ts';
import BadgeOfferMark from './badge-offer-mark.tsx';
import {generatePath, Link} from 'react-router-dom';
import {calculateRatingInPercent} from '@/utils/calculation-helper.ts';
import {capitalizeWord} from '@/utils/string-helper.ts';
import BookmarkButton from 'components/bookmark-button.tsx';

type CitiesCardProp = {
  offer: OfferListItem;
  classType: 'city' | 'favorite' | 'offer';
  sizeImage: { width: number; height: number };
  onCardHover?: (id?: string) => void;
}

function Card({offer, classType, sizeImage, onCardHover}: CitiesCardProp): JSX.Element {
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

  const ratingInPercent = calculateRatingInPercent(rating);

  const handleMouseEnter = () => onCardHover?.(offer?.id);
  const handleMouseLeave = () => onCardHover?.();

  return (
    <article
      className={`${cardClasses.wrapper} place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && <BadgeOfferMark text='Premium' classType='city'/>}
      <div className={`${cardClasses.imageWrapper} place-card__image-wrapper`}>
        <Link to={generatePath(AppRoute.Offer, {id: offer.id})}>
          <img
            className="place-card__image"
            src={previewImage}
            width={sizeImage.width}
            height={sizeImage.height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{`${price}`}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            width={'18'}
            height={'19'}
            isFavorite={isFavorite}
            classType={'card'}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingInPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, {id: offer.id})}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalizeWord(type)}</p>
      </div>
    </article>
  );
}

export default Card;
