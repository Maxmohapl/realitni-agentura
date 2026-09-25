import assert from 'node:assert/strict';
import test from 'node:test';
import { annuityPayment, calculateFinancing, maximumLoan } from '@/lib/finance/calculator';

test('calculates a standard annuity payment', () => {
  assert.equal(Math.round(annuityPayment(1_000_000, 4.99, 20)), 6_594);
});

test('handles a zero-interest loan', () => {
  assert.equal(Math.round(annuityPayment(1_200_000, 0, 10)), 10_000);
});

test('applies product LTV and amount limits', () => {
  assert.equal(maximumLoan('housing', 5_000_000), 4_000_000);
  assert.equal(maximumLoan('american', 5_000_000), 3_500_000);
  assert.equal(maximumLoan('american', 30_000_000), 15_000_000);
});

test('clamps invalid term and loan values and adds optional insurance', () => {
  const result = calculateFinancing({ product: 'american', propertyPrice: 2_000_000, loan: 9_000_000, years: 30, fixation: 5, insurance: true });
  assert.equal(result.loan, 1_400_000);
  assert.equal(result.years, 20);
  assert.equal(result.insurancePayment, 700);
  assert.equal(result.ownFunds, 600_000);
});
