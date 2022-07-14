export const roundBalance = (balance) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
  return formatter.format(balance);
};
