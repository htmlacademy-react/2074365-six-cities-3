import {offersMock} from '@/mock/offers-mock.tsx';
import {OfferListItem} from '@/types/offer.tsx';

const MAX_OFFERS_LIMIT = 3;

export const getNearestOffer = (offer: OfferListItem): OfferListItem[] => {
  const nearestOffers: OfferListItem[] = [];

  for (let i = 0; i < offersMock.length; i++) {
    if (offersMock[i].id !== offer.id && offersMock[i].city.name === offer.city.name) {
      nearestOffers.push(offersMock[i]);
    }

    if (nearestOffers.length >= MAX_OFFERS_LIMIT) {
      break;
    }
  }

  return nearestOffers;
};
