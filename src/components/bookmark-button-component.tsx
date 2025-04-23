import {JSX, memo} from 'react';
import clsx from 'clsx';
import {BookmarkButtonClasses} from '@/constants/constants.ts';


type BookmarkButtonProps = {
  width: string;
  height: string;
  isFavorite: boolean;
  classType: 'card' | 'offer';
  handleClick: () => void;
}

function BookmarkButtonComponent({
  width,
  height,
  isFavorite,
  classType,
  handleClick
}: BookmarkButtonProps): JSX.Element {
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
