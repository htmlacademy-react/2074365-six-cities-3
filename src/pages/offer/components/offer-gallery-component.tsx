import {JSX, memo} from 'react';

type OfferGalleryProps = {
  images: string[];
};

const enum OfferGalleryDefault {
  MaxCount = 6,
}

function OfferGalleryComponent({images}: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery">
      {images.slice(0, OfferGalleryDefault.MaxCount).map((image) => (
        <div className="offer__image-wrapper" key={image}>
          <img className="offer__image" src={image} alt="Photo studio"/>
        </div>
      ))}
    </div>
  );
}

const OfferGallery = memo(OfferGalleryComponent);
export default OfferGallery;
