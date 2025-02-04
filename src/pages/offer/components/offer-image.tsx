import {JSX} from 'react';


function OfferImage({srcPath}: { srcPath: string }): JSX.Element {

  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={srcPath} alt="Photo studio"/>
    </div>
  );
}

export default OfferImage;
