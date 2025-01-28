import {JSX} from 'react';
import OfferImage from './offer-image.tsx';


function OfferGallery({images}: { images: string[] }): JSX.Element {

  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((item) => (
          <OfferImage srcPath={item} key={item}/>
        ))}
      </div>
    </div>
  );
}

export default OfferGallery;
