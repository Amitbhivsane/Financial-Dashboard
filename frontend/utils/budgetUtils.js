const getCurrentMonth = () => {
  const now = new Date();
  return (
    now.toLocaleString("default", { month: "short" }) + "-" + now.getFullYear()
  );
};

const compareBudgetToActual = (budgets, transactions) => {
  const currentMonth = getCurrentMonth();
  const actuals = {};

  transactions.forEach(({ amount, date, category }) => {
    const month =
      new Date(date).toLocaleString("default", { month: "short" }) +
      "-" +
      new Date(date).getFullYear();
    if (month === currentMonth) {
      actuals[category] = (actuals[category] || 0) + amount;
    }
  });

  return budgets
    .filter((b) => b.month === currentMonth)
    .map((b) => ({
      category: b.category,
      budget: b.amount,
      actual: actuals[b.category] || 0,
    }));
};

module.exports = {
  getCurrentMonth,
  compareBudgetToActual,
};
