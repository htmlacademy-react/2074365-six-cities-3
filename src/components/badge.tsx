import {JSX} from 'react';
import {Classes} from '../constants/constants.tsx';

type BadgeProps = {
  text: string;
  classType: 'city' | 'offer';
}

function Badge({text, classType}: BadgeProps): JSX.Element {
  const badgeClass = Classes[classType];

  return (
    <div className={badgeClass.mark}>
      <span>{text}</span>
    </div>
  );
}

export default Badge;
