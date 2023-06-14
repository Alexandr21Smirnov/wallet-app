const cardLimit = 1500;
const cardBalance = +(Math.random() * cardLimit + 1);
const availableBalance = cardLimit - cardBalance;
const formattedCardBalance = cardBalance
  .toFixed(2)
  .toString()
  .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const formattedAvailableBalance = availableBalance
  .toFixed(2)
  .toString()
  .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function formatNumber(num: number) {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => num >= x.threshold);
  if (found && num > 999) {
    const formatted = Math.round(num / 1000) * 1 + found.suffix;
    return formatted;
  }

  return num.toFixed(0);
}

export {
  cardLimit,
  cardBalance,
  availableBalance,
  formattedCardBalance,
  formattedAvailableBalance,
  formatNumber,
};
