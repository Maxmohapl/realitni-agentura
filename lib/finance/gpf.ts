export type Product = 'BYD' | 'AHU' | 'RFU';
export type QuoteInput = { product: Product; price: number; loan: number; years: number; fixation: number; insurance: boolean };
export type Offer = { bankName: string; productName: string; interestRate: number; monthlyPayment: number; apr: number | null; riskInsurance: number | null };
export const limits = (product: Product) => product === 'AHU' ? { min: 300000, priceMax: 30000000, loanMax: 10000000, yearsMax: 20 } : { min: 200000, priceMax: 20000000, loanMax: 20000000, yearsMax: 30 };
export function validInput(x: QuoteInput): boolean {
 if (!x || !['BYD','AHU','RFU'].includes(x.product)) return false;
 const l = limits(x.product);
 return [x.price,x.loan,x.years,x.fixation].every(Number.isSafeInteger) && x.price >= l.min && x.price <= l.priceMax && x.loan >= l.min && x.loan <= l.loanMax && x.loan <= x.price * .9 && x.years >= 5 && x.years <= l.yearsMax && [1,3,5,10].includes(x.fixation) && typeof x.insurance === 'boolean';
}
export function gpfPayload(x: QuoteInput) {
 return { credit: { credit:x.loan, purpose:x.product, estateType:'flat', guarantee:x.price, repayment:String(x.years), fixation:String(x.fixation), riskInsurance:true }, mainTab: { refinancingWithIncrease:true, milderConditions:true, domiciliationAmount:2147483647, propertyInsurance:true, riskInsurance:x.insurance, withdrawOnProposal:true, hbBuy:true, hbClient:true, hbAlone:true, hbIncome:2147483647, sbEstatePurchase:true, hbGreen:true } };
}
export function parseOffers(data: unknown): Offer[] {
 if (!Array.isArray(data)) throw new Error('Invalid provider response');
 return data.filter(x => x && typeof x.monthlyPayment === 'number' && Number.isFinite(x.monthlyPayment) && x.monthlyPayment > 0 && typeof x.interestRate === 'number' && Number.isFinite(x.interestRate) && x.interestRate >= 0).map(x=>({ bankName:typeof x.bankName==='string'?x.bankName:'Banka', productName:typeof x.productName==='string'?x.productName:'Hypotéka', monthlyPayment:x.monthlyPayment, interestRate:x.interestRate, apr:typeof x.apr==='number'&&Number.isFinite(x.apr)?x.apr:null, riskInsurance:typeof x.riskInsurance==='number'&&Number.isFinite(x.riskInsurance)?x.riskInsurance:null })).sort((a,b)=>a.interestRate-b.interestRate);
}
export function cheapestOffer(offers: Offer[]): Offer | null { return offers.reduce<Offer | null>((best,item)=>!best||item.monthlyPayment<best.monthlyPayment?item:best,null); }
