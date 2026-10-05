import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prepareInquiryEmail } from '../lib/inquiries/message';
import { validInput, parseOffers, cheapestOffer } from '../lib/finance/gpf';

void test('email fallback preserves Czech inquiry fields and encodes URL delimiters', () => {
 const link = new URL(prepareInquiryEmail('sale', { name: 'Jan & Jana', email: 'test@example.com', description: 'Byt #2\nCena? 3 000 000 Kč', recipient: 'other@example.com' }));
 assert.equal(link.pathname, 'prochazka@egpreality.cz');
 assert.equal(link.searchParams.get('subject'), 'Prodej nemovitosti');
 assert.equal(link.searchParams.get('body'), 'Jméno: Jan & Jana\nE-mail: test@example.com\nPopis: Byt #2\nCena? 3 000 000 Kč');
 assert.equal(link.hash, '');
});

void test('GPF input rejects impossible loan, invalid product and invalid term', () => {
 const input = { product: 'BYD' as const, price: 2500000, loan: 2000000, years: 30, fixation: 3, insurance: true };
 assert.equal(validInput(input), true);
 assert.equal(validInput({ ...input, loan: 2500000 }), false);
 assert.equal(validInput({ ...input, product: 'AHU' }), false);
 assert.equal(validInput({ ...input, years: NaN }), false);
 assert.equal(validInput(null as never), false);
});

void test('GPF chooses the lowest payment, not just the lowest interest', () => {
 const offers = parseOffers([
  { bankName: 'A', monthlyPayment: 10000, interestRate: 4.5 },
  { bankName: 'B', monthlyPayment: 9900, interestRate: 4.8 },
  null, { monthlyPayment: -1, interestRate: 0 }, { monthlyPayment: Infinity, interestRate: 1 },
 ]);
 assert.equal(offers.length, 2);
 assert.equal(cheapestOffer(offers)?.bankName, 'B');
 assert.equal(cheapestOffer([]), null);
 assert.throws(() => parseOffers({ error: 'unavailable' }));
});
