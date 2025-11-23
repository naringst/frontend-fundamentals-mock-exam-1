import type { SavingsProduct, SavingsProductsFilter } from 'types/savingsProducts';

const monthlyAmountFilter = (filter: SavingsProductsFilter, product: SavingsProduct) => {
  return filter.monthlyAmount >= product.minMonthlyAmount && filter.monthlyAmount <= product.maxMonthlyAmount;
};

const availableTermsFilter = (filter: SavingsProductsFilter, product: SavingsProduct) => {
  return product.availableTerms === filter.term;
};

export const filterSavingsProducts = (filter: SavingsProductsFilter, products: SavingsProduct[]): SavingsProduct[] => {
  return products.filter(product => {
    if (filter.monthlyAmount === 0 && filter.term === 0) {
      return true;
    }
    return monthlyAmountFilter(filter, product) && availableTermsFilter(filter, product);
  });
};
