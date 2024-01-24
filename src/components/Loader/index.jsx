import React, { useMemo } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import Image from 'next/image';
import styles from './Loader.module.css';
import Head from 'next/head';

const Loader = ({ style, size, color = '#DDBF79', fullPage }) => {
  const memoizedImage = useMemo(() => (
    <img src="/assets/loader/loader.200.120kb.gif" width={200} height={200} alt="Loader..." />
  ), []);

  if (fullPage) {
    return (
      <>
        <div className={styles.fullPageLoader}>
          <div className={styles.overlay}></div>
          <div className={styles.loaderContainer}>
            {memoizedImage}
          </div>
        </div>
      </>
    );
  }

  return (
    <div style={{ textAlign: 'center', ...style }}>
      <GridLoader size={size || 15} color={color} loading={true} />
    </div>
  );
};

export default Loader;
