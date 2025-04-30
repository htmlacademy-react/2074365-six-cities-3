import {JSX, memo} from 'react';


function OfferImageComponent({srcPath}: { srcPath: string }): JSX.Element {

  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={srcPath} alt="Photo studio"/>
    </div>
  );
}

const OfferImage = memo(OfferImageComponent);
export default OfferImage;
