export const groupByCategory = (transactions) => {
  const map = {};

  transactions.forEach(({ category, amount }) => {
    map[category] = (map[category] || 0) + amount;
  });

  return Object.keys(map).map((category) => ({
    category,
    amount: map[category],
  }));
};

export const categories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Salary",
  "Other",
];
