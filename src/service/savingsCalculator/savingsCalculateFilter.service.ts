import type { SavingsProduct, SavingsProductsFilter } from 'types/savingsProducts';

const INITIAL_MONTHLY_AMOUNT = 0;
const INITIAL_TERM = 12;

const isInitialFilter = (filter: SavingsProductsFilter): boolean => {
  return filter.monthlyAmount === INITIAL_MONTHLY_AMOUNT && filter.term === INITIAL_TERM;
};

const monthlyAmountFilter = (filter: SavingsProductsFilter, product: SavingsProduct) => {
  return filter.monthlyAmount >= product.minMonthlyAmount && filter.monthlyAmount <= product.maxMonthlyAmount;
};

const availableTermsFilter = (filter: SavingsProductsFilter, product: SavingsProduct) => {
  return product.availableTerms === filter.term;
};

export const filterSavingsProducts = (filter: SavingsProductsFilter, products: SavingsProduct[]): SavingsProduct[] => {
  // 초기값일 때는 전체 목록 반환
  if (isInitialFilter(filter)) {
    return products;
  }

  return products.filter(product => {
    const monthlyAmountMatch = filter.monthlyAmount === INITIAL_MONTHLY_AMOUNT || monthlyAmountFilter(filter, product);
    const termMatch = availableTermsFilter(filter, product);
    return monthlyAmountMatch && termMatch;
  });
};
