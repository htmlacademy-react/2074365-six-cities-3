import {JSX} from 'react';
import clsx from 'clsx';
import {BookmarkButtonClasses} from '@/constants/constants.ts';

type BookmarkButtonProps = {
  width: string;
  height: string;
  isFavorite: boolean;
  classType: 'card' | 'offer';
}

function BookmarkButton({width, height, isFavorite, classType}: BookmarkButtonProps): JSX.Element {
  const buttonText = isFavorite ? 'In bookmarks' : 'To bookmarks';
  const buttonClasses = BookmarkButtonClasses[classType];

  return (
    <button
      className={
        clsx(`${buttonClasses.button}`,
          'button',
          isFavorite && `${buttonClasses.buttonActive}`)
      }
      type="button"
    >
      <svg className="place-card__bookmark-icon" width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{buttonText}</span>
    </button>
  );
}

export default BookmarkButton;
