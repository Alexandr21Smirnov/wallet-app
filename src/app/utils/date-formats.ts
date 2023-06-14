import moment from 'moment';
import { formatNumber } from './number-formats';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const date = new Date();
const currMonth = months[date.getMonth()];

const getTodayNumberOfSeason = () => {
    let firstMonthsOfSeason = ['December', 'March', 'June', 'September'];

    let secondsMonthsOfSeason = ['January', 'April', 'July', 'October'];

    let thirdMonthsOfSeason = ['February', 'May', 'August', 'November'];

    let today;

    if (
        firstMonthsOfSeason[0] == currMonth ||
        firstMonthsOfSeason[1] == currMonth ||
        firstMonthsOfSeason[2] == currMonth ||
        firstMonthsOfSeason[3] == currMonth
    ) {
        return (today = new Date().getDate());
    }

    if (
        secondsMonthsOfSeason[0] === currMonth ||
        secondsMonthsOfSeason[1] === currMonth ||
        secondsMonthsOfSeason[2] === currMonth ||
        secondsMonthsOfSeason[3] === currMonth
    ) {
        return (today = new Date().getDate() + 30);
    }

    if (
        thirdMonthsOfSeason[0] === currMonth ||
        thirdMonthsOfSeason[1] === currMonth ||
        thirdMonthsOfSeason[2] === currMonth ||
        thirdMonthsOfSeason[3] === currMonth
    ) {
        return (today = new Date().getDate() + 60);
    }
};

const calculateDailyPoints = () => {
    const today = getTodayNumberOfSeason();

    const arrToday = Array(today)
        .fill(today)
        .map((_, i) => i + 1)
        .reverse();

    const firstDayPoints = 2;
    const secondDayPoints = 3;
    let arr = [firstDayPoints, secondDayPoints];

    let points = arrToday.reduce(() => {
        if (today !== undefined && today == 1) {
            return firstDayPoints;
        }
        if (today !== undefined && today == 2) {
            return secondDayPoints;
        }

        if (today !== undefined && today == 3) {
            let thirdDayPoints = firstDayPoints + (secondDayPoints / 100) * 60;
            arr.push(thirdDayPoints);

            return thirdDayPoints;
        }

        if (today !== undefined && today > 3) {
            let yesterdayPoints = arr[arr.length - 1];
            let dayBeforeYesterdayPoints = arr[arr.length - 2];
            arr.push(dayBeforeYesterdayPoints + (yesterdayPoints / 100) * 60);
            return dayBeforeYesterdayPoints;
        }
    }, 0);

    return formatNumber(+points!);
};

function getDayName(dateStr: Date, locale: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

function getFormattedDateWithTime(date: string) {
    const dateFromTimestamp = new Date(+date);
    const currentDay = new Date();
    const hours = dateFromTimestamp.getHours();
    const minutes =
        (dateFromTimestamp.getMinutes() < 10 ? '0' : '') +
        dateFromTimestamp.getMinutes();
    const month = dateFromTimestamp.getMonth();
    const year = dateFromTimestamp.getFullYear();
    const day = dateFromTimestamp.getDate();
    const now = moment();
    const inputDate = moment(dateFromTimestamp);
    const isThisWeek = now.isoWeek() === inputDate.isoWeek();

    if (dateFromTimestamp.getDate() === currentDay.getDate() - 1) {
        return `Yesterday, ${hours}:${minutes}`;
    }
    if (isThisWeek) {
        return getDayName(dateFromTimestamp, 'en-US') + `, ${hours}:${minutes}`;
    }

    const dateFormate =
        month + 1 + '/' + day + '/' + year + `, ${hours}:${minutes}`;

    return dateFormate;
}

function getFormattedDate(date: string) {
    const dateFromTimestamp = new Date(+date);
    const currentDay = new Date();
    const now = moment();
    const inputDate = moment(dateFromTimestamp);
    const isThisWeek = now.isoWeek() === inputDate.isoWeek();

    if (dateFromTimestamp.getDate() === currentDay.getDate() - 1) {
        return 'Yesterday';
    }

    if (isThisWeek) {
        return getDayName(dateFromTimestamp, 'en-US');
    }

    const month = dateFromTimestamp.getMonth();
    const year = dateFromTimestamp.getFullYear();
    const day = dateFromTimestamp.getDate();
    const dateFormate = month + 1 + '/' + day + '/' + year;

    return dateFormate;
}

export {
    currMonth,
    calculateDailyPoints,
    getFormattedDate,
    getFormattedDateWithTime,
};
