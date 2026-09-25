export type FinanceProduct = 'housing' | 'american' | 'refinancing';

export const financeProducts = {
  housing: {
    label: 'hypotéka na bydlení', maxLtv: 0.8, maxLoan: 30_000_000, maxYears: 30,
    rates: { 1: 5.09, 3: 4.89, 5: 4.99, 10: 5.29 },
  },
  american: {
    label: 'americká hypotéka', maxLtv: 0.7, maxLoan: 15_000_000, maxYears: 20,
    rates: { 1: 6.69, 3: 6.49, 5: 6.39, 10: 6.59 },
  },
  refinancing: {
    label: 'refinancování', maxLtv: 0.8, maxLoan: 30_000_000, maxYears: 30,
    rates: { 1: 4.99, 3: 4.79, 5: 4.89, 10: 5.19 },
  },
} as const;

export type Fixation = keyof typeof financeProducts.housing.rates;

export function maximumLoan(product: FinanceProduct, propertyPrice: number) {
  const config = financeProducts[product];
  return Math.max(0, Math.min(config.maxLoan, propertyPrice * config.maxLtv));
}

export function annuityPayment(principal: number, annualRate: number, years: number) {
  if (!Number.isFinite(principal) || !Number.isFinite(annualRate) || !Number.isFinite(years) || principal <= 0 || years <= 0 || annualRate < 0) return 0;
  const months = Math.round(years * 12);
  const monthlyRate = annualRate / 1200;
  if (monthlyRate === 0) return principal / months;
  return principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
}

export function calculateFinancing(input: { product: FinanceProduct; propertyPrice: number; loan: number; years: number; fixation: Fixation; insurance: boolean }) {
  const config = financeProducts[input.product];
  const propertyPrice = Math.max(300_000, input.propertyPrice);
  const allowedLoan = maximumLoan(input.product, propertyPrice);
  const loan = Math.max(0, Math.min(input.loan, allowedLoan));
  const years = Math.max(1, Math.min(input.years, config.maxYears));
  const rate = config.rates[input.fixation];
  const basePayment = annuityPayment(loan, rate, years);
  const insurancePayment = input.insurance ? loan * 0.0005 : 0;
  const monthlyPayment = basePayment + insurancePayment;
  const totalPaid = monthlyPayment * years * 12;
  return {
    propertyPrice, loan, years, rate, basePayment, insurancePayment, monthlyPayment,
    totalPaid, totalInterestAndInsurance: Math.max(0, totalPaid - loan),
    ownFunds: Math.max(0, propertyPrice - loan), allowedLoan,
    ltv: propertyPrice ? loan / propertyPrice : 0,
  };
}
