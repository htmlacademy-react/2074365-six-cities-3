import {JSX, memo} from 'react';
import clsx from 'clsx';
import {AppRoute, AuthorizationStatus, BookmarkButtonClasses} from '@/constants/constants.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {useNavigate} from 'react-router-dom';
import {getAuthorizationStatus} from '@/store/user-process/user-process.selectors.ts';
import {fetchFavoritesStatusAction} from '@/store/api-actions.ts';
import {getFavorites} from '@/store/main-data/main-data.selectors.ts';


type BookmarkButtonProps = {
  width: string;
  height: string;
  classType: 'card' | 'offer';
  offerId: string;
}

function BookmarkButtonComponent({
  width,
  height,
  classType,
  offerId,
}: BookmarkButtonProps): JSX.Element {

  const favorites = useAppSelector(getFavorites);
  const isFavorite = favorites.map(({id}) => id).includes(offerId);

  const buttonText = isFavorite ? 'In bookmarks' : 'To bookmarks';
  const buttonClasses = BookmarkButtonClasses[classType];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    dispatch(fetchFavoritesStatusAction({offerId: offerId, isFavorite: !isFavorite}));
  };

  const isActive = isFavorite && AuthorizationStatus.Auth === authorizationStatus;

  return (
    <button
      className={
        clsx(`${buttonClasses.button}`,
          'button',
          isActive && `${buttonClasses.buttonActive}`)
      }
      type="button"
      onClick={handleClick}
    >
      <svg className={buttonClasses.buttonFavorite} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{buttonText}</span>
    </button>
  );
}

const BookmarkButton = memo(BookmarkButtonComponent);
export default BookmarkButton;
