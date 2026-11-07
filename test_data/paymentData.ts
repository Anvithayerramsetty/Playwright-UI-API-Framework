// Public synthetic datasets from this practice site's iframe; never substitute real card data.
export const paymentCases = [
  { name: 'approved', holder: 'JOHN SMITH', card: '4111111111111111', expiry: '12/29', cvv: '123', status: 'Approved', balance: '₹1,25,000' },
  { name: 'insufficient balance', holder: 'ALEX JOHNSON', card: '5555555555554444', expiry: '08/28', cvv: '456', status: 'Insufficient Balance', balance: '₹120' },
] as const;
export type PaymentData = typeof paymentCases[number];
