export const generateAmortizationTable = (amount: number, term: number, annual_interest: number) => {
  const monthly_interest = Number(annual_interest) / 12 / 100;
  const currentAmount = Number(amount);
  const currentTerm = Number(term);
  const monthly_payment =
    (currentAmount * monthly_interest) / (1 - Math.pow(1 + monthly_interest, -currentTerm));

  let balance = currentAmount;
  const amortization_table = [];

  const total_interest = (monthly_payment * currentTerm) - currentAmount;
  const total_cost = Number(currentAmount) + Number(total_interest);

  for (let i = 1; i <= term; i++) {
    const interest_payment = balance * monthly_interest;
    const principal_payment = monthly_payment - interest_payment;
    balance -= principal_payment;

    amortization_table.push({
      month: i,
      interest_payment: interest_payment.toFixed(2),
      principal_payment: principal_payment.toFixed(2),
      total_payment: monthly_payment.toFixed(2),
      remaining_balance: balance.toFixed(2),
      due_date: new Date(new Date().setMonth(new Date().getMonth() + i))
        .toISOString()
        .split("T")[0],
    });
  }

  return {
    total_cost: Number(total_cost).toFixed(2),
    total_interest: Number(total_interest).toFixed(2),
    monthly_payment: Number(monthly_payment).toFixed(2),
    amortization_table
  };
}
