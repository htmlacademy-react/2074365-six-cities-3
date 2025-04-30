import leaflet from 'leaflet';

export const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const TIMEOUT_SHOW_ERROR = 5000;

export const ApiEndpoints = {
  OFFERS: '/offers',
  OFFER: '/offers/:offerId',
  NEARBY: '/offers/:offerId/nearby',
  FAVORITE: '/favorite',
  FAVORITE_STATUS: '/favorite/:offerId/:status',
  COMMENTS: '/comments/:offerId',
  LOGIN: '/login',
  LOGOUT: '/logout',
};

export const SortType = {
  Popular: 'Popular',
  PriceAscending: 'Price: low to high',
  PriceDescending: 'Price: high to low',
  Rating: 'Top rated first'
} as const;

export const Classes = {
  city: {
    wrapper: 'cities__card',
    imageWrapper: 'cities__image-wrapper',
    map: 'cities__map',
    mark: 'place-card__mark'
  },
  favorite: {
    wrapper: 'favorites__card',
    imageWrapper: 'favorites__image-wrapper'
  },
  offer: {
    wrapper: 'near-places__card',
    imageWrapper: 'near-places__image-wrapper',
    map: 'offer__map',
    mark: 'offer__mark'
  }
} as const;

export const BookmarkButtonClasses = {
  card: {
    button: 'place-card__bookmark-button',
    buttonActive: 'place-card__bookmark-button--active',
    buttonFavorite: 'place-card__bookmark-icon'
  },
  offer: {
    button: 'offer__bookmark-button',
    buttonActive: 'offer__bookmark-button--active',
    buttonFavorite: 'offer__bookmark-icon'
  }
} as const;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const Rating = [
  {rating: 5, title: 'perfect'},
  {rating: 4, title: 'good'},
  {rating: 3, title: 'not bad'},
  {rating: 2, title: 'badly'},
  {rating: 1, title: 'terribly'}
] as const;

export const UrlMarker = {
  URL_MARKER_DEFAULT: '/img/pin.svg',
  URL_MARKER_ACTIVE: '/img/pin-active.svg'
} as const;

export const DefaultMarkerIcon = leaflet.icon({
  iconUrl: UrlMarker.URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [14, 40],
});

export const ActiveMarkerIcon = leaflet.icon({
  iconUrl: UrlMarker.URL_MARKER_ACTIVE,
  iconSize: [27, 39],
  iconAnchor: [14, 40],
});

export const TitleLayer = {
  TILE_LAYER_URL_PATTERN: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  TILE_LAYER_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">' +
    'OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
} as const;

export const CITIES = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  },
];

export enum NameSpace {
  App = 'APP',
  Main = 'MAIN',
  Offer = 'OFFER',
  User = 'USER',
  Comments = 'COMMENTS',
  Map = 'MAP',
}
