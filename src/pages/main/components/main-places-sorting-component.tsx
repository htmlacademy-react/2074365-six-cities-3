import {JSX, memo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {SortType} from '@/constants/constants.ts';
import {useOnClickOutside} from 'usehooks-ts';
import clsx from 'clsx';
import {getSorting} from '@/store/main-data/main-data.selectors.ts';
import {setSorting} from '@/store/main-data/main-data.slice.ts';

function MainPlacesSortingComponent(): JSX.Element {

  const sortingType = useAppSelector(getSorting);
  const dispatch = useAppDispatch();
  const [isOpened, setOpening] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  useOnClickOutside(dropdownRef, () => setOpening(false));

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by{' '}</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setOpening(true)}>
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        ref={dropdownRef}
        className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`}
      >
        {Object.entries(SortType).map(
          ([key, option]) =>
            (
              <li
                className={clsx('places__option', sortingType === option && 'places__option--active')}
                tabIndex={0}
                key={key}
                onClick={() => {
                  setOpening(false);
                  if (sortingType !== option) {
                    dispatch(setSorting(option));
                  }
                }}
              >
                {option}
              </li>
            )
        )}
      </ul>
    </form>
  );
}

const MainPlacesSorting = memo(MainPlacesSortingComponent);
export default MainPlacesSorting;
