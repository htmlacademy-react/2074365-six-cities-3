import {JSX} from 'react';
import MainPlacesOptions from './main-places-options.tsx';

function MainPlacesSorting(): JSX.Element {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>&nbsp;Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <MainPlacesOptions/>
    </form>
  );
}

export default MainPlacesSorting;
