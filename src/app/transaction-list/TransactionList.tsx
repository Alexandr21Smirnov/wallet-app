import React from 'react';
import styles from './transaction-list.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCopyright } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Link from 'next/link';
import data from './../../../data.json';
import CardsSection from './components/CardsSection';
import Title from './components/Title';
import { getFormattedDate, getFormattedDateWithTime } from '../utils/date-formats';

const TransactionList = () => {

  return (
    <>
      <CardsSection />
      <Title />
      <div className={styles.listWrapper}>
        {}
        {data.map((transact: any) => (
          <Link
            href={{
              pathname: `/transaction-detail/${transact.id}`,
              query: {
                name: transact.name,
                sum: transact.sum,
                description: transact.description,
                isPending: transact.isPending,
                type: transact.type,
                date: getFormattedDateWithTime(transact.date),
                authorizedUser: transact.authorizedUser,
              },
            }}
            className={styles.listItem}
          >
            <span className={styles.apple}>
              <FontAwesomeIcon
                icon={faCopyright}
                style={{
                  fontSize: 25,
                }}
              />
            </span>
            <div className={styles.listItemContainer}>
              <div className={styles.flex}>
                <h3 className={styles.listItemTitle}>{transact.name}</h3>
                <div className={styles.sumContainer}>
                  <div className={styles.sum}>
                    {transact.type === 'Payment'
                      ? `+$${parseFloat(transact.sum).toFixed(2)}`
                      : `$${parseFloat(transact.sum).toFixed(2)}`}
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} color='#ddd' />
                </div>
              </div>
              <div className={styles.flex}>
                {transact.description.length > 29 ? (
                  <h3 className={styles.ellipsisText}>
                    {transact.isPending
                      ? `Pending - ${transact.description}`
                      : `${transact.description}`}
                  </h3>
                ) : (
                  <>
                    <h3 className={styles.text}>
                      {transact.isPending
                        ? `Pending - ${transact.description}`
                        : `${transact.description}`}
                    </h3>
                    <div className={styles.text}>
                      <span>3%</span>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.text}>
                {transact?.authorizedUser
                  ? `${transact?.authorizedUser} - `
                  : ''}
                {getFormattedDate(transact.date)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TransactionList;
