import {JSX, memo} from 'react';
import OfferImage from './offer-image-component.tsx';


function OfferGalleryComponent({images}: { images: string[] }): JSX.Element {

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

const OfferGallery = memo(OfferGalleryComponent);
export default OfferGallery;
