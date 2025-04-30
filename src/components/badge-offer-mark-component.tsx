import {JSX, memo} from 'react';
import {Classes} from '../constants/constants.ts';

type BadgeProps = {
  text: string;
  classType: 'city' | 'offer';
}

function BadgeOfferMarkComponent({text, classType}: BadgeProps): JSX.Element {
  const badgeClass = Classes[classType];

  return (
    <div className={badgeClass.mark}>
      <span>{text}</span>
    </div>
  );
}

const BadgeOfferMark = memo(BadgeOfferMarkComponent);
export default BadgeOfferMark;
