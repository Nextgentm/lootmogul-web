import React from 'react';
import GridLoader from 'react-spinners/GridLoader';
import Image from 'next/image';
import styles from './Loader.module.css';

const Loader = ({ style, size, color = '#DDBF79', fullPage }) => {
  if (fullPage) {
    return (
      <div className={styles.fullPageLoader}>
        <div className={styles.overlay}></div>
        <div className={styles.loaderContainer}>
          <Image src="/assets/loader/loader.gif" width={size || 250} height={size || 250} alt="Loader..." />
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', ...style }}>
      <GridLoader size={size || 15} color={color} loading={true} />
    </div>
  );
};

export default Loader;
