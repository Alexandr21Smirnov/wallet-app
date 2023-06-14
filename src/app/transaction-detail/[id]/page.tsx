import React from 'react';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { TransactionDetailType } from '@/app/types/types';

const TransactionDetail = ({ searchParams }: TransactionDetailType) => {
  return (
    <>
      <Link href='/'>
        <FontAwesomeIcon
          className={styles.backIcon}
          style={{ fontSize: 30 }}
          icon={faChevronLeft}
        />
      </Link>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {searchParams.type === 'Payment'
            ? `+$${parseFloat(searchParams.sum).toFixed(2)}`
            : `$${parseFloat(searchParams.sum).toFixed(2)}`}
        </h2>
        <div className={styles.text}>{searchParams?.name}</div>
        <div className={styles.text}>
          {searchParams?.authorizedUser
            ? `${searchParams?.authorizedUser} - ${searchParams.date}`
            : `${searchParams.date}`}
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.textWrapper}>
          <h3 className={styles.cardTitle}>
            Status: {searchParams.isPending === "true" ? 'Pending' : 'Approved'}
          </h3>
          <div className={styles.text}>{searchParams.description}</div>
        </div>
        <div className={styles.flex}>
          <h3>Total</h3>
          <h3>
            {searchParams.type === 'Payment'
              ? `+$${parseFloat(searchParams.sum).toFixed(2)}`
              : `$${parseFloat(searchParams.sum).toFixed(2)}`}
          </h3>
        </div>
      </div>
    </>
  );
};

export default TransactionDetail;
