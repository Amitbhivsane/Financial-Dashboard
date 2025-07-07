export const groupByMonth = (transactions) => {
  const map = {};

  transactions.forEach(({ date, amount }) => {
    const month = new Date(date).toLocaleString("default", { month: "short" });
    map[month] = (map[month] || 0) + amount;
  });

  return Object.keys(map).map((month) => ({
    month,
    total: map[month],
  }));
};
