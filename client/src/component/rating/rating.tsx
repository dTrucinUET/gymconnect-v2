import React from 'react';
import { styleText } from 'util';
import styles from './rate.module.css';

interface RateProps {
  rating: number;
}

const Rating: React.FC<{ rate: RateProps }> = ({ rate }) => {
  return (
    <div
      className={styles.stars}
      style={{ '--rating': rate.rating } as React.CSSProperties}
      aria-label={`Rating of this product is ${rate.rating} out of 5.`}
    >

    </div>
  );
};

export default Rating;
