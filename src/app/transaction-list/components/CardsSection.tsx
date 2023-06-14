import React from 'react';
import styles from '../transaction-list.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  formattedAvailableBalance,
  formattedCardBalance,
} from '@/app/utils/number-formats';
import { calculateDailyPoints, currMonth } from '@/app/utils/date-formats';

const CardsSection = () => {
  const dailyPoints = calculateDailyPoints();
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.box1}>
        <h3 className={styles.cardTitle}>Card Balance</h3>
        <div className={styles.balance}>${formattedCardBalance}</div>
        <div className={styles.text}>
          ${formattedAvailableBalance} Available
        </div>
      </div>

      <div className={styles.box2}>
        <div className={styles.textWrapper}>
          <h3 className={styles.cardTitle}>Daily Points</h3>
          <div className={styles.text}>{dailyPoints}</div>
        </div>
      </div>

      <div className={styles.boxL}>
        <h3 className={styles.cardTitle}>No Payment Due</h3>
        <p className={styles.text}>You've paid your {currMonth} balance.</p>
        <div className={styles.iconWrapper}>
          <span className={styles.checkMark}>
            <FontAwesomeIcon
              icon={faCheck}
              color='#000'
              style={{
                fontSize: 30,
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardsSection;
